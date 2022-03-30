<template>
    <div
        class="flex items-center justify-between h-auto min-h-screen m-auto overflow-y-clip sm:overflow-hidden sm:justify-center"
    >
        <div class="relative w-full md:w-6/12 lg:w-5/12 xl:w-4/12">
            <div
                class="relative flex flex-col justify-center px-10 sm:px-16 md:px-4 lg:px-9 xl:px-12"
            >
                <router-view :language="language" v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <div class="relative flex justify-around mt-10 sm:mt-24 bottom-5">
                    <div
                        @click="toggleLanguage"
                        class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer dark:hover:text-golden text-dark-300 dark:text-light"
                    >
                        <SpainFlagIcon class="w-6 h-6" v-if="(locale != 'es')" />
                        <EnglishFlagIcon class="w-6 h-6" v-else />

                        <h1>{{ (locale != 'es') ? $t('dashboard.nav.spanish') : $t('dashboard.nav.english') }}</h1>
                    </div>
                    <div
                        @click="toggleDarkMode"
                        class="relative flex items-center p-2 ml-5 space-x-2 transition-colors duration-300 rounded-md cursor-pointer dark:hover:text-golden animate-pulse text-dark-300 dark:text-light"
                    >
                        <NightIcon
                            class="w-6 h-6 dark:fill-light fill-dark-300"
                            v-if="!getDarkModeStatus"
                        />
                        <LightIcon class="w-6 h-6 dark:fill-light fill-dark-300" v-else />

                        <h1>{{ !getDarkModeStatus ? $t('dashboard.nav.darkMode') : $t('dashboard.nav.lightMode') }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div hidden class="h-screen md:w-6/12 lg:w-7/12 xl:w-8/12 lg:block clip">
            <video
                playsinline
                class="object-cover w-full h-full"
                loop
                autoplay
                muted
                data-automation="VideoPlayer"
            >
                <source src="@/assets/videos/video.mp4" type="video/mp4" />
            </video>
        </div>
    </div>
</template>

<script setup>
import LightIcon from '@/assets/icons/LightIcon';
import NightIcon from '@/assets/icons/NightIcon';
import EnglishFlagIcon from '@/assets/icons/EnglishFlagIcon';
import SpainFlagIcon from '@/assets/icons/SpainFlagIcon';

import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index'

const { locale } = useI18n()
const store = useStore()

const toggleDarkMode = () => {
    store.commit('global/toggleDarkMode');
}
const getDarkModeStatus = computed(() =>
    store.getters['global/getDarkModeStatus'])

const language = ref(() =>
    store.getters['global/getLanguage'])

const toggleLanguage = () => {
    store.commit('global/toggleLanguage');
    locale.value = (locale.value == "es") ? "en" : "es";
}

</script>
  