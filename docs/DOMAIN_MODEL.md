# Prodigy Fintech — Domain Model

All entities below map to Prisma models in `backend/prisma/schema.prisma`.

## User

End consumer.

```
id, email, passwordHash, status, kycStatus, riskLevel,
attributedToB2BClientId?, createdAt, updatedAt
```

Statuses: active | suspended | banned
KYC statuses: not_started | pending | approved | rejected | manual_review
Risk levels: low | medium | high

Relations: KYCApplicants, BankAccounts, Wallets, Transactions, AnalyticsEvents

---

## B2BClient

Partner company embedding the widget.

```
id, name, status, commissionSharePercent, platformFeePercent,
createdAt, updatedAt
```

Status: active | suspended | pending

Relations: WidgetConfigs, Transactions, PartnerCommissions

---

## WidgetConfig

Per-B2B widget configuration.

```
id, b2bClientId, name, status,
allowedFiatCurrencies (string[]), allowedCryptoCurrencies (string[]),
defaultFiatCurrency, defaultCryptoCurrency,
themeMode (light|dark), primaryColorToken,
feeProfileId, limitsProfileId,
redirectUrl, webhookUrl,
createdAt, updatedAt
```

---

## KYCApplicant

Mocked Sumsub applicant.

```
id, userId, status, levelName,
firstName, lastName, dateOfBirth, country,
documentType, documentStatus,
rejectionReason?, reviewedBy?, reviewedAt?,
createdAt, updatedAt
```

Statuses: not_started | pending | approved | rejected | manual_review

---

## BankAccount

Mocked fiat account. Created only after approved KYC.

```
id, userId, iban, currency, balance (DECIMAL), status,
providerName, createdAt, updatedAt
```

Note: balance is derived from ledger entries. The stored value is a cache.

---

## Wallet

Crypto wallet or internal crypto balance.

```
id, userId, currency, address, balance (DECIMAL), status,
createdAt, updatedAt
```

Note: balance is derived from ledger entries.

---

## Currency

```
code (PK), type (fiat|crypto), name, symbol, decimals, isActive
```

---

## Quote

Temporary conversion offer. Must expire.

```
id, userId, b2bClientId?,
sourceCurrency, targetCurrency,
sourceAmount, targetAmount, rate, spread,
platformFeeAmount, partnerFeeAmount, networkFeeAmount,
expiresAt, status, createdAt
```

Statuses: requested | offered | accepted | expired | cancelled

Rule: Frontend cannot calculate final fees. Backend is source of truth.

---

## Transaction

Conversion or transfer.

```
id, userId, b2bClientId?, quoteId,
type (fiat_to_crypto | crypto_to_fiat | fiat_to_fiat | crypto_to_crypto),
sourceCurrency, targetCurrency, sourceAmount, targetAmount,
status, riskScore, riskDecision, failureReason?,
createdAt, updatedAt
```

Statuses:
created → risk_checking → [approved | manual_review | rejected]
         approved → market_executing → ledger_posting → completed
         manual_review → [approved | rejected] (admin decision)
         any → failed

---

## RiskReview

Manual review task for admin.

```
id, transactionId, userId, riskScore, riskReasons (string[]),
status, assignedTo?, decision?, decisionReason?,
createdAt, updatedAt
```

Statuses: open | approved | rejected | escalated

---

## LedgerAccount

Account in the double-entry ledger.

```
id, ownerType (user|platform|partner|bank_simulator|market_simulator),
ownerId, currency,
accountType (asset|liability|revenue|expense|clearing),
name, createdAt
```

---

## LedgerEntry

One side of a double-entry movement. Always balanced.

```
id, transactionId?, ledgerAccountId,
direction (debit|credit), amount (DECIMAL), currency,
description, createdAt
```

Rule: Every posting creates two entries that sum to zero. Balances are derived.

---

## PartnerCommission

B2B revenue share.

```
id, b2bClientId, transactionId, amount (DECIMAL), currency,
status (accrued|payable|paid|cancelled), createdAt
```

---

## AnalyticsEvent

User behavior event.

```
id, sessionId, userId?, b2bClientId?, appName,
eventName, route, metadata (JSON), createdAt
```

Example events: page_viewed, quote_requested, signup_completed,
kyc_submitted, conversion_completed, form_error_seen, rage_click_detected

---

## SystemEvent

Backend/product flow event. Drives the live system map.

```
id, correlationId, eventName, entityType, entityId,
source, target, status, payload (JSON), createdAt
```

Rule: Every system event must have a correlationId. This is how the system map traces a full transaction chain.
