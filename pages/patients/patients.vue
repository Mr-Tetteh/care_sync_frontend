<script setup lang="ts">

import {usePatients} from "~/composables /usePatients";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useAuth} from "~/composables /UseAuth";

const {getPatients} = usePatients()
const {userById, input, updateUser, user} = useAuth()

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

          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="mb-2 text-2xl font-semibold">Patients List</h3>
              </div>
            </div>
            <!-- Table Card -->
            <div class="bg-white rounded-lg shadow-md">
              <div class="px-6 py-4 border-b flex items-center justify-between gap-4">
                <RouterLink
                    class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition text-lg font-semibold"
                    to="patient_register.vue"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  Register Patient
                </RouterLink>
                <form class="flex items-center gap-2 w-full max-w-md">
                  <div
                      class="flex items-center border rounded-md px-2 bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 w-full">
                    <i class="bi bi-search text-gray-400 text-xl"></i>
                    <input
                        type="text"
                        class="w-full py-2 px-2 outline-none bg-transparent"
                        placeholder="Search patients..."
                    >
                  </div>
                  <button type="submit"
                          class="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition flex items-center gap-1">
                    <i class="bi bi-arrow-right-circle"></i>
                    Search
                  </button>
                </form>
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

                          <NuxtLink :to="`/patients/patents_record/${item.id}`"
                                    class="inline-flex items-center px-3 py-1.5
                           text-sm font-medium text-white bg-blue-500
                                           hover:bg-blue-900 rounded-md shadow-sm transition-all duration-200
                                           ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
                                           focus:ring-amber-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                            </svg>

                            Create
                          </NuxtLink>


                          <NuxtLink :to="`/patients/past_record/${item.id}`" class="inline-flex items-center px-3 py-1.5
                           text-sm font-medium text-white bg-emerald-500
                                           hover:bg-emerald-900 rounded-md shadow-sm transition-all duration-200
                                           ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
                                           focus:ring-amber-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/>
                            </svg>
                            Records
                          </NuxtLink>
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