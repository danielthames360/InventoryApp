<template>
    <div>
        <h1 class="mb-10 text-2xl font-bold">Graphics will be here</h1>
        <br />
        <h1 class="mb-3 text-2xl font-bold">Welcome {{ user.displayName }}</h1>
        <img
            class="mx-auto"
            v-if="user.photoURL"
            :src="user.photoURL"
            alt
        />
        <br />

        <video
            playsinline
            class="shadow-lg aspect-video dark:shadow-golden shadow-dark-300"
            autoplay
            muted
            data-automation="VideoPlayer"
            loop
        >
            <source
                src="https://ak.picdn.net/shutterstock/videos/1054222547/preview/stock-footage-financial-business-diagram-with-charts-and-stock-numbers-showing-profits-and-losses-over-time.webm"
                type="video/webm"
            />
            <source
                src="https://ak.picdn.net/shutterstock/videos/1054222547/preview/stock-footage-financial-business-diagram-with-charts-and-stock-numbers-showing-profits-and-losses-over-time.mp4"
                type="video/mp4"
            />
        </video>
    </div>
</template>

 <script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => {
    return store.getters['auth/user']
})

</script>