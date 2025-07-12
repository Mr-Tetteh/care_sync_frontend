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
    nurse_notes: input.value.nurse_notes,
    temperature: input.value.temperature,
    pulse_rate:  input.value.pulse_rate,
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
      toast(error.value.message || 'An error occurred while creating the patient record')
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

const get_patient_record = async (params) => {
  try {
    const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-records/${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
      }
    })
    return data.value
  } catch (error) {
    toast.error('Error fetching patient record')
  }
}

const {data: past_record} = await useAsyncData('past_record', async () => {
  return await get_patient_record(params.id);
});

// Watch for data changes and populate the form
watch(past_record, (newData) => {
  if (newData && newData.length > 0) {
    const record = newData[0]; // Get the first record
    input.value.nurse_notes = record.nurse_notes || '';
    input.value.doctor_notes = record.doctor_notes || '';
    input.value.laboratory_notes = record.laboratory_notes || '';
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
            <div v-if="past_record && past_record.length > 0" class="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h4 class="text-xl font-semibold mb-4 text-gray-800">Current Record Data</h4>
              <div  class="mb-6">
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

              <div v-if="past_record[0].doctor_notes" class="mb-6">
                <h5 class="text-lg font-medium mb-2 text-green-600">Doctor Notes:</h5>
                <div class="prose max-w-none p-4 bg-green-50 rounded-md" v-html="past_record[0].doctor_notes"></div>
              </div>

              <div v-if="past_record[0].laboratory_notes" class="mb-6">
                <h5 class="text-lg font-medium mb-2 text-purple-600">Laboratory Notes:</h5>
                <div class="prose max-w-none p-4 bg-purple-50 rounded-md"
                     v-html="past_record[0].laboratory_notes"></div>
              </div>
            </div>

            <form class="flex flex-col items-center gap-8 mb-6" @submit.prevent="onsubmit()">
              <!-- Nurse Session -->
              <div class="w-full max-w-4xl" v-if="user.role == 'Nurse'">
                <p class="text-center text-2xl mb-4">Nurse Session</p>
                <editor
                    id="nurse-editor"
                    v-model="input.nurse_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>

              <!-- Doctor Session -->
              <div class="w-full max-w-4xl" v-if="user.role == 'Doctor'">
                <p class="text-center text-2xl mb-4">Doctor's Session</p>
                <editor
                    id="doctor-editor"
                    v-model="input.doctor_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
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