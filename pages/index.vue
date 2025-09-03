<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {useAppointments} from "~/composables/useAppointments";

const {input, appointment, is_loading} = useAppointments()

const today = new Date().toISOString().split('T')[0];

const onSubmit = () => {
  appointment()

}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <slot/>

    <div class="bg-gray-50 w-full">
      <SidebarTrigger/>

      <!-- Hero Section -->
      <section id="home" class="pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient">
        <div class="container mx-auto px-4">
          <div class="flex flex-col-reverse md:flex-row items-center">
            <div class="md:w-1/2 text-center md:text-left text-black mt-8 md:mt-0">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">Transforming Healthcare
                Management</h1>
              <p class="text-lg md:text-xl opacity-90 mb-8 max-w-lg">Streamline operations, enhance patient care, and
                optimize resources with our all-in-one healthcare management solution.</p>
              <div
                  class="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Dialog>
                  <DialogTrigger
                      class="bg-white text-primary  px-6 font-medium rounded-full hover:bg-gray-100 transition
                    duration-300 text-center hover:animate-pulse">
                    Book An Appointment
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription>
                        <body>
                        <div
                            class="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 relative"
                        >
                          <!-- Decorative elements -->
                          <div
                              class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                          <!-- Header with enhanced gradient -->
                          <div class="max-h-[80vh] overflow-y-auto">

                            <div
                                class="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
                              <!-- Background pattern -->
                              <div class="absolute inset-0 opacity-10">
                                <div
                                    class="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
                                <div
                                    class="absolute top-10 right-0 w-32 h-32 bg-white rounded-full translate-x-16 -translate-y-16"></div>
                                <div
                                    class="absolute bottom-0 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 translate-y-12"></div>
                              </div>

                              <div class="relative z-10 p-8">
                                <div class="flex items-center justify-between">
                                  <div>
                                    <h2 class="text-2xl font-bold text-white mb-2 flex items-center">
                                      <svg class="w-8 h-8 mr-3 text-white" fill="none" stroke="currentColor"
                                           viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                      Book an Appointment
                                    </h2>
                                    <p class="text-blue-100 text-sm leading-relaxed">Schedule your visit with our
                                      healthcare professionals</p>
                                  </div>
                                  <div
                                      class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Enhanced form section -->
                            <div class="p-8 bg-gradient-to-b from-gray-50/50 to-white">
                              <form class="space-y-6" @submit.prevent="onSubmit">
                                <!-- Full Name with icon -->
                                <div class="group">
                                  <label for="fullName" class="block text-sm font-semibold text-gray-700 mb-2">Full
                                    Name</label>
                                  <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                      </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        v-model="input.full_name"
                                        @input="input.full_name = input.full_name.replace(/[^a-zA-Z\s]/g, '')"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                                        placeholder="Enter your full name"
                                    />
                                  </div>
                                </div>

                                <!-- Phone Number with country code -->
                                <div class="group">
                                  <label for="phoneNumber" class="block text-sm font-semibold text-gray-700 mb-2">Phone
                                    Number</label>
                                  <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                      </svg>
                                    </div>
                                    <div class="absolute inset-y-0 left-12 pl-2 flex items-center pointer-events-none">
                                      <span class="text-gray-600 font-medium">+233</span>
                                      <div class="w-px h-6 bg-gray-300 ml-2"></div>
                                    </div>
                                    <input
                                        type="tel"
                                        inputmode="numeric"
                                        id="phoneNumber"
                                        v-model="input.phone_number"
                                        @input="input.phone_number = input.phone_number.replace(/\D/g, '')"
                                        class="block w-full pl-20 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                                        placeholder="XX XXX XXXX"
                                    />
                                  </div>
                                </div>

                                <!-- Date and Time in a grid -->
                                <!-- Appointment Date -->
                                <div class="group">
                                  <label for="appointmentDate" class="block text-sm font-semibold text-gray-700 mb-2">Appointment
                                    Date</label>
                                  <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                    </div>
                                    <input
                                        type="date"
                                        id="appointmentDate"
                                        v-model="input.appointment_date"
                                        :min="today"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                                    />
                                  </div>
                                </div>

                                <!-- Appointment Time -->
                                <div class="group">
                                  <label for="appointmentTime" class="block text-sm font-semibold text-gray-700 mb-2">Appointment
                                    Time</label>
                                  <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    </div>
                                    <input
                                        type="time"
                                        id="appointmentTime"
                                        v-model="input.appointment_time"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                                    />
                                  </div>
                                </div>

                                <div class="group">
                                  <label for="appointmentTime" class="block text-sm font-semibold text-gray-700 mb-2">Select
                                    Department
                                  </label>
                                  <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    </div>
                                    <select
                                        id="appointmentDepartment"
                                        v-model="input.department"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl
         focus:ring-2 focus:ring-blue-500 focus:border-transparent
         text-gray-900 transition-all duration-200 hover:border-gray-300
         bg-white/80 backdrop-blur-sm"
                                    >
                                      <option value="">Select Department</option>
                                      <option value="general_medicine">General Medicine</option>
                                      <option value="pediatrics">Pediatrics</option>
                                      <option value="obstetrics_gynecology">Obstetrics & Gynecology</option>
                                      <option value="cardiology">Cardiology</option>
                                      <option value="orthopedics">Orthopedics</option>
                                      <option value="dermatology">Dermatology</option>
                                      <option value="neurology">Neurology</option>
                                      <option value="ent">ENT (Ear, Nose & Throat)</option>
                                      <option value="ophthalmology">Ophthalmology (Eye)</option>
                                      <option value="dentistry">Dentistry</option>
                                      <option value="psychiatry">Psychiatry</option>
                                      <option value="urology">Urology</option>
                                      <option value="surgery">General Surgery</option>
                                      <option value="radiology">Radiology</option>
                                      <option value="physiotherapy">Physiotherapy</option>
                                    </select>

                                  </div>
                                </div>


                                <!-- Reason with enhanced textarea -->
                                <div class="group">
                                  <label for="reason" class="block text-sm font-semibold text-gray-700 mb-2">Reason for
                                    Visit</label>
                                  <div class="relative">
                                    <div class="absolute top-4 left-4 pointer-events-none">
                                      <svg
                                          class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                      </svg>
                                    </div>
                                    <textarea
                                        id="reason"
                                        v-model="input.reason"
                                        rows="4"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm resize-none"
                                        placeholder="Please describe your symptoms or reason for the visit..."
                                    ></textarea>
                                  </div>
                                </div>

                                <!-- Enhanced submit button -->
                                <div class="pt-4">
                                  <button
                                      type="submit"
                                      class="w-full group relative flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                                      :disabled="is_loading"
                                      :class="is_loading ? 'opacity-50 cursor-not-allowed' : ''"
                                  >
                                    <svg class="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Book Appointment
                                    <div
                                        class="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                  </button>
                                </div>
                              </form>

                              <!-- Enhanced footer with trust indicators -->
                              <div class="mt-8 pt-6 border-t border-gray-200">
                                <div class="flex items-center justify-center space-x-8 text-sm text-gray-600">
                                  <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Secure & Private</span>
                                  </div>
                                  <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>24hr Confirmation</span>
                                  </div>
                                </div>
                                <p class="text-center text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg p-3">
                                  We'll confirm your appointment within 24 hours and send you a reminder
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        </body>
                      </DialogDescription>
                    </DialogHeader>


                  </DialogContent>
                </Dialog>
                <a href="#about"
                   class="bg-transparent border-2 border-white text-black font-medium px-8 py-3 rounded-full
                 hover:bg-white hover:text-primary transition duration-300 text-center">Learn
                  More</a>
              </div>
            </div>
            <div class="md:w-1/2">
              <img src="../public/images/Winning the battle against Coronavirus-bro.svg"
                   alt="Healthcare Digital Transformation" class="rounded-lg shadow-2xl w-full md:max-w-lg mx-auto">
            </div>
          </div>
        </div>
      </section>

      <!-- Trusted By Section -->
      <section class="py-8 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8">
            <p class="text-gray-500 uppercase tracking-wider font-medium text-sm">Trusted by leading healthcare
              institutions</p>
          </div>
          <div class="flex flex-wrap justify-center gap-8 md:gap-16">
            <div class="md:w-auto flex justify-center items-center">
              <img src="../public/images/271588470_226378542998704_2292916569652645295_n.png" alt="Health Ministry"
                   class="h-20 md:h-24 opacity-100">
            </div>
            <div class=" md:w-auto flex justify-center items-center">
              <img
                  src="../public/images/nhis-ghana-logo.jpg"
                  alt="Hospital Logo" class="h-20 md:h-24 opacity-100">
            </div>
            <div class=" md:w-auto flex justify-center items-center">
              <img
                  src="../public/images/VPUWSGZD_400x400-removebg-preview-q7kcsklhzmxg15vhabnxptg0st6w0c23i9jd8ng720.png"
                  alt="Hospital Logo" class="h-20 md:h-24 opacity-100">
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose CareSync?</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              CareSync is an all-in-one hospital management system that streamlines patient care, staff operations,
              pharmacy management, and appointment scheduling — so you can focus on delivering exceptional healthcare.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Patient & Staff Records -->
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Comprehensive Records</h3>
              <p class="text-gray-600">
                Manage patient details, staff information, and hospital data effortlessly with our centralized platform.
              </p>
            </div>

            <!-- Pharmacy & Drugs -->
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Pharmacy & Drug Management</h3>
              <p class="text-gray-600">
                Keep track of prescriptions, manage drug inventory, and streamline pharmacy operations with ease.
              </p>
            </div>

            <!-- Appointments -->
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Smart Appointments</h3>
              <p class="text-gray-600">
                Simplify patient bookings with a user-friendly appointment system that reduces waiting time and enhances
                care.
              </p>
            </div>
          </div>
        </div>
      </section>


      <!-- Stats Section -->
      <section class="py-16 bg-primary text-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="stats-item bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div class="inline-block p-4 rounded-full bg-white/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-4xl font-bold mb-2">85+</h3>
              <p class="text-lg opacity-80">Doctors</p>
            </div>

            <div class="stats-item bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div class="inline-block p-4 rounded-full bg-white/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 class="text-4xl font-bold mb-2">24</h3>
              <p class="text-lg opacity-80">Departments</p>
            </div>

            <div class="stats-item bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div class="inline-block p-4 rounded-full bg-white/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              <h3 class="text-4xl font-bold mb-2">74</h3>
              <p class="text-lg opacity-80">Research Labs</p>
            </div>

            <div class="stats-item bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div class="inline-block p-4 rounded-full bg-white/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 class="text-4xl font-bold mb-2">150+</h3>
              <p class="text-lg opacity-80">Awards</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <!-- Heading -->
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              CareSync provides a complete hospital management ecosystem — from patient care to staff efficiency,
              pharmacy oversight, and secure data handling. Our services are designed to help healthcare providers focus
              less on paperwork and more on saving lives.
            </p>
          </div>

          <!-- Services Grid -->
          <div class="bg-gray-50 p-8">
            <div class="max-w-7xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <!-- Service 1 -->
                <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div class="h-48 gradient-bg-1 flex items-center justify-center relative">
                    <div class="absolute inset-0 bg-black opacity-10"></div>
                    <div class="relative z-10 text-center">
                      <i class="fas fa-hospital text-white text-6xl icon-bounce"></i>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex items-center mb-3">
                      <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <h3 class="text-xl font-bold text-gray-800">Hospital Subscription Plans</h3>
                    </div>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                      Flexible monthly, yearly, and semi-annual subscriptions for hospitals of any size — scale effortlessly.
                    </p>
                    <div class="flex items-center text-purple-600 font-semibold">
                      <i class="fas fa-arrow-right mr-2"></i> Learn More
                    </div>
                  </div>
                </div>

                <!-- Service 2 -->
                <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div class="h-48 gradient-bg-2 flex items-center justify-center relative">
                    <div class="absolute inset-0 bg-black opacity-10"></div>
                    <div class="relative z-10 text-center">
                      <i class="fas fa-users-cog text-white text-6xl icon-bounce"></i>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex items-center mb-3">
                      <div class="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                      <h3 class="text-xl font-bold text-gray-800">Staff Account Management</h3>
                    </div>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                      Role-based accounts for doctors, nurses, pharmacists, and admins — personalized access for efficiency.
                    </p>
                    <div class="flex items-center text-pink-600 font-semibold">
                      <i class="fas fa-arrow-right mr-2"></i> Learn More
                    </div>
                  </div>
                </div>

                <!-- Service 3 -->
                <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div class="h-48 gradient-bg-3 flex items-center justify-center relative">
                    <div class="absolute inset-0 bg-black opacity-10"></div>
                    <div class="relative z-10 text-center">
                      <i class="fas fa-clipboard-list text-white text-6xl icon-bounce"></i>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex items-center mb-3">
                      <div class="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                      <h3 class="text-xl font-bold text-gray-800">Patient Record Management</h3>
                    </div>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                      Centralize patient registration, medical history, appointments, and prescriptions in one secure system.
                    </p>
                    <div class="flex items-center text-cyan-600 font-semibold">
                      <i class="fas fa-arrow-right mr-2"></i> Learn More
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- View More -->
          <div class="text-center mt-12">
            <RouterLink
                to="/ourService"
                class="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 transition">
              View More Services
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </SidebarProvider>

</template>
<style scoped>
.gradient-bg-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.gradient-bg-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.gradient-bg-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.gradient-bg-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.gradient-bg-5 { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
.gradient-bg-6 { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }

.card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.card-hover:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }

.icon-bounce { animation: bounce 2s infinite; }
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
}
</style>