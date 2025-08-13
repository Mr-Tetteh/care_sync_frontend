<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import Editor from '@tinymce/tinymce-vue';
import {usePatients} from "~/composables/usePatients";
import {toast} from "vue-sonner";
import {ref, onMounted, watch} from 'vue'
import {useAuth} from "~/composables/UseAuth";
import {useAsyncData} from "#app";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Update Patient Record',
  middleware: ['check-auth'],
})

const params = useRoute().params
const {authToken, user} = useAuth()

interface PatientRecord {
  temperature: string;
  pulse_rate: string;
  respiratory_rate: string;
  blood_pressure: string;
  weight: string;
  fbs: string;
  rbs: string;
  spo2: string;
  nurse_additional_notes: string;
  history: string;
  examination_findings: string;
  diagnosis: string;
  investigations: string;
  treatment: string;
  doctor_additional_notes: string;
  medication_notes: string;
  prescription_notes: string;
  pharmacist_additional_notes: string;
}

const input = ref<PatientRecord>({
  temperature: '',
  pulse_rate: '',
  respiratory_rate: '',
  blood_pressure: '',
  weight: '',
  fbs: '',
  rbs: '',
  spo2: '',
  nurse_additional_notes: '',
  history: '',
  examination_findings: '',
  diagnosis: '',
  investigations: '',
  treatment: '',
  doctor_additional_notes: '',
  medication_notes: '',
  prescription_notes: '',
  pharmacist_additional_notes: '',

})

