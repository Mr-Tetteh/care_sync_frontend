<script setup lang="ts">

import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";
import {definePageMeta} from "#imports";

definePageMeta({

  title: 'Register Staff',
  middleware: ['check-auth'],
  role: ['Pharmacist']
})
const currentDateTime = (new Date())
const cartItems = ref([])

const removeItem = (itemId) => {
  localStorage.removeItem(cartItems)
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);

  localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  if (cartItems.value.length === 0) {
    localStorage.removeItem("cartItems");
  }
}

onMounted(() => {
  const items = localStorage.getItem("cartItems")
  cartItems.value = JSON.parse(items)
})

const handleComplete = async () => {
  const {authToken} = useAuth()
  try {

    const updateData = cartItems.value.map(item => ({
      id: item.id,
      quantity: item.DrugQuantity,
    }));

    const {data, error} = await useFetch(useRuntimeConfig().public.api + `/pharmacy/bulk-update`, {
      method: 'PATCH',
      body: {items: updateData},
      headers: {
        Authorization: `Bearer ${authToken.value}`
      }
    })
    if (error.value) {
      throw new Error(error.value.message || 'Update failed');
    }

    toast.success("Transaction completed successfully!");
    cartItems.value = [];
    // window.location.href = '/pharmacy/all-drugs';
  } catch (error) {
    toast.error("An error occurred while completing the transaction. Please try again later.");
  }
}
</script>


<template>
  <!--  <AdminNavBar />-->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header Card -->
        <div class="glass-effect rounded-2xl p-8 mb-8 card-shadow">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Care Sync
              </h1>
              <p class="text-sm text-gray-500 mt-1">{{ new Date().toLocaleString() }}</p>
            </div>
            <div class="print:hidden">
              <button onclick="window.print()"
                      class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"/>
                </svg>
                Print Receipt
              </button>
            </div>
          </div>
        </div>

        <!-- Items Table Card -->
        <div class="glass-effect rounded-2xl overflow-hidden card-shadow mb-8">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <i class="fas fa-pills"></i>
              Medication Details
            </h2>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                <tr class="border-b-2 border-gray-100">

                  <th class="text-left py-4 px-2 font-semibold text-gray-700">#</th>
                  <th class="text-left py-4 px-4 font-semibold text-gray-700">Medication</th>
                  <th class="text-center py-4 px-4 font-semibold text-gray-700">Price</th>
                  <th class="text-center py-4 px-4 font-semibold text-gray-700">Quantity</th>
                  <th class="text-center py-4 px-2 font-semibold text-gray-700 print:hidden">Action</th>
                </tr>
                </thead>
                <tbody id="cartItems">
                <!-- Sample items for demo -->
                <tr v-for="(item, index) in cartItems" :key="item.id"
                    class="border-b border-gray-50 hover:bg-blue-50/50 transition-colors duration-150">
                  <td class="py-4 px-2 text-gray-600 font-medium">{{ index + 1 }}</td>
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-capsules text-blue-600"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-800">{{ item.DrugName }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-center font-medium text-gray-700">{{ item.DrugPrice }}</td>
                  <td class="py-4 px-4 text-center">
                    <span class="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{{ item.DrugQuantity }}</span>
                  </td>
                  <td class="py-4 px-2 text-center print:hidden" @click="removeItem(item.id)">
                    <button
                        class="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                      </svg>

                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
        <div class="flex-1">
          <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="fadeIn  text-gray-800">
                  <b>Total Amount:</b>
                  GHC{{ cartItems.reduce((sum, item) => sum + (item.DrugPrice * item.DrugQuantity), 0).toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Total and Actions Card -->
        <div class="glass-effect rounded-2xl p-6 card-shadow mb-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="print:hidden flex gap-3">
              <button
                  @click="handleComplete"
                  class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                <i class="fas fa-check"></i>
                Complete Transaction
              </button>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div class="text-center">
          <div class="text-gray-500 text-sm">
            <p>© {{ new Date().getFullYear() }} - Your trusted healthcare partner</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

@media print {
  .print\\:hidden {
    display: none !important;
  }

  body {
    background: white !important;
  }
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-shadow {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>