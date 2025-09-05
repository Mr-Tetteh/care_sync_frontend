<script setup lang="ts">
import {
  Calendar, ChartAreaIcon, ChartPieIcon, ClapperboardIcon, Home, Inbox, Search, Settings, User2,
  ChevronUp, ChevronDown
} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import {DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "reka-ui"
import {useAuth} from "~/composables/UseAuth";

const {user, logout} = useAuth()

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartPieIcon,
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <!-- Home Link -->
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                  </svg>
                  <span>Home</span>
                </RouterLink>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>

                <RouterLink to="/about">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                       stroke="currentColor" class="size-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>About</span>
                </RouterLink>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <RouterLink to="/ourService">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span>Our Services</span>
                </RouterLink>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <RouterLink to="/contact">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                  <span>Contact</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <!-- Dynamic Menu Items -->
            <SidebarMenuItem v-if="user" v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink :to="item.url">
                  <component :is="item.icon"/>
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem v-if="user &&(user.role === 'Administrator' || user.role === 'Receptionist')">
              <SidebarMenuButton asChild>
                <RouterLink to="/patients/appointments">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0
                     448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0
                     0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64
                      464c-8.8 0-16-7.2-16-16l0-256z"/>
                  </svg>
                  <span>Appointments</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <!-- Staff Dropdown -->
            <SidebarMenuItem v-if="user">
              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                    </svg>
                    <span>Staff</span>
                    <ChevronDown class="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    side="left"
                    align="start">
                  <DropdownMenuItem v-if="user.role === 'Administrator'" asChild>
                    <RouterLink to="/auth/register" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Register Staff
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/staff/staff" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Registered Staff
                    </RouterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            </SidebarMenuItem>

            <!-- Patients Dropdown -->
            <SidebarMenuItem v-if="user">
              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                    </svg>
                    <span>Patients</span>
                    <ChevronDown class="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    side="right"
                    align="start">
                  <DropdownMenuItem v-if="user.role === 'Receptionist'" asChild>
                    <RouterLink to="/patients/patient_register"
                                class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Register Patient
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/patients/patients" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      All Patients
                    </RouterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            </SidebarMenuItem>

            <!-- Pharmacy Dropdown -->
            <SidebarMenuItem v-if="user && (user.role === 'Pharmacist' || user.role === 'Administrator')">
              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="size-6">
                      <path
                          d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112-96 0 0-112zM0 144L0 368c0 61.9 50.1 112
                           112 112s112-50.1 112-112l0-178.4c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3
                           156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3
                           50.8-47.3 83l0-24.2c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3
                           11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4
                           1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z"/>
                    </svg>
                    <span>Pharmacy</span>
                    <ChevronDown class="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    side="right"
                    align="start">
                  <DropdownMenuItem asChild>
                    <RouterLink to="/pharmacy/upload_drug" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Upload Drug
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/pharmacy/uploaded_drugs"
                                class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Uploaded Drugs
                    </RouterLink>

                    <RouterLink to="/pharmacy/update_drugs"
                                class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Update Drugs
                    </RouterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            </SidebarMenuItem>


            <SidebarMenuItem v-if="user">
              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                    </svg>
                    <span>Payments</span>
                    <ChevronDown class="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    side="left"
                    align="start">
                  <DropdownMenuItem v-if="user.role === 'Accountant'" asChild>
                    <RouterLink to="/payments/payment"
                                class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Make Payments
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/hospital/Lab_fees" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      All Payments
                    </RouterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            </SidebarMenuItem>

            <SidebarMenuItem v-if="user && user.role === 'Administrator'">
              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                    </svg>
                    <span>Hospital Management</span>
                    <ChevronDown class="ml-auto"/>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    side="left"
                    align="start">
                  <DropdownMenuItem v-if="user.role === 'Administrator'" asChild>
                    <RouterLink to="/hospital/Service_fees"
                                class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Service Fees Management
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/hospital/Lab_fees" class="flex items-center py-2 px-4 hover:bg-gray-100 w-full">
                      Labs Management
                    </RouterLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>
            </SidebarMenuItem>

            <!-- Login Link (when not logged in) -->
            <SidebarMenuItem v-if="!user">
              <SidebarMenuButton asChild>
                <RouterLink to="/auth/login">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
                  </svg>
                  <span>Login</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- User Profile Footer -->
    <SidebarFooter class="border-t" v-if="user">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenuRoot>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton class="flex items-center w-full py-3 px-3">
                <User2 class="h-5 w-5 mr-3"/>
                <span class="flex-1">{{ user.first_name }}</span>
                <ChevronUp class="h-4 w-4 ml-auto"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                align="start"
                class="w-[--reka-popper-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <DropdownMenuItem asChild>
                <RouterLink :to="`/profile/${user.id}`" class="flex items-center py-2 px-3 hover:bg-gray-100 w-full">
                  <Settings class="h-4 w-4 mr-2"/>
                  <span>Account</span>
                </RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer">
                <span @click="logout" class="w-full">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>