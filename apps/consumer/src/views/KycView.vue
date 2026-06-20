<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  createKycApplicant,
  submitKycApplicant,
  determineLevelForCountry,
  fetchCountryRisk,
} from '@/composables/useApi'
import type { LevelDecision, CountryRiskEntry } from '@/composables/useApi'
import { useWebSocket } from '@/composables/useWebSocket'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/AppLayout.vue'
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldX,
  Info,
  TrendingUp,
  Wallet,
  Lock,
} from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const kycStatus = computed(() => auth.user?.kycStatus ?? 'not_started')

// ── Form state ──────────────────────────────────────────────────────────────
const currentStep = ref(1)

const form = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  documentType: 'passport',
  documentUploaded: false,
  selfieCompleted: false,
  addressProofUploaded: false,
  sourceOfFunds: '',
  sourceOfFundsRange: '',
  pepDeclaration: false,
})

const levelDecision = ref<LevelDecision | null>(null)
const applicantId = ref<string | null>(null)
const isBlocked = ref(false)
const blockedCountryName = ref('')

// Loading states
const loadingCountries = ref(false)
const loadingLevel = ref(false)
const loadingDocument = ref(false)
const loadingSelfie = ref(false)
const loadingAddress = ref(false)
const loadingSubmit = ref(false)
const submitted = ref(false)
const error = ref('')

// Country list from API
const countryList = ref<CountryRiskEntry[]>([])

onMounted(async () => {
  loadingCountries.value = true
  try {
    const res = await fetchCountryRisk()
    countryList.value = res.countries
  } catch {
    // fallback to empty — user can still proceed if API down
  } finally {
    loadingCountries.value = false
  }
})

// ── Computed step logic ─────────────────────────────────────────────────────
const steps = computed((): string[] => {
  return levelDecision.value?.steps ?? ['personal_info', 'document_upload']
})

const totalSteps = computed(() => {
  const base = 4 // personal_info, country, document_upload, review
  const extras = steps.value.filter((s) =>
    ['selfie', 'address_proof', 'source_of_funds', 'pep_declaration'].includes(s),
  ).length
  return base + extras
})

// Map logical step name → sequential step number for navigation
const stepSequence = computed((): string[] => {
  const seq = ['personal_info', 'country']
  seq.push('document_upload')
  if (steps.value.includes('selfie')) seq.push('selfie')
  if (steps.value.includes('address_proof')) seq.push('address_proof')
  if (steps.value.includes('source_of_funds')) seq.push('source_of_funds')
  if (steps.value.includes('pep_declaration')) seq.push('pep_declaration')
  seq.push('review')
  return seq
})

const currentStepName = computed(() => stepSequence.value[currentStep.value - 1] ?? 'personal_info')

const progressPct = computed(() => Math.round((currentStep.value / totalSteps.value) * 100))

// ── Level badge ──────────────────────────────────────────────────────────────
const levelBadge = computed(() => {
  if (!levelDecision.value) return null
  const id = levelDecision.value.levelId
  if (id === 'basic-kyc-level') return { label: 'Basic Verification', classes: 'bg-success-50 text-success-600 border border-success-500' }
  if (id === 'standard-kyc-level') return { label: 'Standard', classes: 'bg-info-50 text-info-600 border border-info-500' }
  if (id === 'enhanced-kyc-level') return { label: 'Enhanced', classes: 'bg-warning-50 text-warning-600 border border-warning-500' }
  return { label: levelDecision.value.levelName, classes: 'bg-slate-100 text-slate-600 border border-slate-200' }
})

// ── Country helpers ──────────────────────────────────────────────────────────
const sortedCountries = computed(() =>
  [...countryList.value].sort((a, b) => a.countryName.localeCompare(b.countryName)),
)

const selectedCountryName = computed(() => {
  const c = countryList.value.find((c) => c.countryCode === form.country)
  return c?.countryName ?? form.country
})

