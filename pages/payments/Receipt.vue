<script setup lang="ts">
import {useAsyncData} from "#app";

const {
  FetchLatestPayment,
  latestRecord
} = usePayments()

const {data: latestRecords} = useAsyncData('latestRecord', async () => {
  const res = await FetchLatestPayment()
  return res
})

const printReceipt = () => {
  const printContents = document.getElementById('receipt')?.innerHTML
  const originalContents = document.body.innerHTML

  if (printContents) {
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
    location.reload() // reload to restore Vue app
  }
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full">
      <SidebarTrigger/>
      <div class="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <div  id="receipt">
          <header class="mb-8 p-6">
            <a href="#" class="block xl:hidden">
              <i class="text-3xl bi bi-justify text-emerald-700 hover:text-emerald-800 transition-colors"></i>
            </a>
          </header>

          <!-- Receipt container -->
          <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-emerald-100">
            <Button @click="printReceipt" class="mb-6">Print</Button>

            <h1 class="text-2xl font-bold text-center text-emerald-700 mb-6">
              Payment Receipt
            </h1>

            <!-- Receipt details -->
            <div class="space-y-4 text-gray-700">
              <div class="flex justify-between">
                <span class="font-medium">Receipt ID:</span>
                <span>#{{ latestRecords?.id }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">Reason for Payment:</span>
                <span>{{ latestRecords?.reasonForPayment }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">Insurance Cover:</span>
                <span>
                  <span
                      :class="latestRecords?.insuranceCover ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'"
                  >
                    {{ latestRecords?.insuranceCover ? 'Yes' : 'No' }}
                  </span>
                </span>
              </div>

              <div v-if="latestRecords?.reasonForPayment === 'Consultation'" class="flex justify-between">
                <span class="font-medium">Consultation Fee:</span>
                <span v-if="latestRecords?.consultationTruePrice">GHS {{
                    latestRecords?.consultationTruePrice || '0.00'
                  }}</span>
                <span v-else>GHS {{ latestRecords?.consultationFalsePrice || '0.00' }}</span>

              </div>

              <div v-if="latestRecords?.reasonForPayment === 'Labs' && latestRecords?.insuranceCover === true"
                   class="flex justify-between">
                <span class="font-medium">Lab Tests:</span>
                <span class="font-medium">{{ latestRecords?.selectedLabsTrueNames }}:</span>
                <span>GHS {{ latestRecords?.selectedLabsTrueNamesTotalAmount }}</span>
              </div>

              <div v-if="latestRecords?.reasonForPayment === 'Labs' && latestRecords?.insuranceCover === false"
                   class="flex justify-between">
                <span class="font-medium">Lab Tests:</span>
                <span class="font-medium">{{ latestRecords?.selectedLabsFalseNames }}:</span>
                <span>GHS {{ latestRecords?.selectedLabsFalseNamesTotalAmount }}</span>
              </div>

              <div v-if="latestRecords?.reasonForPayment === 'Drugs'" class="flex justify-between">
                <span class="font-medium">Drugs Total:</span>
                <span>GHS {{ latestRecords?.selectedDrugNamesTotalAmount }}</span>
              </div>

              <hr class="my-4"/>

              <!-- Final total -->
              <div class="flex justify-between text-lg font-bold text-emerald-700">
                <span>Total Paid:</span>
                <span>
                  GHS {{
                    Number(latestRecords?.consultationTruePrice || 0) +
                    Number(latestRecords?.consultationFalsePrice || 0) +
                    Number(latestRecords?.selectedLabsTrueNamesTotalAmount || 0) +
                    Number(latestRecords?.selectedLabsFalseNamesTotalAmount || 0) +
                    Number(latestRecords?.selectedDrugNamesTotalAmount || 0)
                  }}
                </span>
              </div>

              <div class="flex justify-between text-sm text-gray-500 mt-4">
                <span>Date:</span>
                <span>{{ new Date(latestRecords?.createdAt).toLocaleString() }}</span>
              </div>
            </div>

            <!-- Footer -->
            <p class="mt-6 text-center text-sm text-gray-500">
              Thank you for your payment 💚
            </p>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>