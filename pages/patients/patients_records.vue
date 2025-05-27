<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main>
      <SidebarTrigger/>
      <div class="min-h-screen  bg-gray-100">
        <div id="main">
          <header class="mb-4">
            <a href="#" class="block xl:hidden">
              <i class="text-2xl bi bi-justify"></i>
            </a>
          </header>
          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="mb-2 text-2xl font-semibold">Appointments List</h3>
              </div>
            </div>
            re



          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>