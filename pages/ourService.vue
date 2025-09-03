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
      <div>
        <section id="service" class="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div class="container mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Our Services
              </h2>
              <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
            </div>

            <section id="departments" class="py-16">
              <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                  <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Our Clinical Departments</h2>
                  <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    We provide world-class, patient-centered healthcare across a wide range of specialties.
                    Our clinical departments are designed to meet the unique needs of patients through cutting-edge
                    technology, expert professionals, and compassionate care.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  <!-- Emergency Medicine -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-red-100 hover:border-red-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-red-500 to-pink-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-red-600">Emergency Medicine</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Round-the-clock emergency care with a dedicated team of specialists, ensuring immediate response
                      to life-threatening situations with state-of-the-art equipment.
                    </p>
                  </div>

                  <!-- Cardiology -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-pink-100 hover:border-pink-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-pink-500 to-rose-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-pink-600">Cardiology</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Advanced heart care services including ECG, echocardiography, Holter monitoring, and
                      interventional
                      cardiology with minimally invasive procedures.
                    </p>
                  </div>

                  <!-- Internal Medicine -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-blue-100 hover:border-blue-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-blue-500 to-indigo-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-blue-600">Internal Medicine</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Comprehensive diagnosis and treatment for chronic conditions, infections, and multisystem
                      disorders
                      with personalized care plans.
                    </p>
                  </div>

                  <!-- Obstetrics & Gynecology -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-purple-100 hover:border-purple-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-purple-500 to-violet-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-purple-600">Obstetrics & Gynaecology</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Specialized maternal and women's health services, from comprehensive antenatal care to advanced
                      surgical gynecology procedures.
                    </p>
                  </div>

                  <!-- Paediatrics -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-green-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-green-500 to-emerald-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-green-600">Paediatrics</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Quality care for children of all ages, covering preventive health, acute conditions, and
                      developmental monitoring in a child-friendly environment.
                    </p>
                  </div>

                  <!-- Dermatology -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-orange-100 hover:border-orange-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-orange-500 to-yellow-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-orange-600">Dermatology</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Diagnosis and treatment of skin, hair, and nail conditions with advanced medical and cosmetic
                      options
                      using cutting-edge technology.
                    </p>
                  </div>

                  <!-- Surgery -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-teal-100 hover:border-teal-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-teal-500 to-cyan-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-teal-600">General & Specialized Surgery</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Safe and modern surgical procedures including neurosurgery, orthopedics, and minimally invasive
                      techniques with robotic assistance.
                    </p>
                  </div>

                  <!-- Oncology -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-indigo-100 hover:border-indigo-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-indigo-500 to-purple-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-indigo-600">Oncology</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Comprehensive cancer care with chemotherapy, radiation, surgical oncology, and supportive
                      treatment
                      plans with multidisciplinary approach.
                    </p>
                  </div>

                  <!-- Laboratory -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-cyan-100 hover:border-cyan-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-cyan-500 to-blue-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m-.75-.082a24.301 24.301 0 00-4.5 0m4.5 0a24.301 24.301 0 014.5 0M19 14.5l-4.091-4.091a2.25 2.25 0 00-1.591-.659H8.604"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-cyan-600">Laboratory & Diagnostics</h3>
                    <p class="text-gray-600 leading-relaxed">
                      State-of-the-art laboratory testing and imaging services including CT, MRI, ultrasound, and X-ray
                      with rapid results delivery.
                    </p>
                  </div>

                  <!-- Endoscopy -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-emerald-100 hover:border-emerald-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-emerald-500 to-teal-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-emerald-600">Endoscopy</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Advanced diagnostic and therapeutic procedures for gastrointestinal and respiratory systems
                      with minimally invasive techniques.
                    </p>
                  </div>

                  <!-- Family Medicine -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-rose-100 hover:border-rose-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-rose-500 to-pink-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-rose-600">Family Medicine</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Comprehensive, continuous care for patients of all ages—focused on prevention and holistic
                      treatment
                      with personalized healthcare plans.
                    </p>
                  </div>

                  <!-- Palliative Care -->
                  <div
                      class="service-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-violet-100 hover:border-violet-200">
                    <div
                        class="icon-container w-16 h-16 rounded-xl mb-6 flex items-center justify-center from-violet-500 to-purple-500 floating-icon">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-violet-600">Palliative & Pain Management</h3>
                    <p class="text-gray-600 leading-relaxed">
                      Compassionate end-of-life and chronic illness care, prioritizing comfort, dignity, and quality of
                      life
                      with comprehensive support services.
                    </p>
                  </div>

                </div>
              </div>
            </section>

          </div>
        </section>
      </div>
    </div>
  </SidebarProvider>
</template>

<style scoped>
.service-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.service-card:hover {
  transform: translateY(-8px);
}
.icon-container {
  background: linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to));
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.floating-icon {
  animation: float 3s ease-in-out infinite;
}
</style>