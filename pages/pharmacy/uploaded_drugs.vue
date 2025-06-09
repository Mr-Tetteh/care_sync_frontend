<script setup lang="ts">

import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {usePharmacy} from "~/composables /usePharmacy";
import {useAsyncData} from "#app";

const {retrieve_drugs, drugs} = usePharmacy()

const {data: details} = await useAsyncData('details', async () => {
  const res = await retrieve_drugs();
  return res.value
});

</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gray-50 w-full p-2">
      <SidebarTrigger/>
      <slot/>
      <body class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-x-hidden">

      <div class="main min-vh-100 bg-light">
        <div id="main">
          <div class="patient-registration-form container">

            <div class="card-header bg-white py-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="search-box offset-9">
                  <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
<!--                    <i class="bi bi-search"></i>-->
                  </span>
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="form-control border-start-0"
                        placeholder="Search staff..."
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- Cart Bubble -->
<!--            <RouterLink to="checkout">-->
<!--              <div class="cart-bubble" v-if="cart.length">-->
<!--                {{ cart.length }}-->
<!--              </div>-->
<!--            </RouterLink>-->

            <!-- Categories -->
            <div v-for="category in details" :key="category.category">
              <div class="card shadow-sm mb-4">
                <div class="card-header bg-white">
                  <h2 class="category-title mb-0">{{ category.category }}</h2>
                </div>
                <div class="card-body">
                  <div class="drug-grid">
                    <div v-for="drug in category.drugs"
                         :key="drug.id"
                         class="drug-item">
                      <!-- Drug Name & Price -->
                      <div class="drug-header">
                        <h3 class="drug-name">{{ drug.drug_name }}</h3>
                        <div class="price">${{ drug.drug_price }}</div> <!-- Use drug_price instead of name -->
                      </div>

                      <!-- Drug Info -->
                      <div class="drug-info">
                        <p class="mb-2">{{ drug.drug_description }}</p>
                        <div class="notes">
                          {{ drug.additional_note }}
                        </div>
                      </div>

                      <!-- Stock & Action -->
                      <div class="drug-footer">
                        <div class="stock" :class="{ 'low-stock': drug.quantity < 10 }">
                          {{ drug.drug_quantity }} in stock
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </body>
    </main>
  </SidebarProvider>
</template>

<style scoped>
.cart-bubble {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #000;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 1.5rem;
  color: #333;
  font-weight: 500;
}

.drug-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  padding: 1rem 0;
}

.drug-item {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  width: 100%;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.drug-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.drug-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.drug-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}


.price {
  background: #f8f9fa;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  color: #0066cc;
}

.drug-info {
  color: #666;
  margin-bottom: 1rem;
}

.notes {
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #555;
}

.drug-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.stock {
  color: #28a745;
  font-size: 0.9rem;
}

.low-stock {
  color: #dc3545;
}

.add-to-cart {
  height: 35px;
  padding: 0 1.25rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart:hover {
  background: #333;
  transform: scale(1.05);
}

.add-to-cart:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .drug-grid {
    grid-template-columns: 1fr;
  }
}

</style>