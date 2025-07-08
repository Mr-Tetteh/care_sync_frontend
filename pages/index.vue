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

const {input, appointment} = useAppointments()

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
            <div class="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
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
                          class="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full border border-gray-200">
                        <div class="bg-gradient-to-r from-blue-600 to-blue-400 ">
                          <h2 class="text-xl font-bold text-white py-6 px-6">Book an Appointment</h2>
                          <p class="text-blue-100 text-sm mt-1">Fill out the form below to schedule your visit</p>
                        </div>

                        <div class="p-6">
                          <form class="space-y-6" @submit.prevent="onSubmit">
                            <div>
                              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                              <div class="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="fullName"
                                    v-model="input.full_name"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your full name"
                                />
                              </div>
                            </div>

                            <div>
                              <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone
                                Number</label>
                              <div class="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    v-model="input.phone_number"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your phone number"
                                />
                              </div>
                            </div>

                            <div>
                              <label for="appointmentDate" class="block text-sm font-medium text-gray-700">Appointment
                                Date</label>
                              <div class="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="date"
                                    id="appointmentDate"
                                    v-model="input.appointment_date"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                              </div>
                            </div>

                            <div>
                              <label for="appointmentTime" class="block text-sm font-medium text-gray-700">Appointment
                                Time</label>
                              <div class="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="time"
                                    id="appointmentTime"
                                    v-model="input.appointment_time"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                              </div>
                            </div>


                            <div>
                              <label for="appointmentTime" class="block text-sm font-medium text-gray-700">Reason
                              </label>
                              <div class="mt-1 relative rounded-md shadow-sm">
                                <textarea
                                    v-model="input.reason"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                ></textarea>

                              </div>
                            </div>

                            <div class="pt-2">
                              <button
                                  type="submit"
                                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                              >
                                Book Appointment
                              </button>
                            </div>
                          </form>

                          <div class="mt-6 text-center text-xs text-gray-500">
                            <p>We'll confirm your appointment within 24 hours</p>
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
          <div class="w-1/3 md:w-auto flex justify-center items-center">
            <img src="../public/images/Gynecology consultation-bro.svg" alt="Hospital Logo"
                 class="h-8 md:h-10 opacity-70">
          </div>
          <div class="w-1/3 md:w-auto flex justify-center items-center">
            <img src="" alt="Hospital Logo" class="h-8 md:h-10 opacity-70">
          </div>
          <div class="w-1/3 md:w-auto flex justify-center items-center">
            <img src="" alt="Hospital Logo" class="h-8 md:h-10 opacity-70">
          </div>
          <div class="w-1/3 md:w-auto flex justify-center items-center">
            <img src="" alt="Hospital Logo" class="h-8 md:h-10 opacity-70">
          </div>
          <div class="w-1/3 md:w-auto flex justify-center items-center">
            <img src="" alt="Hospital Logo" class="h-8 md:h-10 opacity-70">
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose CareSync?</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">From seamless patient record management to secure online
            payments and detailed analytics, we empower healthcare institutions to focus on what matters most —
            delivering exceptional care.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Streamlined Records</h3>
            <p class="text-gray-600">Effortlessly manage patient and staff records with our intuitive platform designed
              for healthcare professionals.</p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p class="text-gray-600">Gain insights into operations with comprehensive reporting and analytics tools that
              drive informed decision-making.</p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="bg-blue-100 text-primary p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p class="text-gray-600">Facilitate safe and seamless online payments for patients and hospitals alike with
              our encrypted payment system.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <img src="../public/images/Medicine-pana.svg" alt="Healthcare professionals"
                 class="rounded-lg shadow-xl w-full max-w-lg mx-auto">
          </div>

          <div class="md:w-1/2 md:pl-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">About CareSync</h2>
            <p class="text-lg text-gray-600 mb-6">Our mission is to revolutionize healthcare management by providing
              hospitals with a reliable and user-friendly platform. Through flexible subscription options—monthly,
              yearly, or semi-annual—our service simplifies patient and staff management while ensuring secure and
              efficient operations.</p>

            <div class="space-y-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-semibold">Comprehensive Patient Management</h3>
                  <p class="mt-2 text-gray-600">Track patient records, medical history, and appointments seamlessly
                    within a centralized system.</p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-semibold">Empowered Staff Accounts</h3>
                  <p class="mt-2 text-gray-600">Enable doctors, nurses, pharmacists, and accountants to perform their
                    roles effectively with personalized access.</p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-semibold">Convenient Payment Integration</h3>
                  <p class="mt-2 text-gray-600">Provide patients with a hassle-free way to make payments directly on the
                    app, ensuring transparency and efficiency.</p>
                </div>
              </div>
            </div>
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
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Empowering hospitals to efficiently manage patient and
            staff details with our comprehensive subscription plans.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Hospital Subscription Plans" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3">Hospital Subscription Plans</h3>
              <p class="text-gray-600 mb-4">Flexible monthly, yearly, and 6-month plans for hospitals to access our
                platform and streamline their operations.</p>

            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Staff Account Management" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3">Staff Account Management</h3>
              <p class="text-gray-600 mb-4">Provide individual accounts for nurses, doctors, pharmacists, and
                accountants, enabling role-specific functionalities.</p>

            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Patient Record Management" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3">Patient Record Management</h3>
              <p class="text-gray-600 mb-4">Efficiently manage patient details, including medical history, appointments,
                and prescriptions, all in one place.</p>
            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Online Payments" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3">Online Payments</h3>
              <p class="text-gray-600 mb-4">Enable patients to make payments directly through the app, with secure and
                hassle-free transaction processing.</p>
            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Analytics and Reports" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3">Analytics and Reports</h3>
              <p class="text-gray-600 mb-4">Generate detailed reports and analytics for patient visits, payments, and
                staff activities to drive better decisions.</p>
            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img src="" alt="Secure Data Management" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </SidebarProvider>

</template>
<style scoped>

</style>