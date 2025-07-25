<script setup lang="ts">

import AppSidebar from "~/components/AppSidebar.vue";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {useAppointments} from "~/composables/useAppointments";
import {useAsyncData} from "#app";
import {definePageMeta} from "#imports";

const {readAppointment, input, editAppointment, updateAppointment} = useAppointments()

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
  role: ['Receptionist', 'Administrator'],
})

const {data: details} = await useAsyncData('details', async () => {
  const res = await readAppointment();
  return res.value
});

const edit = async (id) => {
  await editAppointment(id);
};

const onUpdate = async (id) => {
  await updateAppointment(id);
  // Optionally, you can reset the input or close the dialog after updating
};

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full h-screen bg-gray-100">
      <SidebarTrigger/>
      <div class="min-h-screen bg-gray-50 w-full">
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

                        <div class="flex items-center space-x-3">
                          <Dialog>
                            <DialogTrigger @click="edit(item.id)" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-amber-500
                                           hover:bg-amber-600 rounded-md shadow-sm transition-all duration-200
                                           ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
                                           focus:ring-amber-500 focus:ring-offset-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                              </svg>
                              Set
                               Appointment Status
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Request</DialogTitle>
                                <DialogDescription>
                                  <div class="p-6" >
                                    <form class="space-y-6" @submit.prevent="onUpdate(item.id)">
                                      <div>
                                        <label for="fullName" class="block text-sm font-medium text-gray-700">Full
                                          Name</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              type="text"
                                              id="fullName"
                                              v-model="input.full_name"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                              placeholder="Enter your full name"
                                              disabled
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
                                              disabled
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
                                              disabled
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
                                              disabled
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
                                    disabled
                                ></textarea>

                                        </div>
                                      </div>

                                      <div>
                                        <label for="appointmentTime" class="block text-sm font-medium text-gray-700">
                                          Status</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <select v-model="input.status"
                                                  class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                          >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approve</option>
                                            <option value="declined">Decline</option>
                                          </select>

                                        </div>
                                      </div>

                                      <div class="pt-2">
                                        <button
                                            type="submit"
                                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                        >
                                          Update Appointment
                                        </button>
                                      </div>
                                    </form>

                                  </div>

                                </DialogDescription>
                              </DialogHeader>

                            </DialogContent>
                          </Dialog>
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