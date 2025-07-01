<script setup lang="ts">
import {useAuth} from "~/composables /UseAuth";
import AppSidebar from "~/components/AppSidebar.vue";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {definePageMeta} from "#imports";

const {input, register} = useAuth()


const onsubmit = async () => {
  await register()
}

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
  role: ['admin']
})

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full h-screen bg-gray-100">
      <SidebarTrigger/>
      <div id="app" class="bg-gray-100">
        <div class="flex min-h-screen items-center justify-center p-6 md:p-10">
          <div class="flex flex-col md:flex-row w-full max-w-4xl gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- Form Section -->
            <div class="flex-1 p-6 md:p-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Register Staff </h2>
              <form class="grid grid-cols-1 md:grid-cols-2 gap-5" @submit.prevent="onsubmit">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">FirstName</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-user"></i>
                </span>
                    <input v-model="input.first_name" type="text"
                           class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                           placeholder="Enter your Username"/>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">LastName</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-user"></i>
                </span>
                    <input v-model="input.last_name" type="text"
                           class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                           placeholder="Enter your Username"/>
                  </div>
                </div>


                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Other names</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-user"></i>
                </span>
                    <input v-model="input.other_names" type="text"
                           class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                           placeholder="Enter your Username"/>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-envelope"></i>
                </span>
                    <input v-model="input.email" type="email"
                           class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                           placeholder="Enter your Email"/>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-envelope"></i>
                </span>
                    <select v-model="input.gender" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="">
                      <option selected disabled>Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-envelope"></i>
                </span>
                    <input v-model="input.date_of_birth" type="date" class="block w-full pl-10 pr-3 py-2 border
                border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                  </div>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div class="form-input-focus relative rounded-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i class="fas fa-phone"></i>
                </span>
                    <input v-model="input.phone" type="tel" class="block w-full pl-10 pr-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                           placeholder="0555855353"/>
                  </div>
                </div>

                <!-- Full width elements, span both columns -->

                <div class="col-span-full mt-2">
                  <button
                      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                   focus:ring-indigo-500 transition duration-150">
                    Create Account
                  </button>
                </div>

              </form>
            </div>

            <!-- Right panel with image -->
            <div class="hidden md:block flex-1 bg-indigo-100">
              <div class="relative h-full rounded-r-lg overflow-hidden flex items-center justify-center p-6">
                <NuxtImg src="../public/images/Doctors-cuate.svg" alt="Sign up illustration"
                         class="max-w-full max-h-full object-contain"/>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 class="text-xl font-bold text-indigo-800">Join our community</h3>
                  <p class="text-indigo-600 mt-2">Create an account to get started today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
  >
</template>

<style>
.form-input-focus:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-input-focus:hover {
  border-color: #4f46e5;
}

.line-with-text {
  position: relative;
  text-align: center;
}

.line-with-text::before,
.line-with-text::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 50px);
  height: 1px;
  background-color: #e5e7eb;
}

.line-with-text::before {
  left: 0;
}

.line-with-text::after {
  right: 0;
}
</style>



