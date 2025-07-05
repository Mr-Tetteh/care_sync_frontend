<script setup lang="ts">
import {useAuth} from "~/composables/UseAuth";
import {useRoute} from 'vue-router'


const {resetPassword, resetAccountPassword} = useAuth()

const onsubmit = async () => {
  await resetAccountPassword()
}
</script>

<template>
  <div
      class="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 flex items-center justify-center p-4">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>

    <div class="relative z-10 w-full max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
          Reset Password
        </h1>
        <p class="text-gray-300 text-lg animate-fade-in-delay">
          Don't worry, we'll help you get back to your account
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Form Section -->
        <div class="form-container animate-slide-in-left">
          <form class="form" @submit.prevent="onsubmit()">
            <div class="form-header">
              <div class="icon-wrapper">
                <svg class="lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round"/>
                  <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="15" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h2 class="form-title">Password Recovery</h2>
              <p class="form-subtitle">Enter your new password to reset your password</p>
            </div>

            <div class="input-group">
              <label class="input-label">New Password</label>
              <div class="input-wrapper">
                <input
                    type="password"
                    class="input"
                    placeholder="Enter new password"
                    v-model="resetPassword.newPassword"
                />
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">Confirm Password</label>
              <div class="input-wrapper">
                <input
                    type="password"
                    class="input"
                    placeholder="Enter new Confirm password"
                    v-model="resetPassword.confirmNewPassword"
                />
              </div>
            </div>
            <button
                type="submit"
                class="submit-button"
                :class="{ 'loading': isLoading }"
                :disabled="isLoading"
            >
              <span v-if="!isLoading" class="button-content">
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                Update Password
              </span>
            </button>

          </form>
        </div>

        <!-- Illustration Section -->
        <div class="illustration-container animate-slide-in-right">
          <div class="illustration-wrapper">
            <div class="glow-effect"></div>
            <NuxtImg
                src="../public/images/Reset password-bro.svg"
                alt="Password Reset Illustration"
                class="illustration-image"
            />
            <div class="floating-elements">
              <div class="floating-element element-1">🔐</div>
              <div class="floating-element element-2">✉️</div>
              <div class="floating-element element-3">🔑</div>
            </div>
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(100px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(100px) rotate(-360deg);
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

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out 0.5s both;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out 0.7s both;
}

/* Background Effects */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  filter: blur(1px);
  animation: orbit 20s linear infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  opacity: 0.1;
  animation-duration: 25s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  opacity: 0.15;
  animation-duration: 30s;
  animation-direction: reverse;
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 60%;
  opacity: 0.1;
  animation-duration: 35s;
}

/* Form Styles */
.form-container {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form-header {
  text-align: center;
  margin-bottom: 1rem;
}

.icon-wrapper {
  display: inline-flex;
  padding: 1rem;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  margin-bottom: 1rem;
}

.lock-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

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

.input-icon {
  color: #64748b;
  transition: color 0.3s ease;
  margin-right: 0.75rem;
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

.submit-button {
  position: relative;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  height: 56px;
  cursor: pointer;
  transition: all 0.3s ease;
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
  cursor: not-allowed;
  opacity: 0.7;
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

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #e2e8f0;
}

.back-icon {
  width: 16px;
  height: 16px;
}

/* Illustration Styles */
.illustration-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-wrapper {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.glow-effect {
  position: absolute;
  inset: -20px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.illustration-image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  animation: float 4s ease-in-out infinite;
}

.element-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 40%;
  right: 10%;
  animation-delay: 1s;
}

.element-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 2s;
}

/* Responsive Design */
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