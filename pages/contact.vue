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
            <img src="../public/images/Service 24_7-bro.svg" alt="Healthcare professionals"
                 class="rounded-lg shadow-xl w-full max-w-lg mx-auto justify-center p-6 h-100"/>
          </div>
          <div class="flex flex-col md:flex-row items-start md:space-x-12 mt-8 text-center">
            <!-- Contact Info -->
            <div class="flex-1 space-y-6">
              <h3 class="text-2xl font-semibold text-gray-800 text-center">Get in Touch</h3>
              <p class="text-gray-600 leading-relaxed">
                Have questions, need support, or want to learn more about CareSync?
                We’d love to hear from you. <br> Our team is ready to help hospitals streamline operations
                and improve patient care.
              </p>

              <div class="space-y-4 ">
                <!-- Phone -->
                <div class="flex items-center">
                  <div class="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <p class="text-gray-700">
                    <span class="font-semibold">Phone:</span> <a href="tel:0554271157‬">0554271157‬</a>
                  </p>
                </div>

                <!-- Email -->
                <div class="flex ">
                  <div class="w-10 h-10 flex  justify-center bg-green-100 text-green-600 rounded-full mr-4">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <p class="text-gray-700">
                    <span class="font-semibold">Email:</span> <a href="mailto:derrickowusu144@gmail.com" class="text-blue-600">Email</a>
                  </p>
                </div>

                <!-- Location -->
                <div class="flex items-center">
                  <div class="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <p class="text-gray-700">
                    <span class="font-semibold">Address:</span> Accra, Ghana
                  </p>
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