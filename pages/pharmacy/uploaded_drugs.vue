<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/AppSidebar.vue";
import {useAsyncData} from "#app";
import {usePharmacy} from "~/composables /usePharmacy";

const {retrieve_drugs, drugs} = usePharmacy()
const searchQuery = ref('')

const {data: details} = await useAsyncData('details', async () => {
  const res = await retrieve_drugs();
  return res.value
});

// Filter drugs based on search query
const filteredDetails = computed(() => {
  if (!searchQuery.value || !details.value) return details.value;

  return details.value.map(category => ({
    ...category,
    drugs: category.drugs.filter(drug =>
        drug.drug_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        drug.drug_description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })).filter(category => category.drugs.length > 0);
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar/>
    <main class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-full">
      <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div class="flex items-center gap-4">
            <SidebarTrigger class="p-2 hover:bg-slate-100 rounded-lg transition-colors"/>
            <div class="hidden sm:block">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pharmacy Inventory
              </h1>
              <p class="text-slate-600 text-sm">Manage your medication stock</p>
            </div>
          </div>

          <!-- Enhanced Search -->
          <div class="relative w-full max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
                type="text"
                v-model="searchQuery"
                class="block w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                placeholder="Search medications..."
            >
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto p-6">
        <slot/>

        <!-- Categories -->
        <div v-if="filteredDetails?.length" class="space-y-8">
          <div v-for="category in filteredDetails" :key="category.category" class="animate-in fade-in duration-500">
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <!-- Category Header -->
              <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <div class="w-2 h-8 bg-white/30 rounded-full"></div>
                    {{ category.category }}
                  </h2>
                  <div class="bg-white/20 px-3 py-1 rounded-full">
                    <span class="text-white font-medium text-sm">{{ category.drugs.length }} items</span>
                  </div>
                </div>
              </div>

              <!-- Drugs Grid -->
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div v-for="drug in category.drugs"
                       :key="drug.id"
                       class="group bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1">

                    <!-- Drug Card Header -->
                    <div class="p-5 border-b border-slate-100">
                      <div class="flex items-start justify-between mb-3">
                        <h3 class="font-semibold text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {{ drug.drug_name }}
                        </h3>
                        <div class="flex-shrink-0 ml-3">
                          <span
                              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-400 to-blue-500 text-white shadow-sm">
                            ${{ drug.drug_price }}
                          </span>
                        </div>
                      </div>

                      <!-- Description -->
                      <p class="text-slate-600 text-sm line-clamp-2 mb-3">
                        {{ drug.drug_description }}
                      </p>

                      <!-- Additional Notes -->
                      <div v-if="drug.additional_note" class="bg-slate-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                        <p class="text-xs text-slate-700 italic">
                          {{ drug.additional_note }}
                        </p>
                      </div>
                    </div>

                    <!-- Drug Card Footer -->
                    <div class="p-5 bg-slate-50/50">
                      <div class="flex items-center justify-between">
                        <!-- Stock Status -->
                        <div class="flex items-center gap-2">
                          <div class="w-2 h-2 rounded-full"
                               :class="drug.drug_quantity < 10 ? 'bg-red-400' : drug.drug_quantity < 25 ? 'bg-yellow-400' : 'bg-green-400'">
                          </div>
                          <span class="text-sm font-medium"
                                :class="drug.drug_quantity < 10 ? 'text-red-600' : drug.drug_quantity < 25 ? 'text-yellow-600' : 'text-green-600'">
                            {{ drug.drug_quantity }} in stock
                          </span>
                        </div>

                        <!-- Action Button -->
                        <button
                            class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            :disabled="drug.drug_quantity === 0">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                          Add to Cart
                        </button>
                      </div>

                      <!-- Low Stock Warning -->
                      <div v-if="drug.drug_quantity < 10 && drug.drug_quantity > 0"
                           class="mt-3 flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                        <span class="text-xs font-medium">Low Stock Alert</span>
                      </div>

                      <!-- Out of Stock -->
                      <div v-if="drug.drug_quantity === 0"
                           class="mt-3 flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        <span class="text-xs font-medium">Out of Stock</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 max-w-md mx-auto">
            <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <h3 class="text-lg font-semibold text-slate-700 mb-2">No medications found</h3>
            <p class="text-slate-500 text-sm">Try adjusting your search criteria or check back later.</p>
          </div>
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fade-in 0.5s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>