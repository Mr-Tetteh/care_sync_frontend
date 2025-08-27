<script setup lang="ts">

import {usePatients} from "~/composables/usePatients";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useRoute} from "#app";

const {lab, upload_lab_report} = usePatients()

const params = useRoute().params
const id = Number(params.id)
const handleFileUpload = (e: event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    lab.value.lab_report = target.files[0]
  }

}

const handleSubmit = async () => {
  await upload_lab_report(id)
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <SidebarTrigger/>
      <div class="min-h-screen">
        <div id="main">
          <div class="hospital-dashboard main">
            <div class="flex justify-center min-h-screen py-8 px-4">
              <div class="patient-registration-form w-full max-w-2xl">
                <div class="flex justify-center">
                  <div class="w-full max-w-lg">
                    <!-- Card Container -->
                    <div class="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-white/95">

                      <!-- Header Section -->
                      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-8 px-6">
                        <div class="flex items-center justify-center mb-3">
                          <svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"/>
                          </svg>
                          <h3 class="text-2xl font-bold">Laboratory Report Upload</h3>
                        </div>
                        <p class="text-blue-100 text-sm font-medium">Upload and manage lab reports securely</p>
                      </div>

                      <!-- Form Body -->
                      <div class="p-8">
                        <form class="space-y-6" @submit.prevent="handleSubmit">
                          <!-- Lab Name Field -->
                          <div class="space-y-2">
                            <label for="labName" class="flex items-center text-sm font-semibold text-gray-800">
                              <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z"
                                      clip-rule="evenodd"/>
                              </svg>
                              Lab Name
                            </label>
                            <input
                                type="text"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                id="labName"
                                placeholder="Enter laboratory name"
                                v-model="lab.lab_name"
                            >
                          </div>

                          <!-- Lab Report Upload Field -->
                          <div class="space-y-2">
                            <label for="labReport" class="flex items-center text-sm font-semibold text-gray-800">
                              <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                                      clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                      clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M5 11a1 1 0 011-1h5a1 1 0 110 2H6a1 1 0 01-1-1z"
                                      clip-rule="evenodd"/>
                              </svg>
                              Lab Report
                            </label>

                            <!-- Custom File Upload Area -->
                            <div class="relative">
                              <input
                                  type="file"
                                  class="border-2 w-full h-full border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-gray-50"
                                  id="labReport"
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  @change="handleFileUpload"
                              >
                              <div
                                  class="border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-gray-50">
                                <p class="text-xs text-gray-400 mt-2">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                              </div>
                            </div>
                          </div>

                          <!-- Action Buttons -->
                          <div class="flex justify-end pt-4">
                            <button
                                type="submit"
                                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                              </svg>
                              Upload Report
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <!-- Additional Info Card -->
                    <div class="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
                      <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"/>
                        </svg>
                        Security & Privacy
                      </h4>
                      <div class="space-y-2 text-sm text-gray-600">
                        <p class="flex items-start">
                          <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          All uploaded files are encrypted and stored securely
                        </p>
                        <p class="flex items-start">
                          <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Access restricted to authorized medical personnel only
                        </p>
                        <p class="flex items-start">
                          <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Data complies with healthcare privacy standards
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
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