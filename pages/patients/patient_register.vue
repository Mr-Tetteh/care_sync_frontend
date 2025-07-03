<script setup lang="ts">
import {ref, computed} from 'vue'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import {Button} from '@/components/ui/button'
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar"
import AppSidebar from "~/components/AppSidebar.vue"
import {usePatients} from "~/composables/usePatients";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
})

const {input, uploadPatient} = usePatients()
const currentStep = ref(1)
const totalSteps = 3

const steps = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Enter your basic details'
  },
  {
    id: 2,
    title: 'First Guardian',
    description: 'First Guardian Information'
  },
  {
    id: 3,
    title: 'Second Guardian',
    description: 'Second Guardian Information'
  },

]

const canGoNext = computed(() => currentStep.value < totalSteps)
const canGoBack = computed(() => currentStep.value > 1)

const nextStep = () => {
  if (canGoNext.value) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (canGoBack.value) {
    currentStep.value--
  }
}

const goToStep = (step: number) => {
  if (step >= 1 && step <= totalSteps) {
    currentStep.value = step
  }
}
const getStepStatus = (stepNumber: number) => {
  if (stepNumber < currentStep.value) return 'completed'
  if (stepNumber === currentStep.value) return 'active'
  return 'inactive'
}

const handleSubmit = () => {
  uploadPatient()
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="bg-gray-50 w-full p-10 justify-center">
      <SidebarTrigger/>
      <div class="min-h-screen p-10">
        <div id="main">
          <header class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Setup Wizard</h1>
            <p class="text-gray-600 mt-2">Complete the following steps to get started</p>
          </header>

          <div class="max-w-4xl">
            <form @submit.prevent="handleSubmit">

              <Stepper v-model="currentStep" class="mb-8">
                <StepperItem
                    v-for="step in steps"
                    :key="step.id"
                    :step="step.id"
                    class="cursor-pointer"
                    @click="goToStep(step.id)"
                >
                  <StepperTrigger>
                    <StepperIndicator
                        :class="{
                        'bg-primary text-primary-foreground': getStepStatus(step.id) === 'completed' || getStepStatus(step.id) === 'active',
                        'bg-muted text-muted-foreground': getStepStatus(step.id) === 'inactive'
                      }"
                    >
                      <span v-if="getStepStatus(step.id) === 'completed'">✓</span>
                      <span v-else>{{ step.id }}</span>
                    </StepperIndicator>
                    <div class="text-left">
                      <StepperTitle
                          :class="{
                          'text-primary': getStepStatus(step.id) === 'active',
                          'text-muted-foreground': getStepStatus(step.id) === 'inactive'
                        }"
                      >
                        {{ step.title }}
                      </StepperTitle>
                      <StepperDescription
                          :class="{
                          'text-primary/70': getStepStatus(step.id) === 'active',
                          'text-muted-foreground': getStepStatus(step.id) !== 'active'
                        }"
                      >
                        {{ step.description }}
                      </StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator v-if="step.id < totalSteps"/>
                </StepperItem>
              </Stepper>

              <!-- Step Content -->
              <div class="bg-white rounded-lg border p-8 mb-8">
                <div v-if="currentStep === 1" class="space-y-6">
                  <h2 class="text-2xl font-semibold">Personal Information</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label class="block text-sm font-medium mb-2">First Name</label>
                      <input type="text"
                             v-model="input.first_name"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient first name">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text"
                             v-model="input.last_name"

                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient last name">
                    </div>


                    <div>
                      <label class="block text-sm font-medium mb-2">Other Names</label>
                      <input type="text"
                             v-model="input.other_names"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient other names ">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Contact</label>
                      <input type="tel"
                             v-model="input.phone"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient contact">
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Age</label>
                      <input type="number"
                             v-model="input.age"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient age ">
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Date of Birth</label>
                      <input type="date"
                             v-model="input.date_of_birth"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient date of birth">
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Gender</label>
                      <select
                          v-model="input.gender"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Address</label>
                      <input type="text"
                             v-model="input.address"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient Address">
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Email</label>
                      <input type="email"
                             v-model="input.email"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter patient email">
                    </div>


                    <div>
                      <label class="block text-sm font-medium mb-2">NHIS</label>
                      <input type="text"
                             v-model="input.NHIS"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                             placeholder="Enter your email">
                    </div>
                  </div>


                </div>

                <div v-else-if="currentStep === 2" class="space-y-6">
                  <h2 class="text-2xl font-semibold">Guardian Info</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">First Name</label>
                      <input type="text"
                             v-model="input.guardian_1_first_name"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text"
                             v-model="input.guardian_1_last_name"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Relation </label>
                      <input type="text"
                             v-model="input.guardian_1_relation"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Residence  </label>
                      <input type="text"
                             v-model="input.guardian_1_residence"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Contact </label>
                      <input type="tel"
                             v-model="input.guardian_1_contact"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>

                    <div class="span-cols-6">
                      <label class="block text-sm font-medium mb-2">Relation </label>
                      <input type="text"
                             v-model="input.guardian_1_relation"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                  </div>
                </div>

                <div v-else-if="currentStep === 3" class="space-y-6">
                  <h2 class="text-2xl font-semibold">Second Guardian(optional)</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">First Name</label>
                      <input type="text"
                             v-model="input.guardian_2_first_name"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text"
                             v-model="input.guardian_2_last_name"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Relation </label>
                      <input type="text"
                             v-model="input.guardian_2_relation"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>

                    <div>
                      <label class="block text-sm font-medium mb-2">Contact </label>
                      <input type="tel"
                             v-model="input.guardian_2_contact"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>

                    <div class="span-cols-6">
                      <label class="block text-sm font-medium mb-2">Residence</label>
                      <input type="text"
                             v-model="input.guardian_2_residence"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                    </div>
                  </div>
                </div>

              </div>
              <!-- Navigation -->
              <div class="flex justify-between">
                <Button
                    variant="outline"
                    @click.prevent="prevStep"
                    :disabled="!canGoBack"
                    class="px-6"
                >
                  Previous
                </Button>

                <div class="flex gap-2">
                  <Button
                      v-if="currentStep < totalSteps"
                      @click.prevent="nextStep"
                      :disabled="!canGoNext"
                      class="px-6"
                  >
                    Next
                  </Button>

                </div>
                <Button
                    v-if="currentStep==3"
                    class="px-6 bg-green-600 hover:bg-green-700"
                    type="submit"
                >
                  Complete Setup
                </Button>
              </div>

            </form>


            <!-- Progress indicator -->
            <div class="mt-6 text-center text-sm text-gray-500">
              Step {{ currentStep }} of {{ totalSteps }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>