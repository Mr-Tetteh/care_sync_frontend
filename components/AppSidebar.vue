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
  {
    title: "Staff",
    url: "/staff/staff",
    icon: User2,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
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

            <SidebarHeader >
              <SidebarMenu>
                <SidebarMenuItem>
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
                        <button class="py-2 px-4">All Patients.</button>
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