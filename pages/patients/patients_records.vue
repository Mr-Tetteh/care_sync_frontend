<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import Editor from '@tinymce/tinymce-vue';
import {usePatients} from "~/composables/usePatients";
import {definePageMeta} from "#imports";

const {input, patient_record} =  usePatients()

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <div class="min-h-screen bg-gray-100">
        <div id="main">
          <header class="mb-4">
            <a href="#" class="block xl:hidden">
              <i class="text-2xl bi bi-justify"></i>
            </a>
          </header>

          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-semibold">Appointments Record</h3>
            </div>

            <form class="flex flex-col items-center gap-8 mb-6">
              <!-- Nurse Session -->
              <div class="w-full max-w-4xl">
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
              <div class="w-full max-w-4xl">
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
              <div class="w-full max-w-4xl">
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

              <!-- Submit Button -->
              <div>
                <button
                    type="submit"
                    class="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-lg"
                >
                  Submit
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
/* Optional: remove if using Tailwind's utility classes correctly */
</style>