const patient_record_update = async () => {
  const requestBody = {
    temperature: input.value.temperature,
    pulse_rate: input.value.pulse_rate,
    respiratory_rate: input.value.respiratory_rate,
    blood_pressure: input.value.blood_pressure,
    weight: input.value.weight,
    fbs: input.value.fbs,
    rbs: input.value.rbs,
    spo2: input.value.spo2,
    nurse_additional_notes: input.value.nurse_additional_notes,
    history: input.value.history,
    examination_findings: input.value.examination_findings,
    diagnosis: input.value.diagnosis,
    investigations: input.value.investigations,
    treatment: input.value.treatment,
    doctor_additional_notes: input.value.doctor_additional_notes,
    prescription_notes: input.value.prescription_notes,
    medication_notes: input.value.medication_notes,
    pharmacist_additional_notes: input.value.pharmacist_additional_notes,
  };
  try {
    const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-records/${params.id}`, {

      method: 'PATCH',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
      }
    })
    if (error.value) {
      return toast(error.value.message || 'An error occurred while creating the patient record')
    } else {
      toast.success('Patient record updated successfully')
    }
    setTimeout(() => {
      window.location.href = '/patients/patients'
    }, 1000)
  } catch (error: any) {
    toast.error(error.message || 'An error occurred while updating the patient record');
  }
}

const id = params.id
const get_patient_record = async (id: number) => {
  try {
    const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-records/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
      }
    })
    return data.value
  } catch (error: any) {
    toast.error('Error fetching patient record')
  }
}

const {data: past_record} = await useAsyncData('past_record', async () => {
  return await get_patient_record(params.id);
});

watch(past_record, (newData) => {
  if (newData) {
    const record = Array.isArray(newData) ? newData[0] : newData;
    if (record) {
      input.value.temperature = record.temperature || '';
      input.value.pulse_rate = record.pulse_rate || '';
      input.value.respiratory_rate = record.respiratory_rate || '';
      input.value.blood_pressure = record.blood_pressure || '';
      input.value.weight = record.weight || '';
      input.value.spo2 = record.spo2 || '';
      input.value.rbs = record.rbs || '';
      input.value.fbs = record.fbs || '';
      input.value.history = record.history || '';
      input.value.examination_findings = record.examination_findings || '';
      input.value.diagnosis = record.diagnosis || '';
      input.value.investigations = record.investigations || '';
      input.value.treatment = record.treatment || '';
      input.value.medication_notes = record.medication_notes || '';
      input.value.prescription_notes = record.prescription_notes || '';
      input.value.pharmacist_additional_notes = record.pharmacist_additional_notes || '';
      input.value.doctor_additional_notes = record.doctor_additional_notes || '';
      input.value.nurse_additional_notes = record.nurse_additional_notes || '';


    }
  }
}, {immediate: true});
const onsubmit = () => {
  patient_record_update()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full">
      <SidebarTrigger/>

      <div class="min-h-screen bg-gray-50">
        <div id="main">
          <header class="mb-4">
            <a href="#" class="block xl:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </a>
          </header>

          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-center items-center mb-6 p-5">
              <h3 class="text-2xl font-semibold">Patient Record</h3>
            </div>

            <!-- Display existing record data -->
            <div class="bg-gray-50 min-h-screen">
            <div id="app" class="container mx-auto px-4 py-8">
              <!-- Header -->
              <div class="gradient-bg rounded-2xl p-6 mb-8 text-white fade-in">
                <div class="flex items-center justify-between">
                  <div>
                    <h1 class="text-3xl font-bold mb-2">Patient Medical Record</h1>
                    <p class="text-blue-100">Comprehensive healthcare data overview</p>
                  </div>
                  <div class="hidden md:block">
                    <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Main Content -->
              <div v-if="past_record" class="fade-in">
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

                  <!-- Vital Signs Section -->
                  <div v-if="past_record.temperature" class="vital-card bg-white rounded-2xl card-shadow overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-xl font-bold text-white">Vital Signs</h3>
                          <p class="text-blue-100 text-sm">Nurse Assessment</p>
                        </div>
                      </div>
                    </div>

                    <div class="p-6 space-y-4">
                      <div class="flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-red-400 rounded-full mr-3 pulse-animation"></div>
                          <span class="text-gray-700 font-medium">Temperature</span>
                        </div>
                        <span class="font-bold text-red-600 text-lg">{{ past_record.temperature }}°C</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-pink-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-pink-400 rounded-full mr-3 pulse-animation"></div>
                          <span class="text-gray-700 font-medium">Pulse Rate</span>
                        </div>
                        <span class="font-bold text-pink-600 text-lg">{{ past_record.pulse_rate }} bpm</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-blue-400 rounded-full mr-3 pulse-animation"></div>
                          <span class="text-gray-700 font-medium">Respiratory Rate</span>
                        </div>
                        <span class="font-bold text-blue-600 text-lg">{{ past_record.respiratory_rate }} /min</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-purple-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-purple-400 rounded-full mr-3 pulse-animation"></div>
                          <span class="text-gray-700 font-medium">Blood Pressure</span>
                        </div>
                        <span class="font-bold text-purple-600 text-lg">{{ past_record.blood_pressure }} mmHg</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                          <span class="text-gray-700 font-medium">Weight</span>
                        </div>
                        <span class="font-bold text-green-600 text-lg">{{ past_record.weight }} Kg</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-yellow-50 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                          <span class="text-gray-700 font-medium">FBS</span>
                        </div>
                        <span class="font-bold text-yellow-600 text-lg">{{ past_record.fbs }} mg/dL</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-orange-50 rounded-xl" v-if="past_record.rbs">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                          <span class="text-gray-700 font-medium">RBS</span>
                        </div>
                        <span class="font-bold text-orange-600 text-lg">{{ past_record.rbs }} %</span>
                      </div>

                      <div class="flex items-center justify-between py-3 px-4 bg-stone-50 rounded-xl" v-if="past_record.nurse_additional_notes">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-stone-300 rounded-full mr-3"></div>
                          <span class="text-gray-700 font-medium">Additional Notes</span>
                        </div>
                        <span class="font-bold text-yellow-600 text-lg">{{ past_record.nurse_additional_notes }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Doctor's Notes Section -->
                  <div v-if="past_record.history" class="vital-card bg-white rounded-2xl card-shadow overflow-hidden">
                    <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-xl font-bold text-white">Doctor's Assessment</h3>
                          <p class="text-emerald-100 text-sm">Clinical Examination</p>
                        </div>
                      </div>
                    </div>

                    <div class="p-6 space-y-6">
                      <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                          History
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.history }}</p>
                      </div>

                      <div class="bg-blue-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          Examination Findings
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.examination_findings }}</p>
                      </div>

                      <div class="bg-red-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                          Diagnosis
                        </h4>
                        <p class="text-gray-700 leading-relaxed font-medium">{{ past_record.diagnosis }}</p>
                      </div>

                      <div class="bg-purple-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          Investigations
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.investigations }}</p>
                      </div>

                      <div class="bg-green-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          Treatment
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.treatemnt }}</p>
                      </div>
                      <div class="flex items-center justify-between py-3 px-4 bg-stone-50 rounded-xl" v-if="past_record.doctor_additional_notes">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-stone-300 rounded-full mr-3"></div>
                          <span class="text-gray-700 font-medium">Additional Notes</span>
                        </div>
                        <span class="font-bold text-yellow-600 text-lg">{{ past_record.doctor_additional_notes }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Pharmacist's Notes Section -->
                  <div v-if="past_record.medication_notes" class="vital-card bg-white rounded-2xl card-shadow overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-xl font-bold text-white">Pharmacy Review</h3>
                          <p class="text-amber-100 text-sm">Medication Management</p>
                        </div>
                      </div>
                    </div>

                    <div class="p-6 space-y-6">
                      <div class="bg-amber-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                          Medication Notes
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.medication_notes }}</p>
                      </div>

                      <div class="bg-orange-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                          Prescription Notes
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.prescription_notes }}</p>
                      </div>

                      <div class="bg-yellow-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                          <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                          Additional Notes
                        </h4>
                        <p class="text-gray-700 leading-relaxed">{{ past_record.pharmacist_additional_notes }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Data State -->
              <div v-else class="text-center py-16">
                <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Medical Records Found</h3>
                <p class="text-gray-500">Patient data will appear here when available.</p>
              </div>
            </div>
            </div>


            <form class="flex flex-col items-center gap-8 mb-6 bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-xl shadow-lg"
                  @submit.prevent="onsubmit()">
              <!-- Nurse Session -->
              <div v-if="user.role == 'Nurse'" class="w-full max-w-4xl">
                <div class="flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 mr-2" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <p class="text-2xl font-semibold text-gray-800">Nurse Session</p>
                </div>
                <div class="space-y-6">
                  <h4 class="text-lg font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Primary Vital Signs
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Temperature -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
                        </svg>
                        Temperature
                      </label>
                      <div class="relative">
                        <input
                            type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12 text-center bg-gray-50 group-hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="36.5°C"
                            v-model="input.temperature"
                            :disabled="user.role !== 'Nurse'"
                        >
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Pulse Rate -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Respiratory Rate -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11.25V8.75a3.75 3.75 0 00-3.75-3.75h-1.5A1.5 1.5 0 0112.25 4v-.75a.75.75 0 00-1.5 0V4a1.5 1.5 0 01-1.5 1.5H8.75A3.75 3.75 0 005 8.75v2.5a.75.75 0 01-1.5 0v-2.5a5.25 5.25 0 015.25-5.25h1.5a3 3 0 013 3v.75a.75.75 0 001.5 0v-.75a1.5 1.5 0 011.5-1.5h1.5a5.25 5.25 0 015.25 5.25v2.5a.75.75 0 01-1.5 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.75 15.75a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v.75h4.5v-.75a.75.75 0 011.5 0v1.5z"/>
                        </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 11.25V8.75a3.75 3.75 0 00-3.75-3.75h-1.5A1.5 1.5 0 0112.25 4v-.75a.75.75 0 00-1.5 0V4a1.5 1.5 0 01-1.5 1.5H8.75A3.75 3.75 0 005 8.75v2.5a.75.75 0 01-1.5 0v-2.5a5.25 5.25 0 015.25-5.25h1.5a3 3 0 013 3v.75a.75.75 0 001.5 0v-.75a1.5 1.5 0 011.5-1.5h1.5a5.25 5.25 0 015.25 5.25v2.5a.75.75 0 01-1.5 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15.75 15.75a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v.75h4.5v-.75a.75.75 0 011.5 0v1.5z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Blood Pressure -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Weight -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m0 6h12m-6 0a2 2 0 100-4 2 2 0 000 4m0 4v10m0-10a2 2 0 100-4 2 2 0 000 4z"/>
                        </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m0 6h12m-6 0a2 2 0 100-4 2 2 0 000 4m0 4v10m0-10a2 2 0 100-4 2 2 0 000 4z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- SPO2 -->
                    <div class="group">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                        </svg>
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
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                          </svg>
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
                  <div class="relative mt-6">
                    <label class="block text-center text-lg font-semibold text-gray-700 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12h2m0 0h2m0-4h2m4 4h-2m0 4H9m2-4h.5"/>
                      </svg>
                      Additional Notes
                    </label>
                    <textarea
                        class="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                   focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300
                                   resize-none shadow-sm hover:shadow-md group-hover:border-orange-300"
                        placeholder="Enter any additional notes..."
                        v-model="input.nurse_additional_notes"
                        rows="5">
                        </textarea>
                  </div>
                </div>
              </div>

              <!-- Doctor Session -->
              <div class=" w-full from-blue-50 to-indigo-100 p-4">
                <div v-if="user.role == 'Doctor'" class="w-full max-w-5xl mx-auto bg-gradient-to-br">
                  <!-- Header -->
                  <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">Doctor's Session</h1>
                    <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
                  </div>

                  <!-- Main Card -->
                  <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <!-- Section Header -->
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
                      <div class="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white mr-3" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <h2 class="text-2xl font-semibold">Medical Assessment Form</h2>
                      </div>
                    </div>

                    <!-- Form Content -->
                    <div class="p-8">
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- History of presenting complaints -->
                        <div class="group">
                          <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 mr-2"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 20l4-16m4 4l4 4-4 4m-4-4H4"/>
                            </svg>
                            History of Presenting Complaints
                          </label>
                          <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-blue-300"
                                placeholder="Document the patient's chief complaints and history..."
                                v-model="input.history"
                                :disabled="user.role !== 'Doctor'"
                                rows="8">
                            </textarea>
                            <div class="absolute top-4 left-4 text-blue-400 opacity-60">
                              <i class="bi bi-clipboard2-pulse text-lg"></i>
                            </div>
                          </div>
                        </div>

                        <!-- Examination findings -->
                        <div class="group">
                          <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5M19 11a7 7 0 01-7 7m0 0c-1.707 0-3.192.833-4.293 2.143l-1.814-1.815a4.104 4.104 0 00-5.794 1.393m0 0A7 7 0 0119 11"/>
                            </svg>
                            Examination Findings
                          </label>
                          <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-green-300"
                                placeholder="Record physical examination results..."
                                v-model="input.examination_findings"
                                rows="8">
                            </textarea>
                            <div class="absolute top-4 left-4 text-green-400 opacity-60">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                   stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M19 11H5M19 11a7 7 0 01-7 7m0 0c-1.707 0-3.192.833-4.293 2.143l-1.814-1.815a4.104 4.104 0 00-5.794 1.393m0 0A7 7 0 0119 11"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <!-- Diagnosis -->
                        <div class="group">
                          <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-2"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                              <rect x="3" y="3" width="7" height="7"/>
                              <rect x="14" y="3" width="7" height="7"/>
                              <path d="M21 21H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v16a2 2 0 01-2 2z"/>
                            </svg>
                            Diagnosis
                          </label>
                          <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-red-300"
                                placeholder="Primary and differential diagnoses..."
                                v-model="input.diagnosis"
                                rows="8">
                            </textarea>
                            <div class="absolute top-4 left-4 text-red-400 opacity-60">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                   stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"/>
                                <rect x="14" y="3" width="7" height="7"/>
                                <path d="M21 21H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v16a2 2 0 01-2 2z"/>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <!-- Labs -->
                        <div class="group">
                          <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500 mr-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Investigations/Labs
                          </label>
                          <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-purple-300"
                                placeholder="Laboratory results and diagnostic tests..."
                                v-model="input.investigations"
                                rows="8">
                            </textarea>
                            <div class="absolute top-4 left-4 text-purple-400 opacity-60">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                   stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Treatment Section (Full Width) -->
                      <div class="mt-8 group">
                        <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mr-2" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 11H5M19 11a7 7 0 01-7 7m0 0c-1.707 0-3.192.833-4.293 2.143l-1.814-1.815a4.104 4.104 0 00-5.794 1.393m0 0A7 7 0 0119 11"/>
                          </svg>
                          Treatment Plan
                        </label>
                        <div class="relative">
                        <textarea
                            class="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                   focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300
                                   resize-none shadow-sm hover:shadow-md group-hover:border-orange-300"
                            placeholder="Prescribed medications, dosages, and treatment recommendations..."
                            v-model="input.treatment"
                            rows="5">
                        </textarea>
                          <div class="absolute top-4 left-4 text-orange-400 opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5M19 11a7 7 0 01-7 7m0 0c-1.707 0-3.192.833-4.293 2.143l-1.814-1.815a4.104 4.104 0 00-5.794 1.393m0 0A7 7 0 0119 11"/>
                            </svg>
                          </div>
                        </div>

                        <div class="relative mt-6">
                          <label class="block text-center text-lg font-semibold text-gray-700 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h2m0 0h2m0-4h2m4 4h-2m0 4H9m2-4h.5"/>
                            </svg>
                            Additional Notes
                          </label>
                          <textarea
                              class="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                   focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300
                                   resize-none shadow-sm hover:shadow-md group-hover:border-orange-300"
                              placeholder="Enter any additional notes..."
                              v-model="input.doctor_additional_notes"
                              rows="5">
                        </textarea>
                        </div>

                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="text-center mt-8 text-gray-600">
                    <p class="text-sm">Confidential Medical Document - Handle with Care</p>
                  </div>
                </div>
              </div>
              <!-- Lab Session -->
              <div class="w-full max-w-4xl" v-if="user.role == 'Lab_Technician'">
                <div class="flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-500 mr-2" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                  <p class="text-2xl font-semibold text-gray-800">Lab Technician Session</p>
                </div>
                <editor
                    id="lab-editor"
                    v-model="input.laboratory_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>
              <div class="w-full max-w-4xl" v-if="user.role == 'Pharmacist'">
                <div class="flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 mr-2" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                  </svg>
                  <p class="text-2xl font-semibold text-gray-800">Pharmacist Session</p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="group">
                      <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2h-5m-1 4h6a1 1 0 01-1 1v-1zM5 7h3.5a1 1 0 000-2H5a1 1 0 100 2z"/>
                        </svg>
                        Prescription
                      </label>
                      <div class="relative">
                        <textarea
                            class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                   focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300
                                   resize-none shadow-sm hover:shadow-md group-hover:border-blue-300"
                            placeholder="Prescription Note"
                            v-model="input.prescription_notes"
                            rows="8">
                        </textarea>
                        <div class="absolute top-4 left-4 text-blue-400 opacity-60">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2h-5m-1 4h6a1 1 0 01-1 1v-1zM5 7h3.5a1 1 0 000-2H5a1 1 0 100 2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 w-full group">
                      <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        Medication Notes
                      </label>
                      <div class="relative w-full">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-blue-300"
                                placeholder="Medication Notes"
                                v-model="input.medication_notes"
                                rows="8">
                            </textarea>
                        <div class="absolute top-4 left-4 text-blue-400 opacity-60">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="group">
                    <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 mr-2" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11a2 2 0 012-2v6a2 2 0 01-2 2H1a2 2 0 01-2-2V9a2 2 0 012-2m14 0h-3"/>
                      </svg>
                      <p class="text-2xl font-semibold text-gray-800">Additional Notes</p>
                    </label>
                    <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-blue-300"
                                placeholder="Additional Note"
                                v-model="input.pharmacist_additional_notes"
                                rows="8">
                            </textarea>
                      <div class="absolute top-4 left-4 text-blue-400 opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11a2 2 0 012-2v6a2 2 0 01-2 2H1a2 2 0 01-2-2V9a2 2 0 012-2m14 0h-3"/>
                        </svg>
                      </div>
                    </div>
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Submit Button -->
              <div>
                <button
                    type="submit"
                    class="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-lg flex items-center justify-center transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
.prose {
  max-width: none;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  font-weight: 600;
}


.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.card-shadow {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.scrollable-y {
  max-height: 80vh;
  overflow-y: auto;
}
.pulse-animation {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.vital-card {
  transition: all 0.3s ease;
}
.vital-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -3px rgba(0, 0, 0, 0.15);
}
</style>