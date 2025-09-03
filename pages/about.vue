<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <slot/>

    <div class="bg-gray-50 w-full">
      <SidebarTrigger/>
      <section id="about" class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-4xl font-bold mb-6 text-center p-4">About CareSync</h2>

          <div class="md:w-full mb-8 md:mb-0">
            <img src="../public/images/Medicine-pana.svg" alt="Healthcare professionals"
                 class="rounded-lg shadow-xl w-full max-w-lg mx-auto justify-center p-6 h-100"/>
          </div>

          <div class="flex flex-col md:flex-row items-center">
            <div class="w-full md:pl-12">
              <p class=" text-gray-600 mb-6 text-3xl font-bold text-center">
                Our Mission
              </p>
              <p class="text-lg text-gray-600 mb-6">
                Our mission is to revolutionize healthcare management by creating a holistic, reliable, and
                user-friendly digital ecosystem for hospitals, clinics, and healthcare providers. We aim to eliminate
                the inefficiencies of traditional record-keeping and administration by providing tools that seamlessly
                integrate patient registration, staff management, hospital operations, and pharmacy systems.
                <br/><br/>
                Through flexible subscription options—monthly, yearly, or semi-annual—we ensure that institutions of all
                sizes can access cutting-edge healthcare technology without compromising on affordability. By
                prioritizing security, efficiency, and transparency, we empower healthcare professionals to focus on
                what matters most—delivering exceptional patient care—while we handle the complexities of digital
                management.
              </p>
              <p class=" text-gray-600 mb-6 text-3xl font-bold text-center">
                Our Vision
              </p>
              <p class="text-lg text-gray-600">
                Our vision is to become the global digital backbone of modern healthcare, where hospitals, doctors,
                staff, and patients are seamlessly connected through technology that inspires trust and drives
                innovation. We envision a future where healthcare providers no longer struggle with administrative
                burdens, but instead leverage intelligent systems to anticipate patient needs, enhance collaboration,
                and improve outcomes.
                <br/><br/>
                By bridging the gap between technology and healthcare delivery, we aspire to set a new standard for
                medical management—one that is accessible, scalable, and future-ready. Ultimately, our goal is to create
                a world where healthcare is not only more efficient, but also more human-centered, compassionate, and
                universally connected.
              </p>


              <div class="space-y-12 p-15">
                <h2 class="text-3xl font-semibold text-center mb-6">Our Features</h2>
                <!-- Patient Management -->
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
                    <h3 class="text-xl font-semibold">Patient Management</h3>
                    <p class="mt-2 text-gray-600">Streamline patient records, medical history, and appointments within a
                      centralized system.</p>
                  </div>
                </div>

                <!-- Staff Accounts -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 0 014 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Staff Accounts</h3>
                    <p class="mt-2 text-gray-600">Enhance doctors, nurses, pharmacists, and accountants' roles with
                      personalized access.</p>
                  </div>
                </div>

                <!-- Pharmacy Management -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8c-1.657 0-3 .843-3 2s1.343 2 3 2 3 .843 3 2-1.343 2-3 2m0-8V4m0 4v8"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Pharmacy Management</h3>
                    <p class="mt-2 text-gray-600">Manage prescriptions, drug inventory, and categories efficiently.</p>
                  </div>
                </div>

                <!-- Appointment Scheduling -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3M5 11h14M5 19h14M5 11a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H5z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Appointment Scheduling</h3>
                    <p class="mt-2 text-gray-600">Simplify patient appointment bookings, enhancing wait times and
                      hospital flow.</p>
                  </div>
                </div>
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