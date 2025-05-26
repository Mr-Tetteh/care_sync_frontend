<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useStaff} from "~/composables /useStaff";

const {getStaff} = useStaff()

const {data: staff} = await useAsyncData('staff', async () => {
  const res = await getStaff();
  return res.value || []
});

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gray-50 w-full">
      <SidebarTrigger/>
      <slot/>
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
                <h3 class="mb-2 text-2xl font-semibold">Staff List</h3>
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
                      <th class="py-3 px-4 text-left">Full Name</th>
                      <th class="py-3 px-4 text-left">Contact</th>
                      <th class="py-3 px-4 text-left">Email</th>
                      <th class="py-3 px-4 text-left">Role</th>
                      <th class="py-3 px-4 text-left">Gender</th>
                      <th class="py-3 px-4 text-left">Date of Birth</th>
                      <th class="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in staff" :key="item.id" class="border-t hover:bg-gray-50">
                      <td class="py-4 px-4">{{ item.first_name }} {{ other_names }} {{ item.last_name }}</td>
                      <td class="py-4 px-4">{{ item.phone }}</td>
                      <td class="py-4 px-4">{{ item.email }}</td>
                      <td class="py-4 px-4">{{ item.role }}</td>
                      <td class="py-4 px-4">{{ item.gender }}</td>
                      <td class="py-4 px-4">{{ item.date_of_birth }}</td>
                      <td class="py-4 px-4">
                        <div class="flex items-center space-x-3">
                          <button
                              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-amber-500
                              hover:bg-amber-600 rounded-md shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                              @click="openEditModal(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                            Edit
                          </button>
                          <button @click="deleteAppointment(item.id)"
                                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                            Delete Staff
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
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>