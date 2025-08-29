<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useRoute} from "#app";
import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import {definePageMeta, useFetch, useAsyncData, useRuntimeConfig, reactive, ref, watch} from "#imports";

// Define page metadata for Nuxt, including title and middleware
definePageMeta({
  title: 'Patient Past Record',
  middleware: ['check-auth'],
})

// Destructure authentication token and user from the useAuth composable
const {authToken, user} = useAuth()
// Assuming usePatients composable exists and provides get_lab_report
const {get_lab_report} = usePatients()

// Get the patient ID from the route parameters
const params = useRoute().params.id

// Interface for a single patient record, defining its structure and types
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
  lab_reports?: any[]; // Add this to store lab reports for each record (though fetched separately)
}

// Interface for a single lab report item
interface LabReportItem {
  id: number;
  lab_name: string; // Changed from report_name to lab_name as per your API response
  lab_report: string; // Changed from report_url to lab_report as per your API response, e.g., "uploads/..."
  uploaded_at?: string; // Added as it might be useful, though not in your sample response
}

// Function to fetch patient records from the API
const fetchPatientRecords = async (patientId: string | string[]): Promise<PatientRecord[]> => {
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

    if (error.value) {
      console.error('API Error:', error.value);
      toast.error('Failed to fetch records: ' + error.value.message);
      return [];
    }
    if (!data.value) {
      toast.info('No patient records found.');
      return [];
    }
    return data.value;
  } catch (err: any) {
    console.error('Fetch records exception:', err);
    toast.error('Failed to fetch records. Please try again later.');
    return [];
  }
};

// Use useAsyncData to fetch patient records, providing loading (pending) and error states
const {data: past_record, pending, error: recordsError} = await useAsyncData<PatientRecord[]>(
    'past_record',
    () => fetchPatientRecords(params)
);

// Reactive object to store lab reports, indexed by recordId, with a loading state for each
const labReports = reactive<Record<number, { data: LabReportItem[] | null; loading: boolean; error: boolean }>>({});

// Function to fetch lab reports for a specific record
const fetchLabReport = async (recordId: number) => {
  if (!labReports[recordId]) {
    labReports[recordId] = {data: null, loading: true, error: false};
  } else {
    labReports[recordId].loading = true;
    labReports[recordId].error = false;
  }

  try {
    // Assuming get_lab_report returns a NuxtFetchResponse or similar with .value property
    // Adjust this based on the actual return type of usePatients().get_lab_report
    const res = await get_lab_report(recordId);
    if (res && res.value) {
      labReports[recordId].data = res.value;
    } else {
      labReports[recordId].data = []; // No data found
      toast.info('No lab reports found for this record.');
    }
  } catch (error) {
    console.error('Error fetching lab report for record', recordId, ':', error);
    labReports[recordId].error = true;
    toast.error(`Failed to fetch lab reports for record ${recordId}.`);
  } finally {
    labReports[recordId].loading = false;
  }
};

// Reactive variable to hold the currently open accordion item(s) to trigger lab report fetching
const openAccordionItem = ref<string | string[]>(''); // For single collapsible, it's a string

// Watch for changes in the open accordion item and fetch lab reports
watch(openAccordionItem, (newValue) => {
  if (typeof newValue === 'string' && newValue.startsWith('item-')) {
    const recordIndex = parseInt(newValue.replace('item-', '')) - 1; // Convert 'item-1' to 0
    if (past_record.value && past_record.value[recordIndex]) {
      const recordId = past_record.value[recordIndex].id;
      // Fetch only if not already loaded and not currently loading
      if (!labReports[recordId]?.data && !labReports[recordId]?.loading) {
        fetchLabReport(recordId);
      }
    }
  }
});

// Ref to store the ID of the lab report that should be embedded (to control iframe visibility)
const selectedLabReportToEmbed = ref<number | null>(null);

// Base URL for serving uploaded files.
// IMPORTANT: Adjust this to your actual server configuration where 'uploads/' is served statically.
// If your Nuxt app is served from the same domain as the uploads, you might not need the full domain.
// Example: if `useRuntimeConfig().public.api` is `http://localhost:8080/api`, and `uploads` is served from `http://localhost:8080/`
const BASE_UPLOAD_URL = 'http://localhost:8080/';

