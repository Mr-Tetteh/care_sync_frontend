<script setup lang="ts">

import AppSidebar from "~/components/AppSidebar.vue";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {useAuth} from "~/composables /UseAuth";

const {user, logout} = useAuth()
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gray-50 w-full">
      <SidebarTrigger/>
      <slot/>
      <div class="w-full">
        <div class="p-6">
          <!-- Header Section -->
          <header class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-2xl font-bold text-gray-800">CareSync Dashboard</h2>
                <p class="text-gray-600">Welcome back, {{user.first_name}} {{user?.other_names}} {{user.last_name}}</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold mr-2">
                    {{user.first_name[0]}}{{user?.other_names[0]}} {{user.last_name[0]}}
                  </div>
                  <span class="font-medium">Daniel</span>
                </div>
                <button class="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors" @click="logout">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </header>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- Care Patients Card -->
            <div class="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-6">
              <div class="flex items-center space-x-4">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total Care Patients</p>
                  <p class="text-2xl font-bold text-blue-500">4</p>
                </div>
              </div>
            </div>

            <!-- Admin Only: All Patients Card -->
            <div v-if="userRole == 'Admin'" class="bg-white rounded-lg shadow-sm border-l-4 border-gray-500 p-6">
              <div class="flex items-center space-x-4">
                <div class="bg-gray-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total Patients</p>
                  <p class="text-2xl font-bold text-gray-500">43</p>
                </div>
              </div>
            </div>

            <!-- Swift Users Card -->
            <div class="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-6">
              <div class="flex items-center space-x-4">
                <div class="bg-green-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total Users on Swift</p>
                  <p class="text-2xl font-bold text-green-500">423</p>
                </div>
              </div>
            </div>

            <!-- Today's Patients Cards -->
            <div class="bg-white rounded-lg shadow-sm border-l-4 border-yellow-500 p-6">
              <div class="flex items-center space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Today's Patients</p>
                  <p class="text-2xl font-bold text-yellow-500">24</p>
                </div>
              </div>
            </div>

            <!-- Pending Bills Card -->
            <div class="bg-white rounded-lg shadow-sm border-l-4 border-red-500 p-6">
              <div class="flex items-center space-x-4">
                <div class="bg-red-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Pending Bills</p>
                  <p class="text-2xl font-bold text-red-500">$12,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>