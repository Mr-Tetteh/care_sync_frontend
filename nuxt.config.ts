// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: ['~/assets/css/tailwind.css'],
    runtimeConfig: {
        public: {
            api: process.env.API
        }
    },

    vite: {
        plugins: [tailwindcss()],
    },

    devtools: {enabled: true},
    modules: ['shadcn-nuxt', '@nuxt/image', 'nuxt-toast'],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    }
})
