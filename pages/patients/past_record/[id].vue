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
  history?: string;
  examination_findings?: string;
  diagnosis?: string;
  investigations?: string;
  treatment?: string;
  laboratory_notes?: string;
  pharmacist_notes?: string;
}

const file = async (patientId: string | string[]): Promise<PatientRecord[]> => {
  try {
    const { data, error } = await useFetch<PatientRecord[]>(
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


const { data: past_record } = await useAsyncData<PatientRecord[]>(
    'past_record',
    () => file(params)
);

// Update the formatDateWithOrdinal function with proper typing
function formatDateWithOrdinal(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
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
      <div class="min-h-screen ">
        <div id="main">
          <div class="px-4 ">
            <div class="records-container main_drop" v-if="past_record && past_record.length > 0">

              <div class="card shadow-sm" v-for="(record, $index) in past_record" :key="record.id">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{{ formatDateWithOrdinal(record.created_at) }}</AccordionTrigger>
                    <AccordionContent>
                      <div class="card-body">
                        <!-- Section Title -->
                        <div class="d-flex align-items-center mb-4 gap-3">
                          <i class="bi bi-journal-medical text-primary fs-3 me-2"></i>
                          <h4 class="mb-0">Medical Record #{{ $index + 1 }} {{ new Date(record.created_at) }}</h4>
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

                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                      class="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
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


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr class="my-2"/>

                        <!-- Doctor's Assessment -->
                        <div class="bg-gray-50 p-4" v-if="record.history">
                          <!-- Enhanced Doctor's Assessment Section -->
                          <div class="max-w-6xl mx-auto">
                            <div class="medical-section rounded-2xl p-8 shadow-xl animate-fade-in-up">
                              <!-- Section Header -->
                              <div class="flex items-center gap-4 mb-8">
                                <div class="bg-white p-3 rounded-full shadow-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       stroke="currentColor" stroke-width="2" class="h-8 w-8 text-blue-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h2 class="text-3xl font-bold text-white mb-1">Doctor's Assessment</h2>
                                  <p class="text-blue-100">Comprehensive medical evaluation and treatment plan</p>
                                </div>
                              </div>

                              <!-- Assessment Content -->
                              <div class="gradient-border hover-lift">
                                <div class="gradient-border-inner p-8">
                                  <div class="flex items-start gap-4 mb-6">
                                    <div
                                        class="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
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

                                  <div class="space-y-6">
                                    <!-- History Section -->
                                    <div
                                        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500 relative overflow-hidden">
                                      <div class="absolute top-4 right-4 opacity-10">
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
                                        class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500 relative overflow-hidden">
                                      <div class="absolute top-4 right-4 opacity-10">
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
                                        class="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border-l-4 border-purple-500 relative overflow-hidden">
                                      <div class="absolute top-4 right-4 opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-16 w-16 text-purple-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
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
                                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
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
                                        class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500 relative overflow-hidden">
                                      <div class="absolute top-4 right-4 opacity-10">
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
                                        class="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500 relative overflow-hidden">
                                      <div class="absolute top-4 right-4 opacity-10">
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

                        <!-- Laboratory Results -->
                        <div class="section-container" v-if="record.pharmacist_notes">
                          <div class="section-header gap-3">
                            <i class="bi bi-flask text-primary me-2"></i>
                            <h5 class="mb-0">Pharmacist Results</h5>
                          </div>
                          <div class="row g-3">
                            <div class="col-md-12">
                              <div class="vital-card">
                                <i class="bi bi-clipboard2-data text-primary"></i>
                                <div>
                                  <small class="text-muted mb-2">Pharmacist Notes</small>
                                  <div v-html="record.pharmacist_notes"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="flex col-6 float-start">
                          <NuxtLink :to="`/patients/update_record/${record.id}`" class="btn btn-primary">
                            <i class="bi bi-plus-circle"></i>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
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
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
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