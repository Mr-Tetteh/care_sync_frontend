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
} from "@/components/ui/sidebar"

import {DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "reka-ui"
import {useAuth} from "~/composables /UseAuth";


const {user, logout} = useAuth()
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    title: "Appointments",
    url: "/patients/appointments",
    icon: Inbox,
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
            </SidebarMenuItem>
            <SidebarMenuItem v-if="user" v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon"/>
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenuRoot v-if="user">
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                        </svg>
                        Staff
                        <ChevronDown class="ml-auto"/>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1 space-y-2">
                      <DropdownMenuItem class="hover:bg-gray-200 ">
                        <RouterLink to="/staff/staff" class="py-2 px-4">Registered Staff</RouterLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem class="hover:bg-gray-200 ">
                        <RouterLink to="/auth/register" class="py-2 px-4">Register Staff</RouterLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuRoot>

                  <DropdownMenuRoot v-if="user">
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                        </svg>
                        Patients
                        <ChevronDown class="ml-auto"/>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <DropdownMenuItem class="hover:bg-gray-200">
                        <RouterLink to="/patients/patients" class="py-2 px-4">All Patients</RouterLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem class="hover:bg-gray-200">
                        <RouterLink to="/patients/patient_register" class="py-2 px-4">Register Patient</RouterLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuRoot>

                  <DropdownMenuRoot v-if="user">
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path
                              d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112-96 0 0-112zM0 144L0 368c0 61.9 50.1 112
                               112 112s112-50.1 112-112l0-178.4c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3
                               156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3
                               50.8-47.3 83l0-24.2c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3
                               11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4
                               1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z"/>
                        </svg>
                        Pharmacy
                        <ChevronDown class="ml-auto"/>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        class="w-[--bits-dropdown-menu-anchor-width] bg-white rounded-lg shadow-lg border border-gray-200 py-1 space-y-2">
                      <DropdownMenuItem class="hover:bg-gray-200 ">
                        <RouterLink to="/pharmacy/upload_drug" class="py-2 px-4">Upload Drug</RouterLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem class="hover:bg-gray-200 ">
                        <RouterLink to="/auth/register" class="py-2 px-4">Register Staff</RouterLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuRoot>


                  <SidebarMenuItem v-if="!user">
                    <SidebarMenuButton asChild>
                      <RouterLink to="/auth/login">
                        <component Settings/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
                        </svg>
                        <span>Login</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

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

            <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
              <DropdownMenuItem class="flex items-center py-2 px-3">
                <Settings class="h-4 w-4 mr-2"/>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center py-2 px-3">
                <span @click="logout">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>