<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {usePharmacy} from "~/composables/usePharmacy";
import {useAsyncData} from "#app";

const {edit_drug,update_drug, input} = usePharmacy()
const params = useRoute().params.id

onMounted(async () => {
  await edit_drug(params)
})
const updateDrug = async () => {
  await update_drug(params)
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <div class="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header -->
    <div class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div class="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <i class="bi bi-list text-xl text-slate-700"></i>
          </button>
          <div class="hidden sm:block">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pharmacy Inventory
            </h1>
            <p class="text-slate-600 text-sm">Manage your medication stock</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto p-6">
      <!-- Main Form -->
      <div class="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div class="mb-8 text-center">
          <h2 class="text-2xl font-semibold text-slate-800 mb-2">Add New Medication</h2>
          <p class="text-slate-600">Fill in the medication details below</p>
        </div>

        <form v-if="input" @submit.prevent="updateDrug()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Drug Name -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Drug Name *
              </label>
              <input
                  v-model="input.drug_name"
                  type="text"
                  class="block w-full rounded-lg border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter medication name"
                  required
              />
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Price *
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-medium">GHS</span>
                <input
                    type="number"
                    class="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-16 pr-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    v-model="input.drug_price"
                    required
                />
              </div>
            </div>

            <!-- Quantity -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Quantity in Stock *
              </label>
              <input
                  type="number"
                  class="block w-full rounded-lg border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="Enter quantity"
                  v-model="input.drug_quantity"
                  required
              />
            </div>

            <!-- Category -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                  class="block w-full rounded-lg border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  v-model="input.drug_category"
              >
                <option value="" disabled>Select Category</option>
                <option value="Vitamin">Vitamin</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Analgesic">Analgesic</option>
                <option value="Antidepressant">Antidepressant</option>
                <option value="Antihistamine">Antihistamine</option>
                <option value="Antiviral">Antiviral</option>
                <option value="Antifungal">Antifungal</option>
                <option value="Antiseptic">Antiseptic</option>
                <option value="Antipsychotic">Antipsychotic</option>
                <option value="Diuretic">Diuretic</option>
                <option value="Hormone Therapy">Hormone Therapy</option>
                <option value="Immunosuppressant">Immunosuppressant</option>
                <option value="Sedative">Sedative</option>
                <option value="Stimulant">Stimulant</option>
                <option value="Laxative">Laxative</option>
                <option value="Anticoagulant">Anticoagulant</option>
                <option value="Antiemetic">Antiemetic</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Anticonvulsant">Anticonvulsant</option>
                <option value="Bronchodilator">Bronchodilator</option>
                <option value="Gastrointestinal">Gastrointestinal</option>
                <option value="Anesthetic">Anesthetic</option>
                <option value="Dermatological">Dermatological</option>
                <option value="Ophthalmic">Ophthalmic</option>
                <option value="Otic">Otic</option>
                <option value="Antineoplastic">Antineoplastic</option>
                <option value="Anti-inflammatory">Anti-inflammatory</option>
                <option value="Antimalarial">Antimalarial</option>
                <option value="Antirheumatic">Antirheumatic</option>
                <option value="Antispasmodic">Antispasmodic</option>
                <option value="Nutritional Supplement">Nutritional Supplement</option>
                <option value="Probiotic">Probiotic</option>
                <option value="Steroid">Steroid</option>
                <option value="Anti-obesity">Anti-obesity</option>
                <option value="Antiparasitic">Antiparasitic</option>
                <option value="Expectorant">Expectorant</option>
                <option value="Cough Suppressant">Cough Suppressant</option>
                <option value="Antigout">Antigout</option>
                <option value="Antiglaucoma">Antiglaucoma</option>
                <option value="Muscle Relaxant">Muscle Relaxant</option>
                <option value="Corticosteroid">Corticosteroid</option>
                <option value="Antivertigo">Antivertigo</option>
                <option value="Antiprotozoal">Antiprotozoal</option>
                <option value="Antiseizure">Antiseizure</option>
                <option value="Antituberculosis">Antituberculosis</option>
              </select>
            </div>

            <!-- Usage Description -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Usage Description *
              </label>
              <textarea
                  class="block w-full rounded-lg border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="3"
                  placeholder="Enter medication usage instructions and information"
                  required
                  v-model="input.drug_description"
              ></textarea>
            </div>

            <!-- Additional Notes -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Additional Notes
              </label>
              <textarea
                  v-model="input.additional_note"
                  class="block w-full rounded-lg border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="2"
                  placeholder="Enter any storage requirements, warnings, or special instructions"
              ></textarea>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 flex gap-4">
            <button type="submit" class="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <i class="bi bi-plus-circle me-2"></i>
              Update Medication
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </SidebarProvider>
</template>