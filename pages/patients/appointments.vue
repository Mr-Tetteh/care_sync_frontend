<script setup lang="ts">

import AppSidebar from "~/components/AppSidebar.vue";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {useAppointments} from "~/composables /useAppointments";

const {readAppointment} = useAppointments()


const {data: details} = await useAsyncData('details', async () => {
  const res = await readAppointment();
  return res.value
});</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main>
      <SidebarTrigger/>
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
              <div>
                <h3 class="mb-2 text-2xl font-semibold">Appointments List</h3>
              </div>
            </div>
            <!-- Table Card -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="px-6 py-4 border-b">
                <div class="flex justify-between items-center">
                  <div class="w-64">
                    <div
                        class="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400">
                  <span class="bg-white px-3 py-2">
                    <i class="bi bi-search"></i>
                  </span>
                      <input
                          type="text"
                          class="w-full py-2 px-2 outline-none"
                          placeholder="Search staff..."
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="overflow-x-auto">
                  <table class="w-full table-auto">
                    <thead class="bg-gray-100">
                    <tr>
                      <th class="py-3 px-4 text-left">Name</th>
                      <th class="py-3 px-4 text-left">Contact</th>
                      <th class="py-3 px-4 text-left">Appointment Date</th>
                      <th class="py-3 px-4 text-left">Appointment Time</th>
                      <th class="py-3 px-4 text-left">Reason</th>
                      <th class="py-3 px-4 text-left">Status</th>
                      <th class="py-3 px-4 text-left">Approved By</th>
                      <th class="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in details" :key="item.id" class="border-t hover:bg-gray-50">
                      <td class="py-4 px-4">{{ item.full_name }}</td>
                      <td class="py-4 px-4">{{ item.phone_number }}</td>
                      <td class="py-4 px-4">{{ item.appointment_date }}</td>
                      <td class="py-4 px-4">{{ item.appointment_time }}</td>
                      <td class="py-4 px-4">{{ item.reason }}</td>
                      <td class="py-4 px-4">{{ item.status }}</td>
                      <td class="py-4 px-4">Daniel</td>
                      <td class="py-4 px-4">
                        <div class="flex gap-2">
                          <button
                              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition duration-200 transform hover:-translate-y-1"
                              @click="openEditModal(item)">
                            <i class="bi bi-pencil-square mr-1"></i>
                            Edit
                          </button>
                          <button @click="deleteAppointment(item.id)"
                                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200 transform hover:-translate-y-1">
                            <i class="bi bi-trash mr-1"></i>
                            Delete Appointment
                          </button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <slot/>

    </main>

  </SidebarProvider>

</template>

<style scoped>

</style>