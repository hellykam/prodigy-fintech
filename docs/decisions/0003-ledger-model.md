# ADR 0003: Double-Entry Ledger

Date: 2026-06-17
Status: Accepted

## Decision

All money movements use double-entry ledger entries. No direct balance mutation.
Balances are derived by summing ledger entries for an account.

## Why

- Prevents balance drift (impossible to lose or double-count money in simulation).
- Makes the demo credibly real — actual fintech systems use this model.
- Enables showing the ledger entries table in admin (impressive for demo).
- Simplifies audit: every movement is traceable.

## Platform ledger accounts

1. Platform Operating Account (EUR, USD, GBP)
2. Customer Safeguarding Account (EUR, USD, GBP)
3. Fee Revenue Account (EUR, USD, GBP, BTC, ETH, USDT)
4. Market Liquidity Account (BTC, ETH, USDT)
5. Partner Payable Account (EUR, USD)

## User ledger accounts

Each user has:
- One fiat account per currency they hold
- One crypto account per currency they hold
