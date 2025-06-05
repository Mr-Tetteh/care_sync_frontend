<
<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import Editor from '@tinymce/tinymce-vue';
import {usePatients} from "~/composables /usePatients";
import {toast} from "vue-sonner";
import {ref, onMounted} from 'vue'
import {useAuth} from "~/composables /UseAuth";

const params = useRoute().params
const {authToken, user} = useAuth()
const input = ref({
  nurse_notes: '',
  doctor_notes: '',
  laboratory_notes: '',
  patient: ''
})

onMounted(() => {
  input.value.patient = params.id
})

const patient_record = async () => {
  try {
    const {data, error} = await useFetch(useRuntimeConfig().public.api + '/patients-records', {
      method: 'POST',
      body: input.value,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
      }
    })
    if (error.value) {
      toast(error.value.message || 'An error occurred while creating the patient record')
    } else {
      toast.success('Patient record created successfully')
    }
    setTimeout(() => {
      window.location.href = '/patients/patients'
    }, 1000)
  } catch (error) {
    toast.error(error.message || 'An error occurred while creating the patient record');
  }
}

const onsubmit = () => {
  patient_record()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full">
      <SidebarTrigger/>

      <div class="min-h-screen bg-gray-50">
        <div id="main">
          <header class="mb-4">
            <a href="#" class="block xl:hidden">
              <i class="text-2xl bi bi-justify"></i>
            </a>
          </header>

          <div class="px-4">
            <!-- Header Section -->
            <div class="flex justify-center items-center mb-6 p-5">
              <h3 class="text-2xl font-semibold">Patient Record</h3>
            </div>

            <form class="flex flex-col items-center gap-8 mb-6" @submit.prevent="onsubmit()">
              <!-- Nurse Session -->
              <div class="w-full max-w-4xl">
                <p class="text-center text-2xl mb-4">Nurse Session</p>
                <editor
                    id="nurse-editor"
                    v-model="input.nurse_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>

              <!-- Doctor Session -->
              <div class="w-full max-w-4xl" v-if="user.role =='Doctor'">
                <p class="text-center text-2xl mb-4">Doctor's Session</p>
                <editor
                    id="doctor-editor"
                    v-model="input.doctor_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>

              <!-- Lab Session -->
              <div class="w-full max-w-4xl"v-if="user.role =='Lab_Technician'">
                <p class="text-center text-2xl mb-4">Lab Technician Session</p>
                <editor
                    id="lab-editor"
                    v-model="input.laboratory_notes"
                    apiKey="ymk7tbhj4ul5sgm1y5zx7dc6g2qravp7l63cs23wxpvepxoh"
                    :init="{
                    plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    height: 300
                  }"
                />
              </div>

              <!-- Submit Button -->
              <div>
                <button
                    type="submit"
                    class="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
/* Optional: remove if using Tailwind's utility classes correctly */
</style>

