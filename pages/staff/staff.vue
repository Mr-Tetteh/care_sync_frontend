<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useStaff} from "~/composables /useStaff";
import {useAuth} from "~/composables /UseAuth";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
})
const {getStaff, deleteUser} = useStaff()
const {input, userById, updateUser, user} = useAuth()
const searchQuery = ref('')


const {data: staff} = await useAsyncData('staff', async () => {
  const res = await getStaff();
  return res.value || []
});

const edit = async (id) => {
  try {
    const StaffData = await userById(id);
    input.value = StaffData
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

const onUpdate = async (id) => {
  await updateUser(id);
}


const filteredStaff = computed(() => {
  if (!searchQuery.value || !staff.value) return staff.value

  return staff.value.filter(staffMember => {
    const searched = searchQuery.value.toLowerCase();
    const fullName = `${staffMember.first_name || ''} ${staffMember.other_names || ''} ${staffMember.last_name || ''}`.toLowerCase()
    const email = (staffMember.email || '').toLowerCase()
    // Make sure to use consistent property name - either phone or phone_number
    const phone = (staffMember.phone || staffMember.phone_number || '').toLowerCase()

    return fullName.includes(searched) ||
        email.includes(searched) ||
        phone.includes(searched);
  });
});

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="bg-gray-100 w-full">
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
                          v-model="searchQuery"
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
                      <th class="py-3 px-4 text-left" v-if="user.role == 'Manager'">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in filteredStaff" :key="item.id" class="border-t hover:bg-gray-50">
                      <td class="py-4 px-4">{{ item.first_name }} {{ item.other_names }} {{ item.last_name }}</td>
                      <td class="py-4 px-4">{{ item.phone }}</td>
                      <td class="py-4 px-4">{{ item.email }}</td>
                      <td class="py-4 px-4">{{ item.role }}</td>
                      <td class="py-4 px-4">{{ item.gender }}</td>
                      <td class="py-4 px-4">{{ item.date_of_birth }}</td>
                      <td class="py-4 px-4">
                        <div class="flex items-center space-x-3">

                          <Dialog>
                            <DialogTrigger class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-amber-500
                              hover:bg-amber-600 rounded-md shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                           v-if="user.role == 'Manager'"
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
                                              type="text"
                                              v-model="input.first_name"
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
                                          Update Staff
                                        </button>
                                      </div>
                                    </form>

                                  </div>
                                </DialogDescription>
                              </DialogHeader>

                            </DialogContent>
                          </Dialog>
                          <button v-if="user.role == 'Manager'" @click="deleteUser(item.id)"
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
                <div v-if="!filteredStaff?.length" class="text-center py-16">
                  <div class="max-w-md mx-auto">
                    <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <h3 class="text-lg font-semibold text-slate-700 mb-2">
                      {{ searchQuery ? 'No patients found' : 'No patients registered' }}
                    </h3>
                    <p class="text-slate-500 text-sm">
                      {{ searchQuery ? 'Try adjusting your search criteria.' : 'Get started by registering your first patient.' }}
                    </p>
                    <div v-if="searchQuery" class="mt-4">
                      <button
                          @click="searchQuery = ''"
                          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
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