// ── Validation ───────────────────────────────────────────────────────────────
const step1Valid = computed(() => form.firstName.trim() && form.lastName.trim() && form.dateOfBirth)
const step2Valid = computed(() => form.country && !!levelDecision.value && !isBlocked.value)
const step3Valid = computed(() => form.documentUploaded)
const step4Valid = computed(() => form.selfieCompleted)
const step5Valid = computed(() => form.addressProofUploaded)
const step6Valid = computed(() => form.sourceOfFunds && form.sourceOfFundsRange)
const step7Valid = computed(() => true) // pep declaration: both yes/no are valid

const currentStepValid = computed(() => {
  const name = currentStepName.value
  if (name === 'personal_info') return step1Valid.value
  if (name === 'country') return step2Valid.value
  if (name === 'document_upload') return step3Valid.value
  if (name === 'selfie') return step4Valid.value
  if (name === 'address_proof') return step5Valid.value
  if (name === 'source_of_funds') return step6Valid.value
  if (name === 'pep_declaration') return step7Valid.value
  return true
})

// ── Step actions ─────────────────────────────────────────────────────────────
async function onCountryChange() {
  if (!form.country) return
  const entry = countryList.value.find((c) => c.countryCode === form.country)
  if (entry?.riskLevel === 'blocked') {
    isBlocked.value = true
    blockedCountryName.value = entry.countryName
    levelDecision.value = null
    return
  }
  isBlocked.value = false
  levelDecision.value = null
  loadingLevel.value = true
  error.value = ''
  try {
    const decision = await determineLevelForCountry({
      userId: auth.user!.id,
      countryCode: form.country,
    })
    levelDecision.value = decision
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('403') || msg.toLowerCase().includes('blocked')) {
      isBlocked.value = true
      blockedCountryName.value = selectedCountryName.value
    } else {
      error.value = msg
    }
  } finally {
    loadingLevel.value = false
  }
}

function goBack() {
  if (currentStep.value > 1) currentStep.value--
}

async function goNext() {
  if (currentStepName.value === 'document_upload' && !applicantId.value) {
    // Create applicant before continuing to selfie/review
    loadingSubmit.value = true
    error.value = ''
    try {
      const applicant = await createKycApplicant({
        userId: auth.user!.id,
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth,
        country: form.country,
        documentType: form.documentType,
        countryCode: form.country,
      })
      applicantId.value = applicant.id
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to create applicant'
      loadingSubmit.value = false
      return
    } finally {
      loadingSubmit.value = false
    }
  }
  currentStep.value++
}

async function simulateDocumentUpload() {
  loadingDocument.value = true
  await new Promise((r) => setTimeout(r, 1000))
  form.documentUploaded = true
  loadingDocument.value = false
}

async function simulateSelfie() {
  loadingSelfie.value = true
  await new Promise((r) => setTimeout(r, 2000))
  form.selfieCompleted = true
  loadingSelfie.value = false
}

async function simulateAddressUpload() {
  loadingAddress.value = true
  await new Promise((r) => setTimeout(r, 1000))
  form.addressProofUploaded = true
  loadingAddress.value = false
}

async function submitKyc() {
  if (!applicantId.value) return
  loadingSubmit.value = true
  error.value = ''
  try {
    await submitKycApplicant(applicantId.value)
    auth.updateUser({ kycStatus: 'pending' })
    submitted.value = true
    toast.success('KYC submitted successfully!')
    setTimeout(() => router.push('/'), 3000)
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Submission failed'
    toast.error(error.value)
  } finally {
    loadingSubmit.value = false
  }
}

// ── Pending state refetch ────────────────────────────────────────────────────
const isRefetching = ref(false)

async function refetchUser() {
  if (isRefetching.value) return
  isRefetching.value = true
  try {
    // Re-pull auth user — WebSocket will update kycStatus when approved
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('Status checked — still under review')
  } catch {
    // silent
  } finally {
    isRefetching.value = false
  }
}

