<script setup lang="ts">
import {ref, computed} from "vue"
import {usePayments} from "~/composables/usePayments"

const {
  consultationTrue,
  consultationFalse,
  consultationPaymentsTrue,
  consultationPaymentsFalse,
  Payments,
  LabsTrue,
  LabsFalse,
  labsTrue,
  labsFalse,
  FetchDrugs,
  drugs,
} = usePayments()

// Fetch required data
await consultationPaymentsTrue()
await consultationPaymentsFalse()
await LabsTrue()
await LabsFalse()
await FetchDrugs()

// --- DROPDOWNS ---
const showDrugDropdown = ref(false)
const showLabsTrueDropdown = ref(false)
const showLabsFalseDropdown = ref(false)

// --- SELECTED IDS ---
const selectedDrugIds = ref<number[]>([])
const selectedLabsTrueIds = ref<number[]>([])
const selectedLabsFalseIds = ref<number[]>([])

// --- REMOVE FUNCTIONS ---
function removeDrug(id: number) {
  selectedDrugIds.value = selectedDrugIds.value.filter(d => d !== id)
}

function removeLabTrue(id: number) {
  selectedLabsTrueIds.value = selectedLabsTrueIds.value.filter(d => d !== id)
}

function removeLabFalse(id: number) {
  selectedLabsFalseIds.value = selectedLabsFalseIds.value.filter(d => d !== id)
}

// --- COMPUTEDS ---
const selectedDrugs = computed(() =>
    drugs.value.filter(d => selectedDrugIds.value.includes(d.id))
)

const selectedLabsTrue = computed(() =>
    labsTrue.value.filter(l => selectedLabsTrueIds.value.includes(l.id))
)

