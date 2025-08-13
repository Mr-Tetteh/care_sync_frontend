<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useAsyncData, useRoute} from "#app";
import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Patient Past Record',
  middleware: ['check-auth'],
})

const {authToken} = useAuth()

const params = useRoute().params.id

interface PatientRecord {
  id: number;
  created_at: string;
  temperature?: string | number;
  pulse_rate?: string | number;
  respiratory_rate?: string | number;
  blood_pressure?: string;
  weight?: string | number;
  spo2?: string | number;
  fbs?: string | number;
  rbs?: string | number;
  nurse_additional_notes?: string | number;
  history?: string;
  examination_findings?: string;
  diagnosis?: string;
  investigations?: string;
  treatment?: string;
  laboratory_notes?: string;
  medication_notes?: string;
  prescription_notes?: string;
  pharmacist_additional_notes?: string;
  doctor_additional_notes?: string;
}

const file = async (patientId: string | string[]): Promise<PatientRecord[]> => {
  try {
    const {data, error} = await useFetch<PatientRecord[]>(
        `${useRuntimeConfig().public.api}/patients-records/patients/${patientId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken.value}`,
          }
        }
    );

    if (error.value || !data.value) {
      toast.error('Failed to fetch records. Please try again later.');
      return [];
    }
    return data.value;
  } catch (err) {
    toast.error('Failed to fetch records. Please try again later.');
    return [];
  }
};


const {data: past_record} = await useAsyncData<PatientRecord[]>(
    'past_record',
    () => file(params)
);

