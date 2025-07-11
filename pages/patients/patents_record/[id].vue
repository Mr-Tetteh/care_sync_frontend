<
<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import Editor from '@tinymce/tinymce-vue';
import {usePatients} from "~/composables/usePatients";
import {toast} from "vue-sonner";
import {ref, onMounted} from 'vue'
import {useAuth} from "~/composables/UseAuth";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Patient Records',
  middleware: ['check-auth'],
})

const params = useRoute().params
const {authToken, user} = useAuth()
const input = ref({
  temperature: '',
  pulse_rate: '',
  respiratory_rate: '',
  blood_pressure: '',
  weight: '',
  fbs: '',
  rbs: '',
  spo2: '',
  doctor_notes: '',
  laboratory_notes: '',
  patient: ''
})

onMounted(() => {
  input.value.patient = params.id
})

const patient_record = async () => {
  try {
    const {data, error} = await useFetch(useRuntimeConfig().public.api + '/patients-records', {
      method: 'POST',
      body: input.value,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
      }
    })
    if (error.value) {
      toast(error.value.message || 'An error occurred while creating the patient record')
    } else {
      toast.success('Patient record created successfully')
    }
    setTimeout(() => {
      window.location.href = '/patients/patients'
    }, 1000)
  } catch (error) {
    toast.error(error.message || 'An error occurred while creating the patient record');
  }
}

const onsubmit = () => {
  patient_record()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <SidebarTrigger class="lg:hidden p-3 text-gray-600 hover:text-gray-800 transition-colors"/>

      <!-- Header -->
      <header class="bg-white shadow-lg border-b border-gray-200 mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <a href="#" class="block xl:hidden mr-4">
                <i class="text-2xl bi bi-justify text-gray-600 hover:text-gray-800 transition-colors"></i>
              </a>
              <div class="flex items-center">
                <i class="bi bi-hospital text-2xl text-blue-600 mr-3"></i>
                <h1 class="text-xl font-bold text-gray-800">Care Sync Patient Record Management</h1>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <i class="bi bi-person-check text-green-600 mr-2"></i>
                <span class="text-sm font-medium text-green-800">{{ user.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Page Title -->
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-gray-800 mb-2">Patient Vital Signs</h3>
          <p class="text-gray-600">Record and monitor patient health metrics</p>
        </div>

        <!-- Main Form Card -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <i class="bi bi-clipboard2-pulse mr-3"></i>
              Nurse Session - Vital Signs Assessment
            </h3>
          </div>

          <!-- Form Content -->
          <div class="p-8">
            <form class="space-y-8" @submit.prevent="onsubmit()">
              <!-- Primary Vital Signs -->
              <div class="space-y-6">
                <h4 class="text-lg font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                  <i class="bi bi-heart-pulse text-red-500 mr-2"></i>
                  Primary Vital Signs
                </h4>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <!-- Temperature -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-thermometer text-red-500 mr-2"></i>
                      Temperature
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="36.5°C"
                          v-model="input.temperature"
                          :disabled="user.role !== 'Nurse'"
                          @input="input.temperature = input.temperature.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-thermometer text-red-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Pulse Rate -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-heart-pulse text-pink-500 mr-2"></i>
                      Pulse Rate
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="72 bpm"
                          v-model="input.pulse_rate"
                          @input="input.pulse_rate = input.pulse_rate.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-heart-pulse text-pink-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Respiratory Rate -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-lungs text-blue-500 mr-2"></i>
                      Respiratory Rate
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="16 /min"
                          v-model="input.respiratory_rate"
                          @input="input.respiratory_rate = input.respiratory_rate.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-lungs text-blue-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Blood Pressure -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-activity text-purple-500 mr-2"></i>
                      Blood Pressure
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="120/80 mmHg"
                          @input="input.blood_pressure = input.blood_pressure.replace(/[^0-9/]/g, '').replace(/(\/.*)\/+/, '$1')"
                          v-model="input.blood_pressure"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-activity text-purple-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Weight -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-speedometer2 text-green-500 mr-2"></i>
                      Weight
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="70 kg"
                          @input="input.weight = input.weight.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          v-model="input.weight"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-speedometer2 text-green-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- SPO2 -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-droplet text-cyan-500 mr-2"></i>
                      SPO2
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="98%"
                          @input="input.spo2 = input.spo2.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          v-model="input.spo2"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-droplet text-cyan-500"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Blood Sugar Section -->
              <div class="space-y-6">
                <h4 class="text-lg font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                  <i class="bi bi-graph-up text-orange-500 mr-2"></i>
                  Blood Sugar Levels
                </h4>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- FBS -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-clipboard-data text-orange-500 mr-2"></i>
                      FBS (Fasting Blood Sugar)
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="100 mg/dL"
                          v-model="input.fbs"
                          @input="input.fbs = input.fbs.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-clipboard-data text-orange-500"></i>
                      </div>
                    </div>
                  </div>

                  <!-- RBS -->
                  <div class="group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <i class="bi bi-clipboard-data text-yellow-500 mr-2"></i>
                      RBS (Random Blood Sugar)
                    </label>
                    <div class="relative">
                      <input
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="140 mg/dL"
                          v-model="input.rbs"
                          @input="input.rbs = input.rbs.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                          :disabled="user.role !== 'Nurse'"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="bi bi-clipboard-data text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-center pt-8 border-t border-gray-200">
                <button
                    type="submit"
                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    :disabled="user.role !== 'Nurse'"
                >
                  <i class="bi bi-check-circle mr-2"></i>
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Quick Reference Cards -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <i class="bi bi-thermometer text-red-500 text-2xl mr-3"></i>
              <div>
                <p class="text-sm text-gray-600">Temperature</p>
                <p class="text-lg font-semibold text-gray-800">Normal Range</p>
                <p class="text-xs text-gray-500">36.1°C - 37.2°C</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <i class="bi bi-heart-pulse text-pink-500 text-2xl mr-3"></i>
              <div>
                <p class="text-sm text-gray-600">Pulse Rate</p>
                <p class="text-lg font-semibold text-gray-800">Normal Range</p>
                <p class="text-xs text-gray-500">60 - 100 bpm</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <i class="bi bi-activity text-purple-500 text-2xl mr-3"></i>
              <div>
                <p class="text-sm text-gray-600">Blood Pressure</p>
                <p class="text-lg font-semibold text-gray-800">Normal Range</p>
                <p class="text-xs text-gray-500">90/60 - 120/80 mmHg</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-cyan-500 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <i class="bi bi-droplet text-cyan-500 text-2xl mr-3"></i>
              <div>
                <p class="text-sm text-gray-600">SPO2</p>
                <p class="text-lg font-semibold text-gray-800">Normal Range</p>
                <p class="text-xs text-gray-500">95% - 100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>
