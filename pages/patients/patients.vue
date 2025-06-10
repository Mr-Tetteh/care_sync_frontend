<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {usePatients} from "~/composables /usePatients";
import {useAuth} from "~/composables /UseAuth"; // Fixed path (removed space)

const {getPatients} = usePatients()
const {userById, input, updateUser, user} = useAuth()
const searchQuery = ref('')

const {data: details} = await useAsyncData('details', async () => {
  const res = await getPatients();
  return res.value || []
});

const edit = async (id) => {
  try {
    const userData = await userById(id);
    input.value = userData;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

const onUpdate = async (id) => {
  await updateUser(id);
}

// Fixed the search functionality
const filteredPatients = computed(() => {
  if (!searchQuery.value || !details.value) return details.value;

  return details.value.filter(patient => {
    const searchTerm = searchQuery.value.toLowerCase();
    const fullName = `${patient.first_name || ''} ${patient.other_names || ''} ${patient.last_name || ''}`.toLowerCase();
    const email = (patient.email || '').toLowerCase();
    const phone = (patient.phone || '').toLowerCase();

    return fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phone.includes(searchTerm);
  });
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-full">
      <!-- Sticky Header -->
      <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div class="flex items-center gap-4">
            <SidebarTrigger class="p-2 hover:bg-slate-100 rounded-lg transition-colors"/>
            <div class="hidden sm:block">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Patient Management
              </h1>
              <p class="text-slate-600 text-sm">Manage patient records and information</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto p-6">
        <slot/>

        <!-- Main Content Card -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          <!-- Header Section -->
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-2 h-8 bg-white/30 rounded-full"></div>
                <div>
                  <h2 class="text-2xl font-bold text-white">Patients List</h2>
                  <p class="text-blue-100 text-sm">{{ filteredPatients?.length || 0 }} patients found</p>
                </div>
              </div>

              <!-- Register Patient Button -->
              <RouterLink
                  class="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 transform hover:scale-105"
                  to="/patient_register"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                Register Patient
              </RouterLink>
            </div>
          </div>

          <!-- Search Section -->
          <div class="p-6 border-b border-slate-100">
            <div class="relative max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                  v-model="searchQuery"
                  type="text"
                  class="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search by name, email, or phone..."
              >
            </div>
          </div>

          <!-- Table Section -->
          <div class="overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gender</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date of Birth</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                <tr v-for="item in filteredPatients" :key="item.id" class="hover:bg-slate-50 transition-colors duration-200">
                  <!-- Fixed the patient name display -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                          {{ (item.first_name?.charAt(0) || '') + (item.last_name?.charAt(0) || '') }}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-slate-900">
                          {{ item.first_name }} {{ item.other_names }} {{ item.last_name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-900">{{ item.phone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-900">{{ item.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="item.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'">
                        {{ item.gender }}
                      </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {{ new Date(item.date_of_birth).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex gap-2">
                      <NuxtLink
                          :to="`/patients/patents_record/${item.id}`"
                          class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                        </svg>
                        Create
                      </NuxtLink>

                      <NuxtLink
                          :to="`/patients/past_record/${item.id}`"
                          class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/>
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

          <!-- Empty State -->
          <div v-if="!filteredPatients?.length" class="text-center py-16">
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
    </main>
  </SidebarProvider>
</template>

<style scoped>
/* Custom scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>