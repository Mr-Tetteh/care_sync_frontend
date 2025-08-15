<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar"
import AppSidebar from "~/components/AppSidebar.vue"
import {usePatients} from "~/composables/usePatients";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
  role: ['Receptionist'],
})

const today = new Date().toISOString().split('T')[0];
const forceGhaPrefix = () => {
  // remove everything except numbers and dash
  let val = input.value.ghana_card_number.replace(/[^0-9-]/g, '')

  // remove accidental leading dash if typed without prefix
  val = val.replace(/^-+/, '')

  // always ensure prefix
  input.value.ghana_card_number = 'GHA-' + val
}

const {input,is_loading, uploadPatient} = usePatients()
const handleSubmit = async () => {
  await uploadPatient();
}

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>

    <div id="app" class="w-full">
      <div class="   bg-gradient-to-r from-orange-400 to-purple-400  mb-4 animate-fade-in">
        <!-- Sidebar Trigger -->
        <SidebarTrigger class="p-2 hover:bg-slate-100 rounded-lg transition-colors"/>

        <button class="sidebar-trigger">
          <i class="fas fa-bars text-gray-700"></i>
        </button>

        <main class="min-h-screen p-4 md:p-10">
          <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <header class="text-center mb-10 animate-fade-in">
              <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <i class="fas fa-user-plus text-2xl text-white"></i>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Register Patient</h1>
              <p class="text-white/80 text-lg">Complete the form to sign up a patient</p>
            </header>

            <!-- Main Form Card -->
            <div class="glass-card rounded-2xl card-shadow p-8 md:p-12 animate-fade-in">
              <form @submit.prevent="handleSubmit">
                <!-- Patient Information Section -->
                <div class="mb-12">
                  <div class="section-header">
                    <div class="flex items-center">
                      <i class="fas fa-user text-2xl text-indigo-600 mr-3"></i>
                      <h2 class="text-2xl font-semibold text-gray-800">Patient Information</h2>
                    </div>
                    <span class="ml-3">Fields with <span class="text-red-400">(*)</span> are required </span>

                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- First Name -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-user mr-2 text-indigo-500"></i>First Name<span class="text-red-400">*</span>

                      </label>
                      <input type="text"
                             v-model="input.first_name"
                              @input="input.first_name = input.first_name.replace(/[^a-zA-Z\s]/g, '')"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient first name">
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-user mr-2 text-indigo-500"></i>Last Name<span class="text-red-400">*</span>
                      </label>
                      <input type="text"
                             v-model="input.last_name"
                             @input="input.last_name = input.last_name.replace(/[^a-zA-Z\s]/g, '')"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient last name">
                    </div>

                    <!-- Other Names -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-user-tag mr-2 text-indigo-500"></i>Other Names
                      </label>
                      <input type="text"
                             v-model="input.other_names"
                             @input="input.other_names = input.other_names.replace(/[^a-zA-Z\s]/g, '')"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient other names">
                    </div>

                    <!-- Contact -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-phone mr-2 text-indigo-500"></i>Contact<span class="text-red-400">*</span>
                      </label>
                      <input type="tel"
                             inputmode="numeric"
                             @input="input.phone = input.phone.replace(/\D/g, '')"
                             v-model="input.phone"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient contact">
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-calendar-alt mr-2 text-indigo-500"></i>Date of Birth<span class="text-red-400">*</span>
                      </label>
                      <input type="date"
                             :max="today"
                             v-model="input.date_of_birth"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient date of birth">
                    </div>

                    <!-- Gender -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-venus-mars mr-2 text-indigo-500"></i>Gender<span class="text-red-400">*</span>
                      </label>
                      <div class="relative">
                        <select v-model="input.gender"
                                class="w-full px-4 py-3 select-focus rounded-xl bg-white/70 backdrop-blur-sm appearance-none">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>

                    <!-- Address -->
                    <div class="form-group md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i>Address<span
                          class="text-red-400">*</span>
                      </label>
                      <input type="text"
                             v-model="input.address"
                             @input="input.address = input.address.replace(/[^a-zA-Z\s]/g, '')"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient address">
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-envelope mr-2 text-indigo-500"></i>Email
                      </label>
                      <input type="email"
                             v-model="input.email"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter patient email">
                    </div>

                    <!-- Ghana Card Number -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-id-card mr-2 text-indigo-500"></i>Ghana Card Number
                      </label>
                      <input
                          type="text"
                          v-model="input.ghana_card_number"
                          @input="forceGhaPrefix"
                          class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                      />

                    </div>
                  </div>
                </div>

                <!-- Emergency Contact Section -->
                <div class="mb-12">
                  <div class="section-header">
                    <div class="flex items-center">
                      <i class="fas fa-exclamation-triangle text-2xl text-red-500 mr-3"></i>
                      <h2 class="text-2xl font-semibold text-gray-800">Emergency Contact</h2>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Emergency Personal Name -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-user-shield mr-2 text-red-500"></i>Emergency Personal Name<span
                          class="text-red-400">*</span>
                      </label>
                      <input type="text"
                             v-model="input.emergency_personal_name"
                             @input="input.emergency_personal_name = input.emergency_personal_name.replace(/[^a-zA-Z\s]/g, '')"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter emergency contact name">
                    </div>

                    <!-- Emergency Contact -->
                    <div class="form-group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-phone-alt mr-2 text-red-500"></i>Emergency Contact<span
                          class="text-red-400">*</span>
                      </label>
                      <input type="tel"
                             inputmode="numeric"
                             @input="input.emergency_personal_contact = input.emergency_personal_contact.replace(/\D/g, '')"
                             v-model="input.emergency_personal_contact"
                             class="w-full px-4 py-3 input-focus rounded-xl bg-white/70 backdrop-blur-sm"
                             placeholder="Enter emergency contact number">
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                  <button type="submit"
                          :disabled="is_loading"
                          class="btn-primary px-8 py-4 text-white font-semibold rounded-xl text-lg inline-flex items-center"
                          :class="is_loading? 'opacity-50 cursor-not-allowed' : ''"
                  >
                    <i class="fas fa-check-circle mr-2"></i>
                    Register Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.card-shadow {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.input-focus {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #e5e7eb;
}

.input-focus:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.select-focus {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #e5e7eb;
}

.select-focus:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(22, 163, 74, 0.4);
}

.section-header {
  position: relative;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.floating-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  transition: color 0.3s ease;
}

.input-with-icon {
  padding-left: 40px;
}

.input-focus:focus + .floating-icon {
  color: #667eea;
}

.form-group {
  position: relative;
  margin-bottom: 24px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sidebar-trigger {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sidebar-trigger:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 1);
}
</style>