const selectedLabsFalse = computed(() =>
    labsFalse.value.filter(l => selectedLabsFalseIds.value.includes(l.id))
)
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full">
      <SidebarTrigger/>
      <div class="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <div id="main">
          <header class="mb-8 p-6">
            <a href="#" class="block xl:hidden">
              <i class="text-3xl bi bi-justify text-emerald-700 hover:text-emerald-800 transition-colors"></i>
            </a>
          </header>

          <!-- Enhanced container -->
          <div class="max-w-4xl mx-auto px-6 w-full">

            <!-- Header Section -->
            <div class="text-center mb-10">
              <h1 class="text-4xl font-bold text-emerald-800 mb-4">Payment Management</h1>
              <p class="text-lg text-emerald-600">Process payments for medical services</p>
            </div>

            <!-- Main Form Card -->
            <div class="bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100">
              <div class="flex items-center mb-8">
                <span class="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl mr-4 shadow-md">
                  <i class="bi bi-credit-card text-2xl text-emerald-700"></i>
                </span>
                <div>
                  <h2 class="text-3xl font-bold text-emerald-800">Make Management</h2>
                  <p class="text-emerald-600 mt-1">Complete your payment details</p>
                </div>
              </div>

              <form @submit.prevent="" class="space-y-8">

                <!-- Payment Reason Section -->
                <div class="space-y-3">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-question-circle-fill text-emerald-600 mr-2"></i>
                    What are you paying for?
                  </label>
                  <select v-model="Payments.reason_for_payment"
                          class="w-full px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 text-lg font-medium text-emerald-800 shadow-sm">
                    <option value="" disabled selected class="text-gray-500">Select a service...</option>
                    <option value="Labs" class="bg-white">🧪 Laboratory Tests</option>
                    <option value="Drugs" class="bg-white">💊 Medications</option>
                    <option value="Consultation" class="bg-white">👨‍⚕️ Consultation</option>
                  </select>
                </div>

                <!-- Insurance Section -->
                <div class="space-y-3">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-check text-emerald-600 mr-2"></i>
                    Insurance Coverage
                  </label>
                  <select v-model="Payments.insurance_cover"
                          class="w-full px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 text-lg font-medium text-emerald-800 shadow-sm">
                    <option disabled value="" class="text-gray-500">Select an option...</option>
                    <option :value="true" class="bg-white">✅ Yes, I have insurance</option>
                    <option :value="false" class="bg-white">❌ No, I don't have insurance</option>
                  </select>
                </div>


                <div class="space-y-3"
                     v-if="Payments.insurance_cover === true && Payments.reason_for_payment === 'Labs'">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-check text-emerald-600 mr-2"></i>
                    Labs (With Insurance)
                  </label>

                  <!-- Selected list -->
                  <div
                      class="w-full px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50
             border-2 border-emerald-200 rounded-xl shadow-sm flex flex-wrap gap-2 min-h-[50px] cursor-pointer"
                      @click="showLabsTrueDropdown = !showLabsTrueDropdown">
                    <span v-if="selectedLabsTrueIds.length === 0" class="text-gray-400">Select Lab...</span>
                    <span v-for="lab in selectedLabsTrue" :key="lab.id"
                          class="bg-emerald-200 text-emerald-800 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                        {{ lab.name }}
                        <button type="button" class="ml-1 text-red-500 hover:text-red-700"
                                @click.stop="removeLabTrue(lab.id)">✕</button>
                      </span>
                  </div>

                  <!-- Dropdown -->
                  <div v-if="showLabsTrueDropdown"
                       class="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-emerald-200 rounded-xl shadow-lg">
                    <label v-for="lab in labsTrue" :key="lab.id"
                           class="flex items-center px-4 py-2 hover:bg-emerald-50 cursor-pointer">
                      <input type="checkbox"
                             :value="lab.id"
                             v-model="selectedLabsTrueIds"
                             class="mr-3 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                      <span class="text-emerald-800 font-medium">
                          {{ lab.name }} - GHS {{ lab.price }}
                        </span>
                    </label>
                  </div>
                </div>

                <div class="space-y-3"
                     v-if="Payments.insurance_cover === false && Payments.reason_for_payment === 'Labs'">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-x text-emerald-600 mr-2"></i>
                    Labs (Without Insurance)
                  </label>

                  <!-- Selected list -->
                  <div
                      class="w-full px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50
             border-2 border-emerald-200 rounded-xl shadow-sm flex flex-wrap gap-2 min-h-[50px] cursor-pointer"
                      @click="showLabsFalseDropdown = !showLabsFalseDropdown">
                    <span v-if="selectedLabsFalseIds.length === 0" class="text-gray-400">Select Lab...</span>
                    <span v-for="lab in selectedLabsFalse" :key="lab.id"
                          class="bg-emerald-200 text-emerald-800 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
      {{ lab.name }}
      <button type="button" class="ml-1 text-red-500 hover:text-red-700"
              @click.stop="removeLabFalse(lab.id)">✕</button>
    </span>
                  </div>

                  <!-- Dropdown -->
                  <div v-if="showLabsFalseDropdown"
                       class="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-emerald-200 rounded-xl shadow-lg">
                    <label v-for="lab in labsFalse" :key="lab.id"
                           class="flex items-center px-4 py-2 hover:bg-emerald-50 cursor-pointer">
                      <input type="checkbox"
                             :value="lab.id"
                             v-model="selectedLabsFalseIds"
                             class="mr-3 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                      <span class="text-emerald-800 font-medium">
        {{ lab.name }} - GHS {{ lab.price }}
      </span>
                    </label>
                  </div>
                </div>

                <div class="space-y-3" v-if="Payments.reason_for_payment === 'Drugs'">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-check text-emerald-600 mr-2"></i>
                    Select drugs
                  </label>

                  <!-- Selected list -->
                  <!-- Selected list -->
                  <div
                      class="w-full px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50
           border-2 border-emerald-200 rounded-xl shadow-sm flex flex-wrap gap-2 min-h-[50px] cursor-pointer"
                      @click="showDrugDropdown = !showDrugDropdown">
                    <span v-if="selectedDrugIds.length === 0" class="text-gray-400">Select drugs...</span>
                    <span v-for="drug in selectedDrugs" :key="drug.id"
                              class="bg-emerald-200 text-emerald-800 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                      {{ drug.drug_name }}
                      <button type="button" class="ml-1 text-red-500 hover:text-red-700"
                              @click.stop="removeDrug(drug.id)">✕</button>
                    </span>
                  </div>

                  <!-- Dropdown -->
                  <div v-if="showDrugDropdown"
                       class="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-emerald-200 rounded-xl shadow-lg">
                    <label v-for="drug in drugs" :key="drug.id"
                           class="flex items-center px-4 py-2 hover:bg-emerald-50 cursor-pointer">
                      <input type="checkbox"
                             :value="drug.id"
                             v-model="selectedDrugIds"
                             class="mr-3 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                        <span class="text-emerald-800 font-medium">
                        {{ drug.drug_name }} - GHS {{ drug.drug_price }}
                      </span>
                    </label>
                  </div>
                </div>


                <!-- Fee Information Cards -->
                <div v-if="Payments.insurance_cover === true && Payments.reason_for_payment === 'Consultation'"
                     class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
                  <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center">
                    <i class="bi bi-shield-fill-check text-green-600 mr-2"></i>
                    With Insurance
                  </h3>
                  <input type="text"
                         placeholder="Consultation fee with insurance"
                         :value="consultationTrue?.price"
                         readonly
                         class="w-full px-4 py-3 bg-white border-2 border-green-300 rounded-lg text-lg font-semibold text-green-800 shadow-sm focus:outline-none"/>
                </div>

                <div v-if="Payments.insurance_cover === false && Payments.reason_for_payment === 'Consultation'"
                     class="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
                  <h3 class="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                    <i class="bi bi-shield-x text-orange-600 mr-2"></i>
                    Without Insurance
                  </h3>
                  <input type="text"
                         placeholder="Consultation fee without insurance"
                         :value="consultationFalse?.price || 'Not available'"
                         readonly
                         class="w-full px-4 py-3 bg-white border-2 border-orange-300 rounded-lg text-lg font-semibold text-orange-800 shadow-sm focus:outline-none"/>
                </div>

                <!-- Total Amount Display -->
                <!-- Total Amount Display -->
                <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-center shadow-xl">
                  <h3 class="text-white text-xl font-bold mb-2">
                    <i class="bi bi-calculator text-white mr-2"></i>
                    Total Amount
                  </h3>

                  <!-- Consultation Total -->
                  <div v-if="Payments.reason_for_payment === 'Consultation'" class="text-4xl font-bold text-white">
                    <span v-if="Payments.insurance_cover === true" class="flex items-center justify-center">
                      <i class="bi bi-currency-dollar mr-1"></i>
                      {{ consultationTrue?.price || '0.00' }}
                    </span>
                                    <span v-else-if="Payments.insurance_cover === false" class="flex items-center justify-center">
                      <i class="bi bi-currency-dollar mr-1"></i>
                      {{ consultationFalse?.price || '0.00' }}
                    </span>
                  </div>

                  <!-- Drugs Total -->
                  <input type="text"
                         v-if="Payments.reason_for_payment === 'Drugs'"
                         :value="selectedDrugs.reduce((total, drug) => total + parseFloat(drug.drug_price), 0).toFixed(2)"
                         readonly
                         disabled
                         class="text-4xl font-bold text-white flex items-center justify-center"/>

                  <!-- Labs With Insurance -->
                  <input type="text"
                         v-if="Payments.insurance_cover === true && Payments.reason_for_payment === 'Labs'"
                         :value="selectedLabsTrue.reduce((total, lab) => total + parseFloat(lab.price), 0).toFixed(2)"
                         readonly
                         disabled
                         class="text-4xl font-bold text-white flex items-center justify-center"/>

                  <!-- Labs Without Insurance -->
                  <input type="text"
                         v-if="Payments.insurance_cover === false && Payments.reason_for_payment === 'Labs'"
                         :value="selectedLabsFalse.reduce((total, lab) => total + parseFloat(lab.price), 0).toFixed(2)"
                         readonly
                         disabled
                         class="text-4xl font-bold text-white flex items-center justify-center"/>
                </div>


                <!-- Submit Button -->
                <div class="pt-6">
                  <button type="submit"
                          class="
                           w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform
                             bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:scale-105 hover:shadow-xl active:scale-95
                          ">
                    <i class="bi bi-check-circle-fill mr-2"></i>
                    Process Payment
                  </button>
                </div>

                <!-- Info Cards -->
                <div class="grid md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-emerald-200">
                  <div class="text-center p-4 bg-emerald-50 rounded-lg">
                    <i class="bi bi-shield-check text-2xl text-emerald-600 mb-2"></i>
                    <p class="text-sm font-semibold text-emerald-800">Secure Payment</p>
                  </div>
                  <div class="text-center p-4 bg-teal-50 rounded-lg">
                    <i class="bi bi-clock text-2xl text-teal-600 mb-2"></i>
                    <p class="text-sm font-semibold text-teal-800">Quick Processing</p>
                  </div>
                  <div class="text-center p-4 bg-green-50 rounded-lg">
                    <i class="bi bi-headset text-2xl text-green-600 mb-2"></i>
                    <p class="text-sm font-semibold text-green-800">24/7 Support</p>
                  </div>
                </div>

              </form>
            </div>

            <!-- Additional Info Section -->
            <div class="mt-8 text-center">
              <p class="text-emerald-600 text-sm">
                <i class="bi bi-info-circle mr-1"></i>
                All transactions are encrypted and secure. Your payment information is protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
/* Custom animations */
@keyframes pulse-emerald {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
}

.pulse-emerald {
  animation: pulse-emerald 2s infinite;
}
</style>