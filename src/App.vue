<template >
  <div :class="getDarkMode ? 'dark' : ''">
    <div class="transition-colors duration-500 ease-in-out bg-light dark:bg-dark-default text-light">
      <router-view></router-view>
    </div>
  </div>

</template>

<script setup>
import { useStore } from "vuex";
import { computed } from 'vue';

const store = useStore();
 
const getDarkMode = computed(() => store.getters['getDarkModeStatus'])

</script>

<style >
</style>