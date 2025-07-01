<script setup lang="ts">

import AppSidebar from "~/components/AppSidebar.vue";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {useAccount} from "~/composables /useAccount";
import {useAuth} from "~/composables /UseAuth";

const {get_user_details, input} = useAccount();
const {changePassword,password } = useAuth()
const params = useRoute().params.id;

onMounted(async () => {
  await get_user_details(params);
});

const onSubmit = async () => {
  alert('well')
}

const changePass = async () => {
  await changePassword()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="bg-gradient-to-br from-gray-50 to-gray-100 w-full min-h-screen">
      <SidebarTrigger/>

      <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p class="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <!-- Main Card -->
          <div class="bg-white rounded-2xl shadow-xl  border border-gray-100">
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-white mb-2">Your Profile</h2>
                  <p class="text-blue-100">Keep your information up to date</p>
                </div>
                <div class="hidden sm:block">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Section -->
            <div class="p-8">
              <form class="space-y-8" @submit.prevent="onSubmit">
                <!-- Personal Information Section -->
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    Personal Information
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- First Name -->
                    <div class="group">
                      <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.first_name"
                            type="text"
                            id="firstName"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                            placeholder="Enter your first name"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Last Name -->
                    <div class="group">
                      <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.last_name"
                            type="text"
                            id="lastName"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                            placeholder="Enter your last name"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Other Names -->
                    <div class="group">
                      <label for="otherNames" class="block text-sm font-semibold text-gray-700 mb-2">
                        Other Names
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.other_names"
                            type="text"
                            id="otherNames"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                            placeholder="Enter other names"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contact Information Section -->
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    Contact Information
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Email -->
                    <div class="group">
                      <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.email"
                            type="email"
                            id="email"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                            placeholder="Enter your email address"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Phone Number -->
                    <div class="group">
                      <label for="phoneNumber" class="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.phone"
                            type="tel"
                            id="phoneNumber"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                            placeholder="Enter your phone number"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Personal Details Section -->
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6m-6 0l-.5 9A2 2 0 009.5 18h5a2 2 0 002-1.5L16.5 7M9 7v4a3 3 0 006 0V7"></path>
                      </svg>
                    </div>
                    Personal Details
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Date of Birth -->
                    <div class="group">
                      <label for="dateOfBirth" class="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div class="relative">
                        <input
                            v-model="input.date_of_birth"
                            type="date"
                            id="dateOfBirth"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6m-6 0l-.5 9A2 2 0 009.5 18h5a2 2 0 002-1.5L16.5 7M9 7v4a3 3 0 006 0V7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- Gender -->
                    <div class="group">
                      <label for="gender" class="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <div class="relative">
                        <select
                            v-model="input.gender"
                            id="gender"
                            class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400 appearance-none"
                        >
                          <option value="" disabled>Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-6 border-t border-gray-200">
                  <div class="flex flex-col sm:flex-row gap-4 justify-end">
                    <button
                        type="submit"
                        class="px-8 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                    >
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                           viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>


          </div>

          <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
          <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto">
              <!-- Header Card -->
              <div class="text-center mb-8 animate-fade-in">
                <div
                    class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
                <p class="text-gray-600 max-w-md mx-auto">Update your password to keep your account secure. Make sure
                  it's strong and unique.</p>
              </div>

              <!-- Main Form Card -->
              <div
                  class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-slide-up min-h-screen">
                <!-- Header Section -->
                <div
                    class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 relative overflow-hidden">
                  <div class="absolute inset-0 bg-black/10"></div>
                  <div class="relative z-10">
                    <div class="flex items-center justify-between">
                      <div>
                        <h2 class="text-2xl font-bold text-white mb-2">Security Settings</h2>
                        <p class="text-blue-100">Keep your account protected with a strong password</p>
                      </div>
                      <div class="hidden sm:block">
                        <div
                            class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Decorative elements -->
                  <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"></div>
                </div>

                <!-- Form Section -->
                <div class="p-8 bg-gradient-to-b from-white to-gray-50/50">
                  <form @submit.prevent="changePass" class="space-y-8" id="passwordForm">
                    <!-- Current Password Section -->
                    <div class="space-y-6">
                      <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Current Password</h3>
                      </div>

                      <div class="relative group">
                        <label for="currentPassword" class="block text-sm font-semibold text-gray-700 mb-3">
                          Enter Current Password
                        </label>
                        <div class="relative">
                          <input
                              v-model="password.oldPassword"
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              class="block w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-300 bg-white hover:border-gray-300 group-hover:shadow-lg"
                              placeholder="Enter your current password"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- New Password Section -->
                    <div class="space-y-6">
                      <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">New Password</h3>
                      </div>

                      <div class="relative group">
                        <label for="newPassword" class="block text-sm font-semibold text-gray-700 mb-3">
                          Create New Password
                        </label>
                        <div class="relative">
                          <input
                              v-model="password.newPassword"
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              class="block w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-300 bg-white hover:border-gray-300 group-hover:shadow-lg"
                              placeholder="Enter your new password"
                          />

                        </div>
                      </div>
                    </div>

                    <!-- Confirm Password Section -->
                    <div class="space-y-6">
                      <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Confirm Password</h3>
                      </div>

                      <div class="relative group">
                        <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-3">
                          Confirm New Password
                        </label>
                        <div class="relative">
                          <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              class="block w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-300 bg-white hover:border-gray-300 group-hover:shadow-lg"
                              placeholder="Confirm your new password"
                              v-model="password.confirmNewPassword"

                          />
                        </div>
                        <div id="matchIndicator" class="mt-2 text-sm hidden">
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Passwords match</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Security Tips -->
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-semibold text-gray-900 mb-2">Password Security Tips</h4>
                          <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Use at least 8 characters with mixed case letters</li>
                            <li>• Include numbers and special characters</li>
                            <li>• Avoid using personal information</li>
                            <li>• Don't reuse passwords from other accounts</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t border-gray-200">
                      <div class="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="submit"
                            id="submitBtn"
                            class="px-8 py-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] transform hover:scale-105"
                        >
                          <span id="submitText">Update Password</span>
                          <svg id="loadingSpinner" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" fill="none"
                               viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
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

