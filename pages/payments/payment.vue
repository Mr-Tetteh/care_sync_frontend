<script setup lang="ts">
import {usePayments} from "~/composables/usePayments"

const {
  consultationTrue,
  consultationFalse,
  consultationPaymentsTrue,
  consultationPaymentsFalse, Payments,
  LabsTrue,
  LabsFalse,
  labsTrue,
  labsFalse
} = usePayments()

await consultationPaymentsTrue()
await consultationPaymentsFalse()
await LabsTrue()
await LabsFalse()
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

              <form action="" class="space-y-8">

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
                    <option disabled selected class="text-gray-500">Select an option...</option>
                    <option :value="true" class="bg-white">✅ Yes, I have insurance</option>
                    <option :value="false" class="bg-white">❌ No, I don't have insurance</option>
                  </select>
                </div>

                <div class="space-y-3" v-if="Payments.insurance_cover === true && Payments.reason_for_payment === 'Labs'">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-check text-emerald-600 mr-2"></i>
                    Labs
                  </label>
                  <select v-model="Payments.lab" multiple
                          class="w-full px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 text-lg font-medium text-emerald-800 shadow-sm">
                    <option disabled selected class="text-gray-500">Select an option...</option>
                    <option v-for="lab in labsTrue" :key="lab.id" :value="lab.id" class="bg-white">{{ lab.name }} - GHS {{ lab.price }}</option>
                  </select>
                </div>

                <div class="space-y-3" v-if="Payments.insurance_cover === false && Payments.reason_for_payment === 'Labs'">
                  <label class="block text-lg font-semibold text-emerald-800 mb-3">
                    <i class="bi bi-shield-check text-emerald-600 mr-2"></i>
                    Labs
                  </label>
                  <select v-model="Payments.lab" multiple
                          class="w-full px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 text-lg font-medium text-emerald-800 shadow-sm">
                    <option disabled selected class="text-gray-500">Select an option...</option>
                    <option v-for="lab in labsFalse" :key="lab.id" :value="lab.id" class="bg-white">{{ lab.name }} - GHS {{ lab.price }}</option>
                  </select>
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
                <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-center shadow-xl">
                  <h3 class="text-white text-xl font-bold mb-2">
                    <i class="bi bi-calculator text-white mr-2"></i>
                    Total Amount
                  </h3>
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