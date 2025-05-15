<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
      <Toaster position="top-right" richColors />

    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {Toaster} from "vue-sonner";

</script>