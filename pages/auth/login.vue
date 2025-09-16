<script setup lang="ts">

import LoginForm from "~/components/LoginForm.vue";

import {useAuth} from "~/composables/UseAuth";

const {form, login, isLoading} = useAuth()

const onsubmit = () => {
  login()
}
</script>

<template>
  <div
      class="min-h-screen login-wrapper flex items-center justify-center p-4 overflow-x-hidden">
    <div class="relative z-10 w-full max-w-6xl">
      <!-- Form Section -->
      <div class="text-center mb-8">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor" stroke-width="2"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor"
                  stroke-width="2"/>
          </svg>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
          Welcome Back</h2>
        <p class="form-subtitle animate-fade-in-delay">Sign in to access your Care Sync dashboard</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="form-container animate-slide-in-left">
          <form class="form" @submit.prevent="onsubmit()">
            <!-- Email Field -->
            <div class="input-group">
              <label class="input-label">Email Address</label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_3" data-name="Layer 3">
                      <path
                          d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                    </g>
                  </svg>
                </div>
                <input
                    v-model="form.email"
                    type="email"
                    class="input"
                    placeholder="Enter your email address"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="input-group">
              <label class="input-label">Password</label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                    <path
                        d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                  </svg>
                </div>
                <input
                    v-model="form.password"
                    type="password"
                    class="input"
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    class="password-toggle"
                    @click="showPassword = !showPassword"
                >

                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="form-options">
              <label class="checkbox-wrapper">
                <input type="checkbox" v-model="rememberMe" class="checkbox-input">
                <div class="checkbox-custom">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"/>
                  </svg>
                </div>
<!--                <span class="checkbox-label">Remember me</span>-->
              </label>
              <RouterLink to="/auth/forgot_password" class="forgot-link">
                Forgot password?
              </RouterLink>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                class="submit-button"
                :disabled="isLoading"
            >
            <span class="button-content">
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M21 3L12 12L8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
              Sign In to Care Sync
            </span>
            </button>


            <!-- Social Login Buttons -->
          </form>
        </div>

        <!-- Illustration Section -->
        <div class="illustration-section">
          <div class="illustration-container">
            <div class="illustration-background">
              <div class="glow-effect"></div>
              <div class="floating-elements">
                <div class="floating-icon icon-1">🏥</div>
                <div class="floating-icon icon-2">💊</div>
                <div class="floating-icon icon-3">🩺</div>
                <div class="floating-icon icon-4">📋</div>
              </div>
            </div>


            <NuxtImg
                src="../public/images/Doctors-bro (1).svg"
                alt="Healthcare Management Illustration"
                class="illustration-image"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Animations */
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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

/* Main Container */
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Form Section */
.form-section {
  animation: fadeIn 0.8s ease 0.2s both;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-icon {
  display: inline-flex;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.header-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 0.5rem 0;
}

.form-subtitle {
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
}

.form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

/* Input Groups */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.8);
  border: 2px solid rgba(71, 85, 105, 0.5);
  border-radius: 12px;
  padding: 0 1rem;
  height: 56px;
  transition: all 0.3s ease;
}

.input-wrapper:hover {
  border-color: rgba(99, 102, 241, 0.5);
  background: rgba(30, 41, 59, 0.9);
}

.input-wrapper.focused {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background: rgba(30, 41, 59, 1);
}

.input-wrapper.filled .input-icon {
  color: #6366f1;
}

.input-wrapper.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-icon {
  color: #64748b;
  transition: color 0.3s ease;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.input {
  flex: 1;
  background: transparent;
  border: none;
  color: #f1f5f9;
  font-size: 1rem;
  outline: none;
  height: 100%;
}

.input::placeholder {
  color: #64748b;
}

.input-status {
  width: 20px;
  height: 20px;
  color: #22c55e;
  flex-shrink: 0;
}

.password-toggle {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.password-toggle:hover {
  color: #94a3b8;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #475569;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: #6366f1;
  border-color: #6366f1;
}

.checkbox-custom svg {
  width: 12px;
  height: 12px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom svg {
  opacity: 1;
}

.checkbox-label {
  color: #94a3b8;
  font-size: 0.9rem;
  user-select: none;
}

.forgot-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #8b5cf6;
}

/* Submit Button */
.submit-button {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  height: 56px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  width: 18px;
  height: 18px;
}


.social-button svg {
  width: 18px;
  height: 18px;
}

/* Illustration Section */
.illustration-section {
  animation: slideIn 0.8s ease 0.4s both;
}

.illustration-container {
  position: relative;
  border-radius: 24px;
  padding: 2rem;
  overflow: hidden;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-background {
  position: absolute;
  inset: 0;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.floating-elements {
  position: absolute;
  inset: 0;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  animation: float 4s ease-in-out infinite;
  pointer-events: none;
}

.icon-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.icon-2 {
  top: 30%;
  right: 20%;
  animation-delay: 1s;
}

.icon-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 2s;
}

.icon-4 {
  bottom: 20%;
  right: 15%;
  animation-delay: 3s;
}

.illustration-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
}

.illustration-overlay {
  position: absolute;
  bottom: 2rem;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    margin: 1rem;
  }

  .illustration-container {
    order: -1;
    margin-bottom: 2rem;
  }

  .illustration-wrapper {
    max-width: 300px;
  }

  .floating-element {
    display: none;
  }
}
</style>