// Update the formatDateWithOrdinal function with proper typing
function formatDateWithOrdinal(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', {month: 'long'});
  const year = date.getFullYear();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
}

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full bg-gray-100">
      <SidebarTrigger/>
      <div class="min-h-screen">
        <div id="main">
          <!-- Responsive padding -->
          <div class="px-2 sm:px-4 md:px-6 lg:px-8 max-w-[1800px] mx-auto">
            <div class="records-container main_drop" v-if="past_record && past_record.length > 0">

              <div
                  class="card bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-5 border border-emerald-200 rounded-2xl hover:shadow-xl transition-all duration-300 w-full"
                  v-for="(record, $index) in past_record"
                  :key="record.id"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div class="flex items-center gap-2">
                        <!-- Calendar Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3m-10 2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        {{ formatDateWithOrdinal(record.created_at) }}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div class="card-body">
                        <!-- Section Title -->
                        <div class="flex items-center mb-4 gap-3">
                          <!-- Document Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 20h9m-9-4h9m-9-4h9m-9-4h9m-9-4h9m-6 12H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2h-4z"/>
                          </svg>
                          <h4 class="mb-0 font-semibold">
                            Medical Record #{{ $index + 1 }}
                          </h4>
                        </div>

                        <!-- Date & Time -->
                        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <!-- Clock Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {{ new Date(record.created_at).toLocaleString() }}
                        </div>

                        <!-- Vitals Section -->
                        <div class="bg-gray-50">
                          <div class="container mx-auto py-4">
                            <!-- Vitals Session Container -->
                            <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                              <!-- Session Header -->
                              <div class="bg-gradient-to-r from-primary to-accent p-6 text-white">
                                <div class="flex items-center justify-between">
                                  <div class="flex items-center space-x-3">
                                    <div class="bg-white/20 p-2 rounded-lg">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                           viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                      </svg>
                                    </div>
                                    <div>
                                      <h2 class="text-xl font-semibold">Vitals Session</h2>
                                      <p class="text-white/80 text-sm">Real-time monitoring</p>
                                    </div>
                                  </div>
                                  <div class="text-right">
                                    <div class="bg-white/20 px-3 py-1 rounded-full text-sm">
                                      <span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                      Active
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- Vital Signs Grid -->
                              <div class="p-6">
                                <div class="flex items-center space-x-3 mb-6">
                                  <div class="bg-primary/10 p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                  </div>
                                  <h3 class="text-lg font-semibold text-gray-900">Vital Signs</h3>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <!-- Temperature Card -->
                                  <div
                                      class="group bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-red-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                      </div>
                                      <!--                                      <div class="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">Normal</div>-->
                                    </div>
                                    <div>
                                      <p class="text-sm text-red-700 font-medium mb-1">Temperature</p>
                                      <p class="text-2xl font-bold text-red-900">{{ record.temperature }}°C</p>
                                    </div>
                                  </div>

                                  <!-- Pulse Rate Card -->
                                  <div
                                      class="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-pink-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                        </svg>
                                      </div>
                                      <!--                                      <div class="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">Normal</div>-->
                                    </div>
                                    <div>
                                      <p class="text-sm text-pink-700 font-medium mb-1">Pulse Rate</p>
                                      <p class="text-2xl font-bold text-pink-900">{{ record.pulse_rate }} bpm</p>
                                    </div>
                                  </div>

                                  <!-- Respiratory Rate Card -->
                                  <div
                                      class="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-blue-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                                        </svg>
                                      </div>
                                      <!--                                      <div class="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Normal</div>-->
                                    </div>
                                    <div>
                                      <p class="text-sm text-blue-700 font-medium mb-1">Respiratory Rate</p>
                                      <p class="text-2xl font-bold text-blue-900">{{ record.respiratory_rate }}
                                        breaths/min</p>
                                    </div>
                                  </div>

                                  <!-- Blood Pressure Card -->
                                  <div
                                      class="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-5 md:p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-purple-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                      </div>
                                      <!--                                      <div class="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">Normal</div>-->
                                    </div>
                                    <div>
                                      <p class="text-sm text-purple-700 font-medium mb-1">Blood Pressure</p>
                                      <p class="text-2xl font-bold text-purple-900">{{ record.blood_pressure }} mmHg</p>
                                    </div>
                                  </div>

                                  <!-- Weight Card -->
                                  <div
                                      class="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-green-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                      </div>
                                      <!--                                      <div class="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Stable</div>-->
                                    </div>
                                    <div>
                                      <p class="text-sm text-green-700 font-medium mb-1">Weight</p>
                                      <p class="text-2xl font-bold text-green-900">{{ record.weight }} Kg</p>
                                    </div>
                                  </div>


                                  <div
                                      class="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-yellow-500 p-3 rounded-full text-white">
                                        <!-- Pulse / Oxygen / Heartbeat Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 12h3l2-4 4 8 3-6h5"/>
                                        </svg>
                                      </div>
                                      <!-- Optional Status Badge -->
                                      <!-- <div class="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Normal</div> -->
                                    </div>
                                    <div>
                                      <p class="text-sm text-yellow-700 font-medium mb-1">SPO₂</p>
                                      <p class="text-2xl font-bold text-yellow-900">{{ record.spo2 }} %</p>
                                    </div>
                                  </div>


                                  <div v-if="record.fbs"
                                       class="group bg-gradient-to-br from-cyan-50 to-yellow-100 rounded-xl p-6 border border-cyan-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-cyan-500 p-3 rounded-full text-white">
                                        <!-- Blood drop / Glucose Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             class="h-6 w-6">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 2C12 2 7 7.5 7 11a5 5 0 0010 0c0-3.5-5-9-5-9z"/>
                                        </svg>
                                      </div>
                                      <!-- Optional badge -->
                                      <!-- <div class="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Normal</div> -->
                                    </div>
                                    <div v-if="record.fbs">
                                      <p class="text-sm text-cyan-700 font-medium mb-1">FBS</p>
                                      <p class="text-2xl font-bold text-cyan-900">{{ record.fbs }} mg/dL</p>
                                    </div>
                                  </div>

                                  <div v-if="record.rbs"
                                       class="group bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6 border border-rose-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-rose-500 p-3 rounded-full text-white">
                                        <!-- Blood drop icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             class="h-6 w-6">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 2C12 2 7 7.5 7 11a5 5 0 0010 0c0-3.5-5-9-5-9z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div>
                                      <p class="text-sm text-rose-700 font-medium mb-1">RBS</p>
                                      <p class="text-2xl font-bold text-rose-900">{{ record.rbs }} mg/dL</p>
                                    </div>
                                  </div>



                                  <div class="group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div class="flex items-center justify-between mb-4">
                                      <div class="bg-indigo-500 p-3 rounded-full text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             class="h-6 w-6">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div>
                                      <p class="text-sm text-indigo-700 font-medium mb-1">Additional Notes</p>
                                      <p class="text-2xl font-bold text-indigo-900">{{record.nurse_additional_notes}}</p>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr class="my-2"/>

                        <!-- Doctor's Assessment -->
                        <div class="bg-gray-50 p-2 sm:p-4" v-if="record.history">
                          <!-- Enhanced Doctor's Assessment Section -->
                          <div class="w-full">
                            <div class="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl animate-fade-in-up overflow-hidden">
                              <!-- Section Header -->
                              <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div class="bg-white p-2 sm:p-3 rounded-full shadow-lg w-fit">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       stroke="currentColor" stroke-width="2" class="h-8 w-8 text-blue-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h2 class="text-3xl font-bold text-black mb-1">Doctor's Assessment</h2>
                                  <p class="text-blue-400">Comprehensive medical evaluation and treatment plan</p>
                                </div>
                              </div>

                              <!-- Assessment Content -->
                              <div class="border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div class="bg-white p-4 sm:p-6 md:p-8 rounded-xl">
                                  <div class="flex flex-col sm:flex-row items-start gap-4 mb-6">
                                    <div
                                        class="bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-6 w-6 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                      </svg>
                                    </div>
                                    <div class="flex-1">
                                      <h3 class="text-xl font-semibold text-gray-800 mb-2">Clinical Documentation</h3>
                                      <p class="text-gray-600 text-sm">Detailed medical assessment and care plan</p>
                                    </div>
                                  </div>

                                  <div class="space-y-4 sm:space-y-6 w-full">
                                    <!-- History Section -->
                                    <div
                                        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border-l-4 border-blue-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-blue-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-blue-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-blue-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                          </svg>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <h4 class="font-semibold text-gray-800">Patient History</h4>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2"
                                               class="h-4 w-4 text-blue-500 cursor-help">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-blue-400 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed">
                                          {{ record.history }}
                                        </div>
                                      </div>
                                    </div>

                                    <div class="section-divider"></div>

                                    <!-- Examination Findings -->
                                    <div
                                        class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-l-4 border-green-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-green-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-green-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-green-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                          </svg>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <h4 class="font-semibold text-gray-800">Examination Findings</h4>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-green-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-green-500 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed">
                                          {{ record.examination_findings }}
                                        </div>
                                      </div>
                                    </div>

                                    <div class="section-divider"></div>

                                    <!-- Diagnosis -->
                                    <div
                                        class="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 sm:p-6 border-l-4 border-purple-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-purple-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-purple-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-purple-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                          </svg>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <h4 class="font-semibold text-gray-800">Diagnosis</h4>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-purple-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-purple-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-purple-500 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed font-medium">
                                          {{ record.diagnosis }}
                                        </div>
                                      </div>
                                    </div>

                                    <div class="section-divider"></div>

                                    <!-- Investigations -->
                                    <div
                                        class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border-l-4 border-orange-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-orange-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-orange-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-orange-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                          </svg>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <h4 class="font-semibold text-gray-800">Investigations</h4>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-orange-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-orange-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed">
                                          {{ record.investigations }}
                                        </div>
                                      </div>
                                    </div>

                                    <div class="section-divider"></div>

                                    <!-- Treatment Plan -->
                                    <div
                                        class="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 sm:p-6 border-l-4 border-red-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-red-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-red-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-red-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                          </svg>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <h4 class="font-semibold text-gray-800">Treatment Plan</h4>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-4 w-4 text-red-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4V7a2 2 0 012-2h4a2 2 0 012 2v4M8 15h8v4a2 2 0 01-2 2H10a2 2 0 01-2-2v-4z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-red-500 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed">
                                          {{ record.treatment }}
                                        </div>
                                      </div>


                                    </div>

                                    <div
                                        class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 sm:p-6 border-l-4 border-yellow-500 relative overflow-hidden">
                                      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-yellow-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-yellow-100 p-2 rounded-lg">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor" stroke-width="2" class="h-5 w-5 text-yellow-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                          </svg>
                                        </div>
                                        <h4 class="font-semibold text-gray-800">Additional Notes</h4>
                                      </div>
                                      <div class="flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                        </svg>
                                        <div class="text-gray-700 leading-relaxed">
                                          {{ record.doctor_additional_notes }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr class="my-4">
                        <!-- Laboratory Results -->
                        <div class="section-container" v-if="record.laboratory_notes">
                          <div class="section-header gap-3">
                            <i class="bi bi-flask text-primary me-2"></i>
                            <h5 class="mb-0">Laboratory Results</h5>
                          </div>
                          <div class="row g-3">
                            <div class="col-md-12">
                              <div class="vital-card">
                                <i class="bi bi-clipboard2-data text-primary"></i>
                                <div>
                                  <small class="text-muted mb-2">Laboratory Notes</small>
                                  <div v-html="record.laboratory_notes"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <!-- Enhanced Pharmacist's Assessment Section -->
                        <div v-if="record.medication_notes" class="max-w-6xl mx-auto">
                          <div class="medical-section rounded-2xl p-8 shadow-xl animate-fade-in-up">
                            <!-- Section Header with Pharmacy Icon -->
                            <div class="flex items-center gap-4 mb-8">
                              <div class="bg-white p-3 rounded-full shadow-lg pulse-glow">
                                <!-- Pharmacy/Pills Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2" class="h-8 w-8 text-emerald-600">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h4.125a1.125 1.125 0 001.125-1.125V11.25a4.5 4.5 0 00-4.5-4.5z"/>
                                </svg>
                              </div>
                              <div>
                                <h2 class="text-3xl font-bold text-black mb-1">Pharmacist's Assessment</h2>
                                <p class="text-indigo-400">Comprehensive medication evaluation and pharmaceutical
                                  care</p>
                              </div>
                            </div>

                            <!-- Assessment Content -->
                            <div class="gradient-border hover-lift">
                              <div class="gradient-border-inner p-8">
                                <div class="flex items-start gap-4 mb-6">
                                  <div class="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
                                    <!-- Clipboard with Checkmark Icon -->
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" stroke-width="2" class="h-6 w-6 text-white">
                                      <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"/>
                                    </svg>
                                  </div>
                                  <div class="flex-1">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Clinical Documentation</h3>
                                    <p class="text-gray-600 text-sm">Detailed pharmaceutical assessment and care
                                      plan</p>
                                  </div>
                                </div>

                                <div class="space-y-6">
                                  <!-- Medication Notes Section - Orange/Amber Theme -->
                                  <div
                                      class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border-l-4 border-orange-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <!-- Large Pill/Medication Icon -->
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-orange-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m-.75-.082a24.301 24.301 0 00-4.5 0m4.5 0a24.301 24.301 0 014.5 0M19 14.5l-4.091-4.091a2.25 2.25 0 00-1.591-.659H8.604m10.396 4.75s-1.5-1.5-4-1.5-5.5 1.5-5.5 1.5 1.5 1.5 4 1.5 4-1.5 4-1.5z"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-orange-100 p-2 rounded-lg">
                                        <!-- Capsule/Pill Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-orange-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m-.75-.082a24.301 24.301 0 00-4.5 0m4.5 0a24.301 24.301 0 014.5 0M19 14.5l-4.091-4.091a2.25 2.25 0 00-1.591-.659H8.604"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-semibold text-gray-800">Medication Analysis</h4>
                                        <!-- Alert Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-orange-500 cursor-help">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-orange-500 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.medication_notes }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Prescription Notes Section - Teal/Cyan Theme -->
                                  <div
                                      class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-6 border-l-4 border-teal-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <!-- Large Prescription Icon -->
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-teal-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h4.125c.621 0 1.125-.504 1.125-1.125V9.375c0-.621.504-1.125 1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-teal-100 p-2 rounded-lg">
                                        <!-- Prescription Pad Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-teal-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-semibold text-gray-800">Prescription Guidelines</h4>
                                        <!-- Medical Cross Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-4 w-4 text-teal-500">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-teal-500 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.prescription_notes }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Additional Notes Section - Indigo/Blue Theme -->
                                  <div
                                      class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6 border-l-4 border-indigo-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <!-- Large Notes Icon -->
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-indigo-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-indigo-100 p-2 rounded-lg">
                                        <!-- Clinical Notes Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-indigo-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-semibold text-gray-800">Additional Notes</h4>
                                        <!-- Star Rating Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-4 w-4 text-indigo-500">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-indigo-500 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed font-medium">
                                        {{ record.pharmacist_additional_notes }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-start">
                          <NuxtLink :to="`/patients/update_record/${record.id}`" 
                                  class="btn btn-primary w-full sm:w-auto text-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
                            <i class="bi bi-plus-circle mr-2"></i>
                            Additional Records
                          </NuxtLink>
                        </div>

                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div v-else class="flex items-center justify-center min-h-[50vh] w-full">
              <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <p class="text-gray-600 text-lg font-medium">No records found</p>
                <p class="text-gray-500 text-sm">There are no past records available for this patient.</p>
              </div>
            </div>
          </div>
        </div>


      </div>

    </main>
  </SidebarProvider>
</template>

<style scoped>
/* Main Container */
.records-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main_drop {
  margin-top: 10%;
}

/* Card Styling */
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-body {
  padding: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
}

@media (min-width: 640px) {
  .card-body {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .card-body {
    padding: 2rem;
  }
}

/* Header Styling */
.card-body h4 {
  color: #1e293b;
  font-weight: 700;
  font-size: 1.5rem;
}

.text-primary {
  color: #3b82f6 !important;
}

/* Section Styling */
.section-container {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.section-header h5 {
  color: #334155;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0;
}

.section-header i {
  font-size: 1.5rem;
}


/* Vital Card Improvements */
.vital-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.vital-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.vital-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.vital-card i {
  font-size: 1.5rem;
  color: #3b82f6;
  min-width: 24px;
}

.vital-card small {
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.75rem;
}

/* Content Styling */
.vital-card div[v-html] {
  color: #334155;
  font-weight: 500;
  line-height: 1.6;
}

.vital-card div[v-html] p {
  margin: 0;
  padding: 0.5rem 0;
}

/* SVG Icon Styling */
.size-6 {
  width: 1.75rem;
  height: 1.75rem;
  color: #3b82f6;
  flex-shrink: 0;
}

/* Button Styling */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.btn i {
  font-size: 1.1rem;
}

/* HR Styling */
hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 2rem 0;
}

/* Empty State Styling */
.card-body.text-center {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
}

.card-body.text-center i {
  color: #94a3b8;
  margin-bottom: 1rem;
}

.card-body.text-center h5 {
  color: #64748b;
  font-weight: 600;
}

.card-body.text-center p {
  color: #94a3b8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }

  .section-container {
    padding: 1rem;
  }

  .vital-card {
    padding: 1rem;
    gap: 1rem;
  }

  .section-header h5 {
    font-size: 1.1rem;
  }

  .card-body h4 {
    font-size: 1.25rem;
  }
}

/* Animation for cards appearing */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease forwards;
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}

/* Responsive adjustments */
@media (max-width: 639px) {
  .vital-card {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .vital-card::before {
    width: 100%;
    height: 4px;
    top: 0;
    left: 0;
  }
  
  .section-container {
    padding: 1rem !important;
  }
  
  .gradient-border-inner {
    padding: 1.5rem !important;
  }
}

/* Glassmorphism effect for sections */
.section-container {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.gradient-border {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2px;
  border-radius: 16px;
}

.gradient-border-inner {
  background: white;
  border-radius: 14px;
}

.medical-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.medical-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-divider {
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
  height: 1px;
}


</style>