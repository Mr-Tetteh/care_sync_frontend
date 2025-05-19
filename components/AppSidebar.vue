<script setup lang="ts">
import {Calendar, ChartAreaIcon, ChartPieIcon, ClapperboardIcon, Home, Inbox, Search, Settings,   User2,
  ChevronUp} from "lucide-vue-next"
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
import {useAuth} from "~/composables /UseAuth";
import {DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "reka-ui"


const {logout} = useAuth()
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
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
    title: "Calendar",
    url: "#",
    icon: Calendar,
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


  {
    title: "login",
    url: "/Auth/login",
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
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{item.title}}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <DropdownMenuRoot>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span>Dropdown</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem>
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuRoot>


          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="border-t">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenuRoot>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton class="flex items-center w-full py-3 px-3">
                <User2 class="h-5 w-5 mr-3"/>
                <span class="flex-1">{{ user?.firstName }}</span>
                <ChevronUp class="h-4 w-4 ml-auto"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
              <DropdownMenuItem class="flex items-center py-2 px-3">
                <Settings class="h-4 w-4 mr-2"/>
                <span>Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem class="flex items-center py-2 px-3" @click="logout">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </SidebarMenuItem>






      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>