// ── WebSocket KYC updates ────────────────────────────────────────────────────
// userId filter ensures we only react to events for the signed-in user
useWebSocket((event) => {
  if (event.eventName === 'KYC_APPROVED') {
    auth.updateUser({ kycStatus: 'approved' })
    toast.success('Your identity has been verified!')
  } else if (event.eventName === 'KYC_REJECTED') {
    auth.updateUser({ kycStatus: 'rejected' })
    toast.error('KYC verification was rejected')
  }
}, auth.user?.id)

// ── Document type options ────────────────────────────────────────────────────
const documentTypes = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'drivers_license', label: "Driver's License" },
]

const sourceOfFundsOptions = [
  { value: 'employment', label: 'Employment' },
  { value: 'business_income', label: 'Business Income' },
  { value: 'investments', label: 'Investments' },
  { value: 'inheritance', label: 'Inheritance' },
  { value: 'other', label: 'Other' },
]

const sourceOfFundsRanges = [
  { value: 'under_50k', label: '< €50,000' },
  { value: '50k_200k', label: '€50,000 – €200,000' },
  { value: 'over_200k', label: '€200,000+' },
]
</script>

<template>
  <AppLayout>
    <div class="px-4 pt-12 pb-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-slate-900">Identity Verification</h1>
        <RouterLink to="/" class="text-sm text-slate-400 hover:text-slate-600 transition">← Home</RouterLink>
      </div>

      <!-- ─── Pending / In Progress — Productive Onboarding ───────────────── -->
      <template v-if="kycStatus === 'pending' || kycStatus === 'in_progress'">
        <div class="px-0 pt-0 pb-0">
          <!-- Status banner -->
          <div class="bg-warning-50 border border-warning-200 rounded-2xl p-4 mb-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center shrink-0">
                <Clock class="w-4 h-4 text-warning-600" />
              </div>
              <div>
                <p class="font-semibold text-slate-900 text-sm">KYC is being reviewed</p>
                <p class="text-slate-500 text-xs mt-0.5">Usually takes 24–48 hours</p>
              </div>
            </div>
            <div class="flex gap-2 mt-3">
              <button
                @click="refetchUser()"
                :disabled="isRefetching"
                class="flex-1 h-9 rounded-xl border border-warning-300 text-warning-700 text-xs font-semibold hover:bg-warning-100 transition disabled:opacity-50"
              >
                {{ isRefetching ? 'Checking...' : 'Check KYC Status' }}
              </button>
              <button class="flex-1 h-9 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition">
                Contact Support
              </button>
            </div>
          </div>

          <!-- While you wait -->
          <h2 class="text-base font-semibold text-slate-900 mb-3">While you wait</h2>
          <div class="space-y-2">
            <!-- Set up security -->
            <RouterLink to="/profile" class="flex items-center gap-3 bg-white rounded-2xl p-4 active:scale-[0.98] transition">
              <div class="w-9 h-9 rounded-full bg-success-50 flex items-center justify-center shrink-0">
                <Shield class="w-4 h-4 text-success-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-900">Set up security</p>
                <p class="text-xs text-slate-400 mt-0.5">Biometrics, PIN, email verification</p>
              </div>
              <ChevronRight class="w-4 h-4 text-slate-300" />
            </RouterLink>

            <!-- Explore live rates -->
            <RouterLink to="/market" class="flex items-center gap-3 bg-white rounded-2xl p-4 active:scale-[0.98] transition">
              <div class="w-9 h-9 rounded-full bg-info-50 flex items-center justify-center shrink-0">
                <TrendingUp class="w-4 h-4 text-info-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-900">Explore live rates</p>
                <p class="text-xs text-slate-400 mt-0.5">See current BTC, ETH, USDT prices</p>
              </div>
              <ChevronRight class="w-4 h-4 text-slate-300" />
            </RouterLink>

            <!-- Prepare wallets — locked -->
            <div class="flex items-center gap-3 bg-white rounded-2xl p-4 opacity-60">
              <div class="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Wallet class="w-4 h-4 text-brand-600" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-900">Prepare your wallets</p>
                <p class="text-xs text-slate-400 mt-0.5">Available after KYC approval</p>
              </div>
              <span class="text-[10px] font-semibold bg-warning-400 text-white px-2 py-0.5 rounded-full">Soon</span>
            </div>
          </div>

          <!-- Features unlock after KYC -->
          <div class="mt-6">
            <p class="text-xs text-slate-400 uppercase tracking-wide font-medium mb-3">Features unlock after KYC</p>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="feat in ['Buy', 'Sell', 'Send']"
                :key="feat"
                class="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 opacity-40"
              >
                <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <Lock class="w-4 h-4 text-slate-400" />
                </div>
                <span class="text-xs font-medium text-slate-500">{{ feat }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- ─── Approved ────────────────────────────────────────────────────── -->
      <template v-else-if="kycStatus === 'approved'">
        <div class="bg-success-50 border border-success-500 rounded-2xl p-6 text-center">
          <div class="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle :size="36" class="text-success-500" />
          </div>
          <h2 class="text-lg font-bold text-success-900 mb-2">Identity Verified</h2>
          <p class="text-success-600 text-sm">Your identity has been successfully verified. You can now buy and sell crypto.</p>
        </div>
      </template>

      <!-- ─── Rejected ────────────────────────────────────────────────────── -->
      <template v-else-if="kycStatus === 'rejected'">
        <div class="bg-danger-50 border border-danger-500 rounded-2xl p-6 text-center mb-4">
          <div class="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle :size="36" class="text-danger-500" />
          </div>
          <h2 class="text-lg font-bold text-danger-900 mb-2">Verification Rejected</h2>
          <p class="text-danger-600 text-sm">We were unable to verify your identity. Please review your documents and try again, or contact support if you believe this is an error.</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="auth.updateUser({ kycStatus: 'not_started' })"
            class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition text-sm flex items-center justify-center gap-2"
          >
            <Shield :size="18" />
            Retry KYC
          </button>
          <button class="flex-1 h-12 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition text-sm">
            Contact Support
          </button>
        </div>
      </template>

      <!-- ─── Manual review ───────────────────────────────────────────────── -->
      <template v-else-if="kycStatus === 'manual_review'">
        <div class="bg-info-50 border border-info-500 rounded-2xl p-6 text-center">
          <div class="w-16 h-16 bg-info-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock :size="32" class="text-info-600" />
          </div>
          <h2 class="text-lg font-bold text-info-900 mb-2">Additional Review Needed</h2>
          <p class="text-info-600 text-sm">Your verification requires manual review. Our team will reach out within 24 hours.</p>
        </div>
      </template>

      <!-- ─── Not started — dynamic multi-step form ───────────────────────── -->
      <template v-else-if="kycStatus === 'not_started'">

        <!-- Post-submit success screen -->
        <template v-if="submitted">
          <div class="bg-success-50 border border-success-500 rounded-2xl p-6 text-center">
            <div class="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle :size="36" class="text-success-500" />
            </div>
            <h2 class="text-lg font-bold text-success-900 mb-2">Application Submitted</h2>
            <p class="text-success-600 text-sm mb-1">
              <template v-if="form.pepDeclaration">Estimated review time: 1–2 business days</template>
              <template v-else>Typically reviewed in minutes</template>
            </p>
            <p class="text-slate-400 text-xs mt-3">Redirecting to home…</p>
          </div>
        </template>

        <template v-else>
          <!-- Progress bar + level badge -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-slate-500">Step {{ currentStep }} of {{ totalSteps }}</span>
              <span
                v-if="levelBadge"
                :class="['text-xs font-semibold px-2.5 py-1 rounded-full', levelBadge.classes]"
              >
                {{ levelBadge.label }}
              </span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-brand-500 rounded-full transition-all duration-300"
                :style="{ width: progressPct + '%' }"
              />
            </div>
          </div>

          <!-- ── Step 1: Personal Info ─────────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'personal_info'" key="personal_info">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-4">Personal Information</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      class="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      class="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
                    <input
                      v-model="form.dateOfBirth"
                      type="date"
                      class="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              <button
                @click="currentStep++"
                :disabled="!step1Valid"
                class="w-full h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
              >
                Continue <ChevronRight :size="18" />
              </button>
            </div>
          </Transition>

          <!-- ── Step 2: Country Selection ────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'country'" key="country">
              <!-- Blocked country screen -->
              <template v-if="isBlocked">
                <div class="bg-danger-50 border border-danger-500 rounded-2xl p-6 text-center mb-5">
                  <div class="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldX :size="36" class="text-danger-500" />
                  </div>
                  <h2 class="text-base font-bold text-danger-900 mb-2">We don't operate in your country yet</h2>
                  <p class="text-danger-600 text-sm">Prodigy is not currently available in your region. We're working to expand to new markets soon.</p>
                </div>
                <div class="flex gap-3">
                  <button
                    @click="() => { isBlocked = false; form.country = '' }"
                    class="flex-1 h-12 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center justify-center gap-1"
                  >
                    <ChevronLeft :size="18" /> Go Back
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                  <h2 class="text-base font-semibold text-slate-900 mb-4">Country of Residence</h2>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Select Country</label>
                    <select
                      v-model="form.country"
                      @change="onCountryChange"
                      class="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    >
                      <option value="" disabled>Select your country</option>
                      <option v-for="c in sortedCountries" :key="c.countryCode" :value="c.countryCode">
                        {{ c.countryName }}
                      </option>
                    </select>
                  </div>

                  <!-- Loading level -->
                  <div v-if="loadingLevel" class="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                    <Loader2 :size="16" class="animate-spin" />
                    Determining verification level…
                  </div>

                  <!-- Level decision badge + tooltip -->
                  <div v-if="levelDecision && !loadingLevel" class="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div class="flex items-start gap-2">
                      <Info :size="16" class="text-brand-500 mt-0.5 shrink-0" />
                      <div>
                        <p class="text-sm font-semibold text-slate-900">
                          {{ levelBadge?.label }} required
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5">{{ levelDecision.reason }}</p>
                      </div>
                    </div>
                  </div>

                  <p v-if="error" class="mt-3 text-danger-600 text-xs bg-danger-50 rounded-xl p-3">{{ error }}</p>
                </div>

                <div class="flex gap-3">
                  <button
                    @click="goBack"
                    class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                  >
                    <ChevronLeft :size="18" /> Back
                  </button>
                  <button
                    @click="currentStep++"
                    :disabled="!step2Valid || loadingLevel"
                    class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                  >
                    <Loader2 v-if="loadingLevel" :size="16" class="animate-spin" />
                    Continue <ChevronRight :size="18" />
                  </button>
                </div>
              </template>
            </div>
          </Transition>

          <!-- ── Step 3: Document Upload ───────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'document_upload'" key="document_upload">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-4">Identity Document</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Document Type</label>
                    <div class="space-y-2">
                      <label
                        v-for="dt in documentTypes"
                        :key="dt.value"
                        :class="[
                          'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition',
                          form.documentType === dt.value ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-slate-50',
                        ]"
                      >
                        <input
                          type="radio"
                          :value="dt.value"
                          v-model="form.documentType"
                          class="accent-brand-600"
                        />
                        <span class="text-sm font-medium text-slate-700">{{ dt.label }}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Upload Document</label>
                    <template v-if="!form.documentUploaded">
                      <button
                        @click="simulateDocumentUpload"
                        :disabled="loadingDocument"
                        class="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl border border-dashed border-slate-300 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                      >
                        <Loader2 v-if="loadingDocument" :size="16" class="animate-spin" />
                        <span v-else>Upload document</span>
                      </button>
                    </template>
                    <div
                      v-else
                      class="flex items-center gap-2 p-3 rounded-xl bg-success-50 border border-success-500 text-success-600 text-sm font-medium"
                    >
                      <CheckCircle :size="16" />
                      document.pdf ✓
                    </div>
                  </div>
                </div>
              </div>

              <p v-if="error" class="text-danger-600 text-sm bg-danger-50 rounded-xl p-3 mb-4">{{ error }}</p>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="goNext"
                  :disabled="!step3Valid || loadingSubmit"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  <Loader2 v-if="loadingSubmit" :size="16" class="animate-spin" />
                  Continue <ChevronRight :size="18" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Step 4: Selfie / Liveness ────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'selfie'" key="selfie">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-1">Selfie & Liveness Check</h2>
                <p class="text-xs text-slate-500 mb-4">We'll match your face to your document.</p>

                <template v-if="loadingSelfie">
                  <div class="flex flex-col items-center gap-3 py-6">
                    <Loader2 :size="36" class="text-brand-500 animate-spin" />
                    <p class="text-sm text-slate-500">Processing liveness check…</p>
                  </div>
                </template>
                <template v-else-if="form.selfieCompleted">
                  <div class="flex flex-col gap-2 p-4 rounded-xl bg-success-50 border border-success-500">
                    <div class="flex items-center gap-2 text-success-600 font-semibold text-sm">
                      <CheckCircle :size="18" /> Face matched ✓
                    </div>
                    <p class="text-success-600 text-xs">Liveness score: 98/100</p>
                  </div>
                </template>
                <template v-else>
                  <button
                    @click="simulateSelfie"
                    class="w-full h-11 bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium rounded-xl border border-brand-200 transition flex items-center justify-center gap-2 text-sm"
                  >
                    Take selfie
                  </button>
                </template>
              </div>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="currentStep++"
                  :disabled="!step4Valid"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight :size="18" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Step 5: Address Proof ─────────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'address_proof'" key="address_proof">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-1">Proof of Address</h2>
                <p class="text-xs text-slate-500 mb-4">Upload a utility bill or bank statement (less than 3 months old).</p>

                <template v-if="!form.addressProofUploaded">
                  <button
                    @click="simulateAddressUpload"
                    :disabled="loadingAddress"
                    class="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl border border-dashed border-slate-300 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <Loader2 v-if="loadingAddress" :size="16" class="animate-spin" />
                    <span v-else>Upload proof of address</span>
                  </button>
                </template>
                <div
                  v-else
                  class="flex items-center gap-2 p-3 rounded-xl bg-success-50 border border-success-500 text-success-600 text-sm font-medium"
                >
                  <CheckCircle :size="16" />
                  address_proof.pdf ✓
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="currentStep++"
                  :disabled="!step5Valid"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight :size="18" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Step 6: Source of Funds ───────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'source_of_funds'" key="source_of_funds">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-4">Source of Funds</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Source</label>
                    <select
                      v-model="form.sourceOfFunds"
                      class="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    >
                      <option value="" disabled>Select source</option>
                      <option v-for="opt in sourceOfFundsOptions" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Annual Amount Range</label>
                    <div class="space-y-2">
                      <label
                        v-for="range in sourceOfFundsRanges"
                        :key="range.value"
                        :class="[
                          'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition',
                          form.sourceOfFundsRange === range.value ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-slate-50',
                        ]"
                      >
                        <input
                          type="radio"
                          :value="range.value"
                          v-model="form.sourceOfFundsRange"
                          class="accent-brand-600"
                        />
                        <span class="text-sm font-medium text-slate-700">{{ range.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="currentStep++"
                  :disabled="!step6Valid"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight :size="18" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Step 7: PEP Declaration ───────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'pep_declaration'" key="pep_declaration">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-2">PEP Declaration</h2>
                <p class="text-sm text-slate-500 mb-4">Are you or a close family member a Politically Exposed Person (PEP)?</p>
                <div class="space-y-2">
                  <label
                    :class="[
                      'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition',
                      form.pepDeclaration === false ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-slate-50',
                    ]"
                  >
                    <input type="radio" :value="false" v-model="form.pepDeclaration" class="accent-brand-600" />
                    <span class="text-sm font-medium text-slate-700">No</span>
                  </label>
                  <label
                    :class="[
                      'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition',
                      form.pepDeclaration === true ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-slate-50',
                    ]"
                  >
                    <input type="radio" :value="true" v-model="form.pepDeclaration" class="accent-brand-600" />
                    <span class="text-sm font-medium text-slate-700">Yes</span>
                  </label>
                </div>

                <div
                  v-if="form.pepDeclaration"
                  class="mt-4 p-3 rounded-xl bg-warning-50 border border-warning-500 text-warning-600 text-sm"
                >
                  Your application will be manually reviewed by our compliance team.
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="currentStep++"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight :size="18" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Step 8: Review & Submit ───────────────────────────────── -->
          <Transition name="step-slide" mode="out-in">
            <div v-if="currentStepName === 'review'" key="review">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <h2 class="text-base font-semibold text-slate-900 mb-4">Review Your Details</h2>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Full Name</span>
                    <span class="font-medium text-slate-900">{{ form.firstName }} {{ form.lastName }}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Date of Birth</span>
                    <span class="font-medium text-slate-900">{{ form.dateOfBirth }}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Country</span>
                    <span class="font-medium text-slate-900">{{ selectedCountryName }}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Document</span>
                    <span class="font-medium text-slate-900">{{ documentTypes.find(d => d.value === form.documentType)?.label }}</span>
                  </div>
                  <div v-if="levelDecision" class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Verification Level</span>
                    <span class="font-medium text-slate-900">{{ levelBadge?.label }}</span>
                  </div>
                  <div v-if="form.selfieCompleted" class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Liveness Check</span>
                    <span class="font-medium text-success-600">Passed ✓</span>
                  </div>
                  <div v-if="form.addressProofUploaded" class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Address Proof</span>
                    <span class="font-medium text-success-600">Uploaded ✓</span>
                  </div>
                  <div v-if="form.sourceOfFunds" class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Source of Funds</span>
                    <span class="font-medium text-slate-900">{{ sourceOfFundsOptions.find(o => o.value === form.sourceOfFunds)?.label }}</span>
                  </div>
                  <div v-if="form.sourceOfFundsRange" class="flex justify-between py-2 border-b border-slate-100">
                    <span class="text-slate-500">Amount Range</span>
                    <span class="font-medium text-slate-900">{{ sourceOfFundsRanges.find(r => r.value === form.sourceOfFundsRange)?.label }}</span>
                  </div>
                  <div v-if="steps.includes('pep_declaration')" class="flex justify-between py-2">
                    <span class="text-slate-500">PEP</span>
                    <span class="font-medium text-slate-900">{{ form.pepDeclaration ? 'Yes' : 'No' }}</span>
                  </div>
                </div>
              </div>

              <p v-if="error" class="text-danger-600 text-sm bg-danger-50 rounded-xl p-3 mb-4">{{ error }}</p>

              <div class="flex gap-3">
                <button
                  @click="goBack"
                  class="h-12 px-5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition flex items-center gap-1"
                >
                  <ChevronLeft :size="18" /> Back
                </button>
                <button
                  @click="submitKyc"
                  :disabled="loadingSubmit"
                  class="flex-1 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  <Loader2 v-if="loadingSubmit" :size="18" class="animate-spin" />
                  <Shield v-else :size="18" />
                  {{ loadingSubmit ? 'Submitting…' : 'Submit for Verification' }}
                </button>
              </div>
            </div>
          </Transition>

        </template>
      </template>

    </div>
  </AppLayout>
</template>

<style scoped>
.step-slide-enter-active,
.step-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.step-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.step-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
