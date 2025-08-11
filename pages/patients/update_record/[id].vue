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
  pharmacist_notes: '',
  user: ''
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
    doctor_notes: input.value.doctor_notes,
    laboratory_notes: input.value.laboratory_notes,
    pharmacist_notes: input.value.pharmacist_notes
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
  } catch (error) {
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
      input.value.doctor_notes = record.doctor_notes || '';
      input.value.laboratory_notes = record.laboratory_notes || '';
      input.value.pharmacist_notes = record.pharmacist_notes || '';
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
              <i class="text-2xl bi bi-justify"></i>
            </a>
          </header>

          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-center items-center mb-6 p-5">
              <h3 class="text-2xl font-semibold">Patient Record {{ params.id }}</h3>
            </div>

            <!-- Display existing record data -->
            <div v-if="past_record" class="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h4 class="text-xl font-semibold mb-4 text-gray-800">Current Record Data</h4>
              <div class="mb-6">
                <h5 class="text-lg font-medium mb-2 text-blue-600">Nurse Notes:</h5>
                <div class="bg-gray-50 p-6">
                  <div class="max-w-md mx-auto bg-white rounded-lg shadow-sm border">
                    <!-- Header -->
                    <div class="px-6 py-4 border-b">
                      <h2 class="text-lg font-semibold text-gray-900">Vital Signs</h2>
                    </div>
                    <!-- Simple List -->
                    <div class="divide-y divide-gray-100">
                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">Temperature</span>
                        <span class="font-medium text-gray-900">{{ past_record.temperature }}°C</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">Pulse Rate</span>
                        <span class="font-medium text-gray-900">{{ past_record.pulse_rate }} bpm</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">Respiratory Rate</span>
                        <span class="font-medium text-gray-900">{{ past_record.respiratory_rate }} breaths/min</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">Blood Pressure</span>
                        <span class="font-medium text-gray-900">{{ past_record.blood_pressure }} mmHg</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">Weight</span>
                        <span class="font-medium text-gray-900">{{ past_record.weight }} Kg</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">FBS</span>
                        <span class="font-medium text-gray-900">{{ past_record.fbs }} mg/dL</span>
                      </div>

                      <div class="px-6 py-4 flex justify-between items-center">
                        <span class="text-gray-700">RBS</span>
                        <span class="font-medium text-gray-900">{{ past_record.rbs }} %</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div v-if="past_record.doctor_notes" class="mb-6">
                <h5 class="text-lg font-medium mb-2 text-green-600">Doctor Notes:</h5>
                <div class="prose max-w-none p-4 bg-green-50 rounded-md" v-html="past_record.doctor_notes"></div>
              </div>

              <div v-if="past_record.laboratory_notes" class="mb-6">
                <h5 class="text-lg font-medium mb-2 text-purple-600">Laboratory Notes:</h5>
                <div class="prose max-w-none p-4 bg-purple-50 rounded-md"
                     v-html="past_record.laboratory_notes"></div>
              </div>
            </div>

            <form class="flex flex-col items-center gap-8 mb-6" @submit.prevent="onsubmit()">
              <!-- Nurse Session -->
              <div class="w-full max-w-4xl" v-if="user.role == 'Nurse'">
                <p class="text-center text-2xl mb-4">Nurse Session</p>
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
              </div>

              <!-- Doctor Session -->
              <div class="bg-gradient-to-br w-full from-blue-50 to-indigo-100 p-4">
              <div class="w-full max-w-5xl mx-auto">
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
                      <i class="bi bi-person-workspace text-2xl mr-3"></i>
                      <h2 class="text-2xl font-semibold">Medical Assessment Form</h2>
                    </div>
                  </div>

                  <!-- Form Content -->
                  <div class="p-8 bg-gradient-to-b from-gray-50 to-white">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                      <!-- History of presenting complaints -->
                      <div class="group">
                        <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                          <i class="bi bi-clipboard2-pulse text-blue-500 mr-2"></i>
                          History of Presenting Complaints
                        </label>
                        <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-blue-300"
                                placeholder="Document the patient's chief complaints and history..."
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
                          <i class="bi bi-stethoscope text-green-500 mr-2"></i>
                          Examination Findings
                        </label>
                        <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-green-300"
                                placeholder="Record physical examination results..."
                                rows="8">
                            </textarea>
                          <div class="absolute top-4 left-4 text-green-400 opacity-60">
                            <i class="bi bi-stethoscope text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <!-- Diagnosis -->
                      <div class="group">
                        <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                          <i class="bi bi-journal-medical text-red-500 mr-2"></i>
                          Diagnosis
                        </label>
                        <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-red-300"
                                placeholder="Primary and differential diagnoses..."
                                rows="8">
                            </textarea>
                          <div class="absolute top-4 left-4 text-red-400 opacity-60">
                            <i class="bi bi-journal-medical text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <!-- Labs -->
                      <div class="group">
                        <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                          <i class="bi bi-graph-up text-purple-500 mr-2"></i>
                          Investigations/Labs
                        </label>
                        <div class="relative">
                            <textarea
                                class="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                       focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300
                                       resize-none shadow-sm hover:shadow-md group-hover:border-purple-300"
                                placeholder="Laboratory results and diagnostic tests..."
                                rows="8">
                            </textarea>
                          <div class="absolute top-4 left-4 text-purple-400 opacity-60">
                            <i class="bi bi-graph-up text-lg"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Treatment Section (Full Width) -->
                    <div class="mt-8 group">
                      <label class="block text-center text-lg font-semibold text-gray-700 mb-4">
                        <i class="bi bi-capsule text-orange-500 mr-2"></i>
                        Treatment Plan
                      </label>
                      <div class="relative">
                        <textarea
                            class="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl bg-white text-center placeholder-gray-400
                                   focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300
                                   resize-none shadow-sm hover:shadow-md group-hover:border-orange-300"
                            placeholder="Prescribed medications, dosages, and treatment recommendations..."
                            rows="5">
                        </textarea>
                        <div class="absolute top-4 left-4 text-orange-400 opacity-60">
                          <i class="bi bi-capsule text-lg"></i>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-center gap-4 mt-8">
                      <button class="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl
                                   shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105
                                   transition-all duration-200 flex items-center">
                        <i class="bi bi-save mr-2"></i>
                        Save Assessment
                      </button>
                      <button class="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-xl
                                   shadow-lg hover:shadow-xl hover:from-gray-500 hover:to-gray-600 transform hover:scale-105
                                   transition-all duration-200 flex items-center">
                        <i class="bi bi-x-circle mr-2"></i>
                        Clear Form
                      </button>
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
                <p class="text-center text-2xl mb-4">Lab Technician Session</p>
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
                <p class="text-center text-2xl mb-4">Pharmacist Session</p>
                <editor
                    id="lab-editor"
                    v-model="input.pharmacist_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>
              <!-- Submit Button -->
              <div>
                <button
                    type="submit"
                    class="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-lg"
                >
                  Update Record
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
</style>