<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {usePharmacy} from "~/composables/usePharmacy";
import {definePageMeta} from "#imports";

const {input, upload_drug} = usePharmacy()

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
  role: ['Pharmacist', 'Administrator']
})
const Onsubmit = async () =>{
  await upload_drug()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gray-50 w-full">
      <SidebarTrigger/>
      <slot/>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-x-hidden">
      <!-- Floating background elements -->
      <div class="floating-pills top-20 left-10 text-6xl text-blue-300">
        <i class="fas fa-pills"></i>
      </div>
      <div class="floating-pills top-40 right-20 text-8xl text-purple-300">
        <i class="fas fa-capsules"></i>
      </div>
      <div class="floating-pills bottom-20 left-1/4 text-5xl text-indigo-300">
        <i class="fas fa-tablets"></i>
      </div>

      <!-- Sidebar Toggle (placeholder) -->
      <button
          class="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <i class="fas fa-bars text-gray-700"></i>
      </button>

      <div class="container mx-auto px-4 py-8 relative z-10">
        <div class="max-w-4xl mx-auto">
          <!-- Header Section -->
          <div class="text-center mb-8">
            <div
                class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 floating-animation">
              <i class="fas fa-pills text-white text-2xl"></i>
            </div>
            <h1 class="text-4xl font-bold text-gray-800 mb-2">Add New Medication</h1>
            <p class="text-gray-600 text-lg">Enter medication details to add to your inventory</p>
          </div>

          <!-- Main Form Card -->
          <div class="glass-morphism rounded-3xl shadow-2xl overflow-hidden">
            <!-- Card Header -->
            <div class="gradient-bg px-8 py-6">
              <div class="flex items-center text-white">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <i class="fas fa-capsules text-xl"></i>
                </div>
                <div>
                  <h2 class="text-2xl font-semibold">Medication Details</h2>
                  <p class="text-white/80">Fill in the form below</p>
                </div>
              </div>
            </div>

            <!-- Form Body -->
            <div class="p-8 bg-white/50">
              <form id="medicationForm" @submit.prevent="Onsubmit" class="space-y-6">
                <!-- Row 1: Drug Name & Price -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      <i class="fas fa-pills mr-2 text-blue-500"></i>Drug Name
                    </label>
                    <input
                        type="text"
                        id="drugName"
                        class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70"
                        placeholder="Enter medication name"
                        required
                        v-model="input.drug_name"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      <i class="fas fa-money-bill-wave mr-2 text-green-500"></i>Price
                    </label>
                    <div class="relative">
                      <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">GHS</span>
                      <input
                          type="number"
                          id="price"
                          class="form-input w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70"
                          placeholder="0.00"
                          step="0.01"
                          required
                          v-model="input.drug_price"
                      />
                    </div>
                  </div>
                </div>

                <!-- Row 2: Category & Quantity -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      <i class="fas fa-tags mr-2 text-purple-500"></i>Category
                    </label>
                    <select
                        id="category"
                        class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70 category-grid"
                        required
                        v-model="input.drug_category"
                    >
                      <option value="" disabled selected>Select Category</option>
                      <option value="Adrenergic">Adrenergic</option>
                      <option value="Alkylating Agent">Alkylating Agent</option>
                      <option value="Analgesic">Analgesic</option>
                      <option value="Anabolic Steroid">Anabolic Steroid</option>
                      <option value="Anesthetic">Anesthetic</option>
                      <option value="Angiotensin Blocker">Angiotensin Blocker</option>
                      <option value="Antacid">Antacid</option>
                      <option value="Anthelmintic">Anthelmintic</option>
                      <option value="Antiandrogen">Antiandrogen</option>
                      <option value="Antianginal">Antianginal</option>
                      <option value="Antiarrhythmic">Antiarrhythmic</option>
                      <option value="Antibiotic">Antibiotic</option>
                      <option value="Anticholinergic">Anticholinergic</option>
                      <option value="Anticoagulant">Anticoagulant</option>
                      <option value="Anticonvulsant">Anticonvulsant</option>
                      <option value="Antidepressant">Antidepressant</option>
                      <option value="Antidiabetic">Antidiabetic</option>
                      <option value="Antidiarrheal">Antidiarrheal</option>
                      <option value="Antidote">Antidote</option>
                      <option value="Antiemetic">Antiemetic</option>
                      <option value="Antifibrinolytic">Antifibrinolytic</option>
                      <option value="Antifungal">Antifungal</option>
                      <option value="Antigout">Antigout</option>
                      <option value="Antiglaucoma">Antiglaucoma</option>
                      <option value="Antihistamine">Antihistamine</option>
                      <option value="Antihypertensive">Antihypertensive</option>
                      <option value="Anti-inflammatory">Anti-inflammatory</option>
                      <option value="Antimalarial">Antimalarial</option>
                      <option value="Antimigraine">Antimigraine</option>
                      <option value="Antineoplastic">Antineoplastic</option>
                      <option value="Antiobesity">Antiobesity</option>
                      <option value="Antiparkinsonian">Antiparkinsonian</option>
                      <option value="Antiparasitic">Antiparasitic</option>
                      <option value="Antiplatelet">Antiplatelet</option>
                      <option value="Antiprotozoal">Antiprotozoal</option>
                      <option value="Antipsychotic">Antipsychotic</option>
                      <option value="Antipyretic">Antipyretic</option>
                      <option value="Antirheumatic">Antirheumatic</option>
                      <option value="Antiseborrheic">Antiseborrheic</option>
                      <option value="Antiseizure">Antiseizure</option>
                      <option value="Antiseptic">Antiseptic</option>
                      <option value="Antispasmodic">Antispasmodic</option>
                      <option value="Antithyroid">Antithyroid</option>
                      <option value="Antituberculosis">Antituberculosis</option>
                      <option value="Antitussive">Antitussive</option>
                      <option value="Antivertigo">Antivertigo</option>
                      <option value="Antiviral">Antiviral</option>
                      <option value="Anxiolytic">Anxiolytic</option>
                      <option value="Beta Blocker">Beta Blocker</option>
                      <option value="Bile Acid Sequestrant">Bile Acid Sequestrant</option>
                      <option value="Biological Therapy">Biological Therapy</option>
                      <option value="Bisphosphonate">Bisphosphonate</option>
                      <option value="Bronchodilator">Bronchodilator</option>
                      <option value="Calcium Channel Blocker">Calcium Channel Blocker</option>
                      <option value="Cardiac Glycoside">Cardiac Glycoside</option>
                      <option value="Cardiovascular">Cardiovascular</option>
                      <option value="Chelating Agent">Chelating Agent</option>
                      <option value="Cholinergic">Cholinergic</option>
                      <option value="Corticosteroid">Corticosteroid</option>
                      <option value="Cough Suppressant">Cough Suppressant</option>
                      <option value="Cycloplegic">Cycloplegic</option>
                      <option value="Decongestant">Decongestant</option>
                      <option value="Dermatological">Dermatological</option>
                      <option value="Diuretic">Diuretic</option>
                      <option value="Dopaminergic">Dopaminergic</option>
                      <option value="Emetic">Emetic</option>
                      <option value="Enzyme Inhibitor">Enzyme Inhibitor</option>
                      <option value="Expectorant">Expectorant</option>
                      <option value="Gastrointestinal">Gastrointestinal</option>
                      <option value="Hormone Therapy">Hormone Therapy</option>
                      <option value="Immunomodulator">Immunomodulator</option>
                      <option value="Immunosuppressant">Immunosuppressant</option>
                      <option value="Laxative">Laxative</option>
                      <option value="Lipid-Lowering">Lipid-Lowering</option>
                      <option value="Local Anesthetic">Local Anesthetic</option>
                      <option value="Miotic">Miotic</option>
                      <option value="Muscle Relaxant">Muscle Relaxant</option>
                      <option value="Narcotic">Narcotic</option>
                      <option value="Neuroprotective">Neuroprotective</option>
                      <option value="NSAID">NSAID</option>
                      <option value="Nutritional Supplement">Nutritional Supplement</option>
                      <option value="Ophthalmic">Ophthalmic</option>
                      <option value="Otic">Otic</option>
                      <option value="Prokinetic">Prokinetic</option>
                      <option value="Proton Pump Inhibitor">Proton Pump Inhibitor</option>
                      <option value="Psychostimulant">Psychostimulant</option>
                      <option value="Sedative">Sedative</option>
                      <option value="Serotonin Modulator">Serotonin Modulator</option>
                      <option value="Stimulant">Stimulant</option>
                      <option value="Steroid">Steroid</option>
                      <option value="Sympathomimetic">Sympathomimetic</option>
                      <option value="Thyroid Hormone">Thyroid Hormone</option>
                      <option value="Tranquilizer">Tranquilizer</option>
                      <option value="Vaccine">Vaccine</option>
                      <option value="Vasoconstrictor">Vasoconstrictor</option>
                      <option value="Vasodilator">Vasodilator</option>
                      <option value="Vitamin">Vitamin</option>
                      <option value="Vulnerary">Vulnerary</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      <i class="fas fa-boxes mr-2 text-orange-500"></i>Quantity in Stock
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70"
                        placeholder="Enter quantity"
                        min="0"
                        required
                        v-model="input.drug_quantity"
                    />
                  </div>
                </div>

                <!-- Usage Description -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">
                    <i class="fas fa-file-medical-alt mr-2 text-red-500"></i>Usage Description
                  </label>
                  <textarea
                      id="usage"
                      class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70 resize-none"
                      rows="4"
                      placeholder="Enter detailed medication usage instructions and information"
                      required
                      v-model="input.drug_description"
                  ></textarea>
                </div>

                <!-- Additional Notes -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">
                    <i class="fas fa-sticky-note mr-2 text-yellow-500"></i>Additional Notes
                  </label>
                  <textarea
                      v-model="input.additional_note"
                      id="notes"
                      class="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/70 resize-none"
                      rows="3"
                      placeholder="Enter storage requirements, warnings, or special instructions"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button
                      type="submit"
                      class="submit-btn w-full py-4 text-white font-semibold rounded-xl text-lg flex items-center justify-center space-x-3 group"
                  >
                    <i class="fas fa-plus-circle group-hover:rotate-90 transition-transform duration-300"></i>
                    <span>Add to Inventory</span>
                    <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Success Message (Hidden by default) -->
          <div id="successMessage"
               class="hidden mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-xl glass-morphism">
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-500 mr-3"></i>
              <p class="font-semibold">Medication added successfully!</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  </SidebarProvider>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.floating-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.form-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
}

.category-grid {
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.category-grid::-webkit-scrollbar {
  width: 6px;
}

.category-grid::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.category-grid::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.category-grid::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.floating-pills {
  position: absolute;
  opacity: 0.1;
  animation: float 8s ease-in-out infinite;
}

.floating-pills:nth-child(2) {
  animation-delay: -2s;
}

.floating-pills:nth-child(3) {
  animation-delay: -4s;
}
</style>
