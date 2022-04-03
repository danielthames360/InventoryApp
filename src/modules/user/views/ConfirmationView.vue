<template>
    <div class="relative h-screen overflow-hidden">
        <ConfettiExplosion
            :particleSize="8"
            :particleCount="300"
            :force="0.7"
            :duration="8000"
            :stageHeight="heightScreen"
            :stageWidth="widthScreen"
            :colors="['#FECC75', '#f87171', '#96CEB4', '#68BDC3']"
        />

        <div
            class="flex flex-col items-center justify-center w-full h-full p-4 m-auto space-y-12 text-center md:w-8/12 lg:w-5/12 text-dark-300 dark:text-light"
        >
            <div class="flex items-center justify-between space-x-3">
                <img
                    class="transition-all ease-in rounded-full w-28 hover:scale-110"
                    :src="user.photoURL ?
                    user.photoURL :
                    `https://ui-avatars.com/api/?name=${user.displayName}&background=${getDarkMode ? 'FECC75' : '2d2d2d'}&color=${getDarkMode ? '2d2d2d' : 'F6F6F6'}`"
                    alt
                />
            </div>
            <h1 class="text-4xl font-bold sm:text-5xl">
                <span class="animate-pulse">👋🏻</span>
                {{ $t('confirmation.welcome') }} {{ userName }}!
            </h1>
            <p class="text-lg font-normal">{{ $t('confirmation.confirmRegistrationMessage') }}</p>
            <a
                :href="`https://wa.me/59177655430?text=${$t('confirmation.requestAccessMessage1')} ${user.displayName ?? ''}. 👋🏻%0a${$t('confirmation.requestAccessMessage2')}%0a${$t('confirmation.requestAccessMessage3')} ${user.email}`"
                target="_blank"
                rel="noreferrer noopener"
                type="submit"
                class="flex items-center justify-center w-full p-4 font-semibold transition appearance-none rounded-xl bg-dark-300 dark:bg-golden hover:scale-105 dark:focus:animate-pulse text-md dark:text-dark-300 text-light"
            >
                {{ $t('confirmation.requestAccess') }}
                <svg
                    class="w-5 ml-2 align-self-start animate-pulse fill-light dark:fill-dark-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentcolor"
                        d="M12,0A12,12,0,0,0,1.9,18.48L0,23.32A.5.5,0,0,0,.5,24a.49.49,0,0,0,.17,0l5-1.79A12,12,0,1,0,12,0Zm6,15.5A3,3,0,0,1,15,18c-1.57,0-4.59-1.88-5.85-3.15S6,10.57,6,9A3,3,0,0,1,8.5,6h1a.5.5,0,0,1,.45.28s.6,1.22,1,2-.39,1.89-.87,2.37a6,6,0,0,0,1.27,2,6,6,0,0,0,2,1.27,3,3,0,0,1,1.83-1,1.16,1.16,0,0,1,.53.13c.77.39,2,1,2,1a.5.5,0,0,1,.28.45Z"
                    />
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup>

import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ConfettiExplosion from "vue-confetti-explosion";

const store = useStore();
const router = useRouter();

const isConfirmed = store.dispatch("auth/checkConfirmation");
isConfirmed.then((res) => {
    if (res) router.push({ name: 'reports' })
})

const user = computed(() => {
    return store.getters['auth/user']
})
const heightScreen = window.innerHeight * 1.5;
const widthScreen = window.innerWidth * 2.3;

const getDarkMode = computed(() => store.getters['global/getDarkModeStatus'])

const userName = user.value.displayName.split(' ')[0] ?? user.value.displayName ?? ''
</script>

 