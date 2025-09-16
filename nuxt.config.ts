import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: ['~/assets/css/tailwind.css'],

    // ✅ Enable SSR for cookie/session handling
    ssr: true,

    nitro: {
        preset: 'node-server'
    },

    runtimeConfig: {
        public: {
            api: process.env.API, // e.g. "https://caresync.codeprince.me/api"
        }
    },

    vite: {
        plugins: [tailwindcss()],
    },

    devtools: { enabled: true },
    modules: ['shadcn-nuxt', '@nuxt/image', 'nuxt-toast'],

    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    }
})