// Function to construct the full URL for an uploaded file
function getFullUploadUrl(relativePath: string): string {
  if (!relativePath) return '';
  // Ensure the base URL has a trailing slash and relativePath does not start with one
  const baseUrl = BASE_UPLOAD_URL.endsWith('/') ? BASE_UPLOAD_URL : `${BASE_UPLOAD_URL}/`;
  const cleanedPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  return `${baseUrl}${cleanedPath}`;
}


// Utility function to format date with ordinal suffix
function formatDateWithOrdinal(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
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
    <main class="w-full bg-gray-100 min-h-screen font-inter">
      <SidebarTrigger/>
      <div class="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1800px] mx-auto">
        <div id="main">
          <!-- Loading State -->
          <div v-if="pending" class="flex flex-col items-center justify-center h-96 text-gray-600">
            <svg class="animate-spin h-10 w-10 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg font-medium">Loading patient records...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="recordsError" class="flex flex-col items-center justify-center h-96 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-lg font-medium">Error loading records. Please try again.</p>
            <p class="text-sm text-red-400 mt-2">{{ recordsError.message }}</p>
          </div>

          <!-- No Records Found State -->
          <div v-else-if="!past_record || past_record.length === 0"
               class="flex flex-col items-center justify-center h-96 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-lg font-medium">No past medical records found for this patient.</p>
            <p class="text-sm text-gray-500 mt-2">Check the patient ID or add new records.</p>
          </div>

          <!-- Records Display -->
          <div v-else class="records-container main_drop">
            <div
                class="card bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-5 border border-emerald-200 rounded-2xl hover:shadow-xl transition-all duration-300 w-full"
                v-for="(record, $index) in past_record"
                :key="record.id"
            >
              <Accordion type="single" collapsible v-model="openAccordionItem">
                <AccordionItem :value="`item-${$index + 1}`">
                  <AccordionTrigger>
                    <div class="flex items-center gap-2 text-lg sm:text-xl font-semibold text-emerald-800">
                      <!-- Calendar Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3m-10 2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Record from {{ formatDateWithOrdinal(record.created_at) }}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div class="card-body bg-white rounded-xl shadow-inner p-4 mt-4">
                      <!-- Section Title -->
                      <div class="flex items-center mb-4 gap-3 border-b pb-3 border-gray-200">
                        <!-- Document Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 20h9m-9-4h9m-9-4h9m-9-4h9m-9-4h9m-6 12H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2h-4z"/>
                        </svg>
                        <h4 class="mb-0 font-bold text-gray-800">
                          Medical Record #{{ $index + 1 }} Details
                        </h4>
                      </div>

                      <!-- Date & Time -->
                      <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <!-- Clock Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Recorded On: {{ new Date(record.created_at).toLocaleString() }}
                      </div>

                      <!-- Vitals Section -->
                      <div class="bg-gray-50 rounded-lg p-2 sm:p-4 mb-6 shadow-sm">
                        <div class="container mx-auto">
                          <!-- Vitals Session Container -->
                          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <!-- Session Header -->
                            <div class="bg-gradient-to-r from-emerald-600 to-green-700 p-6 text-white">
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
                              </div>
                            </div>

                            <!-- Vital Signs Grid -->
                            <div class="p-6">
                              <div class="flex items-center space-x-3 mb-6">
                                <div class="bg-emerald-100 p-2 rounded-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none"
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
                                  </div>
                                  <div>
                                    <p class="text-sm text-red-700 font-medium mb-1">Temperature</p>
                                    <p class="text-2xl font-bold text-red-900">{{ record.temperature || 'N/A' }}°C</p>
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
                                  </div>
                                  <div>
                                    <p class="text-sm text-pink-700 font-medium mb-1">Pulse Rate</p>
                                    <p class="text-2xl font-bold text-pink-900">{{ record.pulse_rate || 'N/A' }} bpm</p>
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
                                  </div>
                                  <div>
                                    <p class="text-sm text-blue-700 font-medium mb-1">Respiratory Rate</p>
                                    <p class="text-2xl font-bold text-blue-900">{{ record.respiratory_rate || 'N/A' }}
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
                                  </div>
                                  <div>
                                    <p class="text-sm text-purple-700 font-medium mb-1">Blood Pressure</p>
                                    <p class="text-2xl font-bold text-purple-900">{{ record.blood_pressure || 'N/A' }}
                                      mmHg</p>
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
                                  </div>
                                  <div>
                                    <p class="text-sm text-green-700 font-medium mb-1">Weight</p>
                                    <p class="text-2xl font-bold text-green-900">{{ record.weight || 'N/A' }} Kg</p>
                                  </div>
                                </div>

                                <!-- SPO₂ Card -->
                                <div
                                    class="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <div class="flex items-center justify-between mb-4">
                                    <div class="bg-yellow-500 p-3 rounded-full text-white">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M3 12h3l2-4 4 8 3-6h5"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <div>
                                    <p class="text-sm text-yellow-700 font-medium mb-1">SPO₂</p>
                                    <p class="text-2xl font-bold text-yellow-900">{{ record.spo2 || 'N/A' }} %</p>
                                  </div>
                                </div>

                                <!-- FBS Card -->
                                <div v-if="record.fbs"
                                     class="group bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <div class="flex items-center justify-between mb-4">
                                    <div class="bg-cyan-500 p-3 rounded-full text-white">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                           class="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 2C12 2 7 7.5 7 11a5 5 0 0010 0c0-3.5-5-9-5-9z"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <div>
                                    <p class="text-sm text-cyan-700 font-medium mb-1">FBS</p>
                                    <p class="text-2xl font-bold text-cyan-900">{{ record.fbs || 'N/A' }} mg/dL</p>
                                  </div>
                                </div>

                                <!-- RBS Card -->
                                <div v-if="record.rbs"
                                     class="group bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6 border border-rose-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <div class="flex items-center justify-between mb-4">
                                    <div class="bg-rose-500 p-3 rounded-full text-white">
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
                                    <p class="text-2xl font-bold text-rose-900">{{ record.rbs || 'N/A' }} mg/dL</p>
                                  </div>
                                </div>

                                <!-- Additional Notes Card -->
                                <div
                                    class="group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
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
                                    <p class="text-sm text-indigo-700 font-medium mb-1">Nurse Notes</p>
                                    <p class="text-2xl font-bold text-indigo-900">
                                      {{ record.nurse_additional_notes || 'N/A' }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-6 border-gray-200"/>

                      <!-- Doctor's Assessment -->
                      <div class="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm"
                           v-if="record.history || record.examination_findings || record.diagnosis || record.investigations || record.treatment || record.doctor_additional_notes">
                        <!-- Enhanced Doctor's Assessment Section -->
                        <div class="w-full">
                          <div
                              class="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl animate-fade-in-up overflow-hidden">
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
                                <h2 class="text-3xl font-bold text-gray-900 mb-1">Doctor's Assessment</h2>
                                <p class="text-blue-500">Comprehensive medical evaluation and treatment plan</p>
                              </div>
                            </div>

                            <!-- Assessment Content -->
                            <div
                                class="border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
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
                                    <h3 class="text-xl font-bold text-gray-800 mb-2">Clinical Documentation</h3>
                                    <p class="text-gray-600 text-sm">Detailed medical assessment and care plan</p>
                                  </div>
                                </div>

                                <div class="space-y-4 sm:space-y-6 w-full">
                                  <!-- History Section -->
                                  <div v-if="record.history"
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
                                        <h4 class="font-bold text-gray-800">Patient History</h4>
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
                                  <div v-if="record.examination_findings"
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
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-bold text-gray-800">Examination Findings</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-green-500 cursor-help">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-green-400 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.examination_findings }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Diagnosis -->
                                  <div v-if="record.diagnosis"
                                       class="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 sm:p-6 border-l-4 border-red-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-red-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-red-100 p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-red-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-bold text-gray-800">Diagnosis</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-red-500 cursor-help">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-red-400 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.diagnosis }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Investigations -->
                                  <div v-if="record.investigations"
                                       class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 sm:p-6 border-l-4 border-yellow-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-yellow-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414a1 1 0 00-.707-.293H7a2 2 0 00-2 2v11a2 2 0 002 2zM10 21h7a2 2 0 002-2V7M7 21a2 2 0 002 2h7a2 2 0 002-2"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-yellow-100 p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-yellow-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414a1 1 0 00-.707-.293H7a2 2 0 00-2 2v11a2 2 0 002 2zM10 21h7a2 2 0 002-2V7M7 21a2 2 0 002 2h7a2 2 0 002-2"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-bold text-gray-800">Investigations</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-yellow-500 cursor-help">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.investigations }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Treatment -->
                                  <div v-if="record.treatment"
                                       class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 border-l-4 border-indigo-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-indigo-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M4 8h16M4 16h16M4 20h16M4 4h16M4 12h16"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-indigo-100 p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-indigo-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M4 8h16M4 16h16M4 20h16M4 4h16M4 12h16"/>
                                        </svg>
                                      </div>
                                      <div class="flex items-center gap-2">
                                        <h4 class="font-bold text-gray-800">Treatment Plan</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2"
                                             class="h-4 w-4 text-indigo-500 cursor-help">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                      </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.treatment }}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="section-divider"></div>

                                  <!-- Doctor Additional Notes -->
                                  <div v-if="record.doctor_additional_notes"
                                       class="bg-gradient-to-r from-gray-50 to-zinc-50 rounded-xl p-4 sm:p-6 border-l-4 border-gray-500 relative overflow-hidden">
                                    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-10">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2" class="h-16 w-16 text-gray-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                      </svg>
                                    </div>
                                    <div class="flex items-center gap-3 mb-4">
                                      <div class="bg-gray-100 p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" stroke-width="2" class="h-5 w-5 text-gray-600">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                      </div>
                                      <h4 class="font-bold text-gray-800">Doctor's Additional Notes</h4>
                                    </div>
                                    <div class="flex items-start gap-3">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor" stroke-width="2"
                                           class="h-4 w-4 text-gray-400 mt-1 flex-shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                      </svg>
                                      <div class="text-gray-700 leading-relaxed">
                                        {{ record.doctor_additional_notes || 'N/A' }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-6 border-gray-200"/>

                      <!-- Lab Reports Section -->
                      <div class="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-sm">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                          <div class="bg-white p-2 sm:p-3 rounded-full shadow-lg w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" stroke-width="2" class="h-8 w-8 text-indigo-600">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                            </svg>
                          </div>
                          <div>
                            <h2 class="text-3xl font-bold text-gray-900 mb-1">Lab Reports</h2>
                            <p class="text-indigo-500">View attached laboratory results</p>
                          </div>
                        </div>

                        <div v-if="labReports[record.id]?.loading"
                             class="flex items-center justify-center p-4 text-indigo-600">
                          <svg class="animate-spin h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                               viewBox="0 0 24 24" stroke="currentColor">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Loading lab reports...</span>
                        </div>

                        <div v-else-if="labReports[record.id]?.error"
                             class="p-4 text-red-600 border border-red-300 bg-red-50 rounded-lg">
                          Failed to load lab reports for this record.
                        </div>

                        <div v-else-if="!labReports[record.id]?.data || labReports[record.id]?.data.length === 0"
                             class="p-4 text-gray-600 border border-gray-300 bg-gray-50 rounded-lg">
                          No lab reports available for this record.
                        </div>

                        <ul v-else class="space-y-3">
                          <li v-for="labReport in labReports[record.id].data" :key="labReport.id"
                              class="flex flex-col bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center justify-between w-full mb-2">
                              <div class="flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <div>
                                  <p class="font-semibold text-gray-800">Lab Name: {{ labReport.lab_name }}</p>
                                </div>
                              </div>
                              <a :href="getFullUploadUrl(labReport.lab_report)" target="_blank"
                                 class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                View Report
                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-5 w-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                              </a>
                            </div>

                            <!-- Iframe for embedding the report -->
                            <div v-if="selectedLabReportToEmbed === labReport.id"
                                 class="mt-4 w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                              <iframe :src="getFullUploadUrl(labReport.lab_report)" frameborder="0"
                                      class="w-full h-full p-2"
                                      loading="lazy"
                                      allowfullscreen>
                                Your browser does not support iframes. Please use the "View Report" link.
                              </iframe>
                            </div>
                            <button v-else @click="selectedLabReportToEmbed = labReport.id"
                                    class="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                              Embed Report Below
                            </button>
                            <button v-if="selectedLabReportToEmbed === labReport.id"
                                    @click="selectedLabReportToEmbed = null"
                                    class="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                              Hide Embedded Report
                            </button>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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