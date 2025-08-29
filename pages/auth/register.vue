<script setup lang="ts">
import {useAuth} from "~/composables/UseAuth";
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
  role: ['Administrator'],
})

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="w-full h-screen bg-gray-100">
      <SidebarTrigger/>
      <div class="bg-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-8 fade-in">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4 icon-bounce">
            <i class="fas fa-user-plus text-2xl text-indigo-600 icon-glow"></i>
          </div>
          <h1 class="text-4xl font-bold text-blue-300 mb-2">Staff Registration</h1>
          <p class="text-indigo-200 text-lg">Join our professional healthcare team</p>
        </div>

        <!-- Main Content -->
        <div class="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
          <!-- Form Section -->
          <div class="flex-1 slide-in-left">
            <div class="glass-effect rounded-2xl p-8 card-shadow">
              <!-- Progress Bar -->
              <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
              </div>

              <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Personal Information</h2>
                <p class="text-gray-600">Please fill in your details to create your account</p>
              </div>

              <form class="space-y-6" @submit.prevent="onsubmit" id="registrationForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- First Name -->
                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-user"></i>
                      </div>
                      <input
                          type="text"
                          id="firstName"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-transparent focus:outline-none"
                          placeholder="First Name"
                          v-model="input.first_name"
                      />
                      <label for="firstName" class="floating-label">First Name</label>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-user"></i>
                      </div>
                      <input
                          type="text"
                          id="lastName"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-transparent focus:outline-none"
                          placeholder="Last Name"
                          v-model="input.last_name"
                      />
                      <label for="lastName" class="floating-label">Last Name</label>
                    </div>
                  </div>

                  <!-- Other Names -->
                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-user-tag"></i>
                      </div>
                      <input
                          type="text"
                          id="otherNames"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-transparent focus:outline-none"
                          placeholder="Other Names"
                          v-model="input.other_names"
                      />
                      <label for="otherNames" class="floating-label">Other Names (Optional)</label>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-envelope"></i>
                      </div>
                      <input
                          type="email"
                          id="email"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-transparent focus:outline-none"
                          placeholder="Email Address"
                          v-model="input.email"
                      />
                      <label for="email" class="floating-label">Email Address</label>
                    </div>
                  </div>

                  <!-- Gender -->
                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500 z-10">
                        <i class="fas fa-venus-mars"></i>
                      </div>
                      <select
                          id="gender"
                          class="input-field select-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
                          v-model="input.gender"
                      >
                        <option value="" disabled selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <label for="gender" class="floating-label">Gender</label>
                    </div>
                  </div>

                  <div class="field-group">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500 z-10">
                        <i class="fas fa-venus-mars"></i>
                      </div>
                      <select
                          id="role"
                          class="input-field select-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
                          v-model="input.role"
                      >
                        <option value="" disabled selected>Select role</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Receptionist">Receptionist</option>
                      </select>
                      <label for="gender" class="floating-label">Role</label>
                    </div>
                  </div>

                  <div class="field-group " v-if="input.role === 'Doctor'">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-calendar-alt"></i>
                      </div>
                      <select
                          id="role"
                          class="input-field select-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
                          v-model="input.doctors_specialization"
                      >
                        <option value="" disabled selected>Select Specialization</option>
                        <option value="Allergist">Allergist</option>
                        <option value="Anesthesiologist">Anesthesiologist</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Chiropractor">Chiropractor</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Emergency Medicine">Emergency Medicine</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Family Medicine">Family Medicine</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                        <option value="General Practitioner">General Practitioner</option>
                        <option value="Geneticist">Geneticist</option>
                        <option value="Geriatrician">Geriatrician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Hematologist">Hematologist</option>
                        <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
                        <option value="Internist">Internist</option>
                        <option value="Nephrologist">Nephrologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Neurosurgeon">Neurosurgeon</option>
                        <option value="Obstetrician">Obstetrician</option>
                        <option value="Occupational Therapist">Occupational Therapist</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Oral Surgeon">Oral Surgeon</option>
                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                        <option value="Otolaryngologist">Otolaryngologist (ENT)</option>
                        <option value="Pain Management Specialist">Pain Management Specialist</option>
                        <option value="Pathologist">Pathologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Physical Therapist">Physical Therapist</option>
                        <option value="Physiatrist">Physiatrist</option>
                        <option value="Plastic Surgeon">Plastic Surgeon</option>
                        <option value="Podiatrist">Podiatrist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Pulmonologist">Pulmonologist</option>
                        <option value="Radiation Oncologist">Radiation Oncologist</option>
                        <option value="Radiologist">Radiologist</option>
                        <option value="Rheumatologist">Rheumatologist</option>
                        <option value="Sports Medicine Specialist">Sports Medicine Specialist</option>
                        <option value="Surgeon">Surgeon</option>
                        <option value="Thoracic Surgeon">Thoracic Surgeon</option>
                        <option value="Urologist">Urologist</option>
                        <option value="Vascular Surgeon">Vascular Surgeon</option>
                      </select>
                      <label for="gender" class="floating-label">Doctor's Specialization</label>
                    </div>
                  </div>


                  <!-- Date of Birth -->
                  <div class="field-group ">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-calendar-alt"></i>
                      </div>
                      <input
                          type="date"
                          id="dateOfBirth"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
                          v-model="input.date_of_birth"
                      />
                      <label for="dateOfBirth" class="floating-label">Date of Birth</label>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="field-group md:col-span-2">
                    <div class="form-input-focus rounded-lg relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-500">
                        <i class="fas fa-phone"></i>
                      </div>
                      <input
                          type="tel"
                          id="phone"
                          class="input-field block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-transparent focus:outline-none"
                          placeholder="Phone Number"
                          v-model="input.phone"
                      />
                      <label for="phone" class="floating-label">Phone Number</label>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-6">
                  <button
                      type="submit"
                      class="btn-primary w-full py-4 px-6 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <i class="fas fa-user-plus mr-2"></i>
                    Create Staff Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Illustration Section -->
          <div class="flex-1 slide-in-right">
            <div class="glass-effect rounded-2xl p-8 card-shadow h-full">
              <div class="h-full flex flex-col items-center justify-center text-center">
                <!-- Illustration -->
                <div class="mb-8">
                  <div class="w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <i class="fas fa-user-md text-8xl text-white"></i>
                    <NuxtImg
                        src="/images/Doctors-cuate.svg"
                        alt="Healthcare Team Illustration"
                        class="w-64 h-64 object-contain icon-bounce"/>
                  </div>
                </div>

                <!-- Content -->
                <div class="space-y-6">
                  <h3 class="text-3xl font-bold text-gray-800">Join Our Team</h3>
                  <p class="text-gray-600 text-lg leading-relaxed">
                    Become part of our dedicated healthcare professionals and make a difference in people's lives every day.
                  </p>

                  <!-- Features -->
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-green-600"></i>
                      </div>
                      <span class="text-gray-700">Professional Development</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-heart text-blue-600"></i>
                      </div>
                      <span class="text-gray-700">Comprehensive Benefits</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-users text-purple-600"></i>
                      </div>
                      <span class="text-gray-700">Collaborative Environment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </main>
  </SidebarProvider>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-input-focus {
  transition: all 0.3s ease;
  position: relative;
}

.form-input-focus:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.form-input-focus:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.input-field {
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  transform: scale(1.02);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}

.floating-label {
  position: absolute;
  top: 50%;
  left: 2.5rem;
  transform: translateY(-50%);
  background: white;
  padding: 0 0.5rem;
  color: #6b7280;
  transition: all 0.3s ease;
  pointer-events: none;
  font-size: 0.875rem;
}

.input-field:focus + .floating-label,
.input-field:not(:placeholder-shown) + .floating-label {
  top: 0;
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 500;
}

.icon-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.progress-bar {
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  width: 0%;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.field-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.select-field {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.card-shadow {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.icon-glow {
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
}
</style>


