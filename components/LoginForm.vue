<script setup lang="ts">

import {useAuth} from "~/composables /UseAuth";

const {form , login} = useAuth()

const onsubmit = () => {
  login()
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center p-6 md:p-10">

    <div class="flex flex-row w-full max-w-4xl gap-6">
      <!-- Form Section -->
      <div class="flex-1">
        <form class="form" @submit.prevent="onsubmit()">
          <div class="flex-column">
            <label>Email </label>
          </div>
          <div class="inputForm">
            <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path
                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
                ></path>
              </g>
            </svg>
            <input v-model="form.email" type="email" class="input" placeholder="Enter your Email"/>
          </div>

          <div class="flex-column">
            <label>Password </label>
          </div>
          <div class="inputForm">
            <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
              ></path>
              <path
                  d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
              ></path>
            </svg>
            <input v-model="form.password" type="password" class="input" placeholder="Enter your Password"/>
          </div>

          <div class="flex-row text-white">
            <div>
              <input type="radio"/>
              <label>Remember me </label>
            </div>
            <span class="span">Forgot password?</span>
          </div>
          <button class="button-submit">Sign In</button>
          <p class="p">Don't have an account? <NuxtLink class="span" to="/auth/register">Sign Up</NuxtLink></p>
          <p class="p line">Or With</p>

          <div class="flex-row">
            <button class="btn google">Google</button>
            <button class="btn apple">Apple</button>
          </div>
        </form>
      </div>

      <!-- Right panel with image -->
      <div class="flex-1 image-panel">
        <div class="relative h-full rounded-lg overflow-hidden">
          <NuxtImg
              src="../public/images/Doctors-bro (1).svg"
              alt="Image"
              class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #1f1f1f;
  padding: 30px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.image-panel {
  background-color: #f87171;
  border-radius: 20px;
  overflow: hidden;
}

p {
  color: white;
}

.span {
  color: #2d79f3;
  cursor: pointer;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #333;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: #2b2b2b;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
  color: #f1f1f1;
}

.input:focus {
  outline: none;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #2d79f3;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-column > label {
  color: #f1f1f1;
  font-weight: 600;
}

.btn {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  background-color: #2b2b2b;
  color: #f1f1f1;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.google:hover {
  border: 1px solid #EA4335;
}

.apple:hover {
  border: 1px solid #fff;
}

.line {
  margin-top: 10px;
  position: relative;
  text-align: center;
}

.line::before, .line::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #444;
}

.line::before {
  left: 0;
}

.line::after {
  right: 0;
}
</style>