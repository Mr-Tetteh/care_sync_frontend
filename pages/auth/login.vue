<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import LoginForm from "~/components/LoginForm.vue";
</script>
<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
   <P class="text-4xl"> CARE SYNC LOGIN  </P>

    <div class="w-full max-w-sm md:max-w-7xl">
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>

</style>