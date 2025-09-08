<script setup lang="ts">

import {usePayments} from "~/composables/usePayments";
import {useAsyncData} from "#app";

const {
  labsPayments,
  drugsPayments,
  paymentss,
  FetchDrugsPayments,
  FetchConsultationPayments,
  FetchLabPayments
} = usePayments()

const {data: labsPayment} = useAsyncData('labsPayment', async () => {
  const res = await FetchLabPayments()
  return res
})

const {data: drugsPayment} = useAsyncData('drugPayment', async () => {
  const ress = await FetchDrugsPayments()
  return ress
})

const {data: consultationPayments} = useAsyncData('paymentss', async () => {
  const responds = await FetchConsultationPayments()
  return responds
})

const totalConsultationPrice = computed(() => {
  return (consultationPayments.value || []).reduce((total, consult) => {
    return total + Number((consult.consultationTruePrice || 0)) + Number((consult.consultationFalsePrice || 0));
  }, 0);
});

const totalLabPrice = computed(() => {
  return (labsPayment.value || []).reduce((total, lab) => {
    return total + Number((lab.selectedLabsTrueNamesTotalAmount || 0)) + Number((lab.selectedLabsFalseNamesTotalAmount || 0));
  }, 0);
});

const totalDrugsPrice = computed(() => {
  return (drugsPayment.value || []).reduce((total, drug) => {
    return total + Number((drug.selectedDrugNamesTotalAmount || 0));
  }, 0);
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <SidebarTrigger/>
      <div class="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
        <div id="main" class="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
          <header class="mb-6 p-4">
            <a href="#" class="block xl:hidden">
              <i class="text-2xl bi bi-justify text-emerald-700"></i>
            </a>
          </header>
          <div class="row flex">
            <div class="grid lg:grid-cols-1 gap-8 px-4 w-full">
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h1 class="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-between">
            <span class="flex items-center">
              <span class="bg-indigo-100 p-2 rounded-lg mr-3">
                <i class="bi bi-table text-indigo-600"></i>
              </span>
              Consultation Payments
            </span>
                  <span class="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              <!-- {{ labs.length? labs.length : 0 }} labs -->
            </span>
                </h1>

                <div class="overflow-x-auto rounded-lg border border-emerald-200">
                  <table class="w-full ">
                    <thead class="bg-emerald-50">
                    <tr>
                      <th class="px-6 py-4 text-center text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        NHIS Cover
                      </th>
                      <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        Amount Paid
                      </th>

                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-emerald-100">
                    <tr v-for="consult in consultationPayments" :key="consult.id"
                        class="hover:bg-emerald-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-emerald-900 font-semibold bg-emerald-100 px-2 py-1 rounded-full"
                            v-if="consult.insuranceCover === true"> Yes</span>
                        <span class="text-emerald-900 font-semibold bg-red-100 px-2 py-1 rounded-full" v-else> No</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span v-if="consult.insuranceCover === true"
                              class="text-emerald-900 font-semibold">GHC {{ consult.consultationTruePrice }}</span>
                        <span v-if="consult.insuranceCover === false"
                              class="text-emerald-900 font-semibold">GHC {{ consult.consultationFalsePrice }}</span>

                      </td>
                      <!--                      <td class="px-6 py-4 whitespace-nowrap text-center">
                                              <div class="flex justify-center space-x-2">
                                                <Button variant="outline" @click="EditLab(lab.id)"
                                                        class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                                  Edit
                                                </Button>
                                                <Button
                                                    @click="deleteLabManagement(lab.id)"
                                                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                                  Delete
                                                </Button>
                                              </div>
                                            </td>-->
                    </tr>
                    </tbody>
                  </table>
                </div>
                <span class="font-bold"> Total: GHC {{ totalConsultationPrice }}</span>
              </div>
            </div>

            <!-- Side by side container -->
            <div class="grid lg:grid-cols-1 gap-8 px-4 w-full">
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h1 class="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-between">
            <span class="flex items-center">
              <span class="bg-indigo-100 p-2 rounded-lg mr-3">
                <i class="bi bi-table text-indigo-600"></i>
              </span>
              Lab Payments
            </span>
                  <span class="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              <!-- {{ labs.length? labs.length : 0 }} labs -->
            </span>
                </h1>
                <div class="overflow-x-auto rounded-lg border border-emerald-200">
                  <table class="w-full ">
                    <thead class="bg-emerald-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        Labs
                      </th>
                      <th class="px-6 py-4 text-center text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        NHIS Cover
                      </th>
                      <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        Total Amount
                      </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-emerald-100">
                    <tr v-for="lab in labsPayment" :key="lab.id" class="hover:bg-emerald-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <span v-if="lab.insuranceCover === true"
                                class="font-medium text-emerald-900">{{ lab.selectedLabsTrueNames }}</span>
                          <span v-else>{{ lab.selectedLabsFalseNames }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-emerald-900 font-semibold bg-emerald-100 px-2 py-1 rounded-full"
                            v-if="lab.insuranceCover === true"> Yes</span>
                        <span class="text-emerald-900 font-semibold bg-red-100 px-2 py-1 rounded-full" v-else> No</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span v-if="lab.insuranceCover === true" class="text-emerald-900 font-semibold">GHC {{
                            lab.selectedLabsTrueNamesTotalAmount
                          }}</span>
                        <span v-else class="text-emerald-900 font-semibold">GHC {{
                            lab.selectedLabsFalseNamesTotalAmount
                          }}</span>
                      </td>
                    </tr>

                    </tbody>
                  </table>
                </div>
                <span class="font-bold"> Total: GHC {{ totalLabPrice }}</span>

              </div>

            </div>


            <div class="grid lg:grid-cols-1 gap-8 px-4 w-full">
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h1 class="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-between">
            <span class="flex items-center">
              <span class="bg-indigo-100 p-2 rounded-lg mr-3">
                <i class="bi bi-table text-indigo-600"></i>
              </span>
              Drugs Payments
            </span>
                  <span class="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              <!-- {{ labs.length? labs.length : 0 }} labs -->
            </span>
                </h1>

                <div class="overflow-x-auto rounded-lg border border-emerald-200">
                  <table class="w-full ">
                    <thead class="bg-emerald-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        Drug(s)
                      </th>
                      <th class="px-6 py-4 text-center text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        NHIS Cover
                      </th>
                      <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                        Total Amount paid
                      </th>

                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-emerald-100">
                    <tr v-for="drug in drugsPayment" :key="drug.id" class="hover:bg-emerald-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-emerald-900 font-semibold"> {{ drug.selectedDrugNames }}</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-emerald-900 font-semibold bg-emerald-100 px-2 py-1 rounded-full"
                            v-if="drug.insuranceCover === true"> Yes</span>
                        <span class="text-emerald-900 font-semibold bg-red-100 px-2 py-1 rounded-full" v-else> No</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-emerald-900 font-semibold">GHC {{ drug.selectedDrugNamesTotalAmount }}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <span class="font-bold"> Total: GHC {{ totalDrugsPrice }}</span>
              </div>
            </div>
          </div>
          <div class="text-center p-4">
            <span
                class="font-bold text-4xl">Total CashFlow: GHC{{
                totalLabPrice + totalConsultationPrice + totalDrugsPrice
              }}</span>
          </div>

        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>