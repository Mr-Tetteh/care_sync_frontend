<script setup lang="ts">
import {useHospitalManagement} from "~/composables/useHospitalManagement";
import {useAsyncData} from "#app";

const {lab, fetchLabs, PostLab, deleteLabManagement, EditLab, isEdit, updateLabs} = useHospitalManagement()

const {data: labs} = useAsyncData('labs', async () => {
  const res = await fetchLabs()
  return res
})


const handleSubmit = () => {
  PostLab()
}
const updateLab = async (labId: number) => {
  try {
    await updateLabs(labId);
  } catch (error: any) {
    console.error('Error updating lab:', error);
  }
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full">
      <SidebarTrigger/>
      <div class="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
        <div id="main">
          <header class="mb-6 p-4">
            <a href="#" class="block xl:hidden">
              <i class="text-2xl bi bi-justify text-emerald-700"></i>
            </a>
          </header>

          <!-- Side by side container -->
          <div class="grid lg:grid-cols-2 gap-8 px-4 w-full">

            <!-- Form Section -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h1 class="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
            <span class="bg-emerald-100 p-2 rounded-lg mr-3">
              <i class="bi bi-plus-circle text-emerald-600"></i>
            </span>
                Lab Management
              </h1>
              <form @submit.prevent="isEdit ? updateLab(lab.id) : handleSubmit()" class="space-y-4">
                <div class="mb-4">
                  <label for="labName" class="block text-emerald-700 text-sm font-bold mb-2">Name of Lab Test:</label>
                  <input type="text" id="labName" name="labName"
                         class="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
                         v-model="lab.name"
                         placeholder="Enter lab name">
                </div>
                <div class="mb-6">
                  <label for="fee" class="block text-emerald-700 text-sm font-bold mb-2">Lab Fee:</label>
                  <input type="number" id="fee" name="fee"
                         class="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
                         v-model="lab.price"
                         placeholder="Enter fee amount">
                </div>
                <div class="mb-6">
                  <label for="nhis" class="block text-emerald-700 text-sm font-bold mb-2">NHIS Cover:</label>
                  <select id="nhis" name="nhis"
                          class="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
                          v-model="lab.NHIS">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                </div>
                <div class="flex items-center justify-between">
                  <button type="submit"
                          class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    {{ isEdit ? 'Update Lab' : 'Save Lab' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Table Section -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h1 class="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-between">
            <span class="flex items-center">
              <span class="bg-indigo-100 p-2 rounded-lg mr-3">
                <i class="bi bi-table text-indigo-600"></i>
              </span>
              Lab List
            </span>
                <span class="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              <!-- {{ labs.length? labs.length : 0 }} labs -->
            </span>
              </h1>

              <div class="overflow-x-auto rounded-lg border border-emerald-200">
                <table class="w-full ">
                  <thead class="bg-emerald-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                      Name Of Lab
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                      Lab Fee
                    </th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                      NHIS Cover
                    </th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-emerald-100">
                  <tr v-for="lab in labs" :key="lab.id" class="hover:bg-emerald-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div
                            class="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {{ lab.name.charAt(0).toUpperCase() }}
                        </div>
                        <span class="font-medium text-emerald-900">{{ lab.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-emerald-900 font-semibold">GHC {{ lab.price }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-emerald-900 font-semibold bg-emerald-100 px-2 py-1 rounded-full"
                            v-if="lab.NHIS === true"> Yes</span>
                      <span class="text-emerald-900 font-semibold bg-red-100 px-2 py-1 rounded-full" v-else> No</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="flex justify-center space-x-2">
                        <Button variant="outline" @click="EditLab(lab.id)"
                                class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                          Edit
                        </Button>
                        <Button
                            @click="deleteLabManagement(lab.id)"
                            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                          Delete
                        </Button>
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
    </main>
  </SidebarProvider>
</template>


<style scoped>

</style>