<script setup lang="ts">

import {usePatients} from "~/composables /usePatients";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useAuth} from "~/composables /UseAuth";

const {getPatients} = usePatients()
const {userById, input, updateUser} = useAuth()

const {data: details} = await useAsyncData('details', async () => {
  const res = await getPatients();
  return res.value || []
});

const edit = async (id) => {
  try {
    const userData = await userById(id);
    // Make sure user_input is a reactive ref
    input.value = userData;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

const onUpdate = async (id) => {
  await updateUser(id);
}

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
                <h3 class="mb-2 text-2xl font-semibold">Patients List</h3>
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
                      <th class="py-3 px-4 text-left">Gender</th>
                      <th class="py-3 px-4 text-left">Date of Birth</th>
                      <th class="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in details" :key="item.id" class="border-t hover:bg-gray-50">
                      <td class="py-4 px-4">{{ item.first_name }} {{ other_names }} {{ item.last_name }}</td>
                      <td class="py-4 px-4">{{ item.phone }}</td>
                      <td class="py-4 px-4">{{ item.email }}</td>
                      <td class="py-4 px-4">{{ item.gender }}</td>
                      <td class="py-4 px-4">{{ item.date_of_birth }}</td>
                      <td class="py-4 px-4">
                        <div class="flex gap-2">
                          <Dialog>
                            <DialogTrigger class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-amber-500
                              hover:bg-amber-600 rounded-md shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                           @click="edit(item.id)"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                              </svg>
                              Edit Role
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                  <div class="p-6">
                                    <form class="space-y-6" @submit.prevent="onUpdate(item.id)">
                                      <div>
                                        <label for="fullName" class="block text-sm font-medium text-gray-700">First
                                          Name</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              v-model="input.first_name"
                                              type="text"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                              placeholder="Enter your full name"
                                              disabled
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label for="fullName" class="block text-sm font-medium text-gray-700">Last
                                          Name</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              type="text"
                                              id="fullName"
                                              v-model="input.last_name"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                              placeholder="Enter your full name"
                                              disabled
                                          />
                                        </div>
                                      </div>


                                      <div>
                                        <label for="fullName" class="block text-sm font-medium text-gray-700">Email
                                        </label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              type="text"
                                              id="fullName"
                                              v-model="input.email"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                              placeholder="Enter your full name"
                                              disabled
                                          />
                                        </div>
                                      </div>


                                      <div>
                                        <label for="fullName" class="block text-sm font-medium text-gray-700">Phone
                                        </label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              type="text"
                                              id="fullName"
                                              v-model="input.phone"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                              placeholder="Enter your full name"
                                              disabled
                                          />
                                        </div>
                                      </div>


                                      <div>
                                        <label for="appointmentDate" class="block text-sm font-medium text-gray-700">
                                          Date of birth</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <input
                                              type="date"
                                              id="appointmentDate"
                                              v-model="input.date_of_birth"
                                              class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                              disabled
                                          />
                                        </div>
                                      </div>


                                      <div>
                                        <label for="appointmentTime" class="block text-sm font-medium text-gray-700">
                                          Role</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                          <select v-model="input.role"
                                                  class="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                          >
                                            <option value="Manager">Manager</option>
                                            <option value="Doctor">Doctor</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Lab_Technician">Lab Technician</option>
                                            <option value="Pharmacist">Pharmacist</option>
                                            <option value="Patient">Patient</option>

                                          </select>

                                        </div>
                                      </div>

                                      <div class="pt-2">
                                        <button
                                            type="submit"
                                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                        >
                                          Update User
                                        </button>
                                      </div>
                                    </form>

                                  </div>
                                </DialogDescription>
                              </DialogHeader>

                            </DialogContent>
                          </Dialog>

                          <NuxtLink :to="`/patients/patents_record/${item.id}`"
                                      class="bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition
                                       duration-200 transform hover:-translate-y-1">
                            Create a Document
                          </NuxtLink>


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
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>