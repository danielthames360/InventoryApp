<template >
  <div :class="getDarkMode ? 'dark' : ''">
    <div
      class="transition-colors duration-500 ease-in-out bg-light dark:bg-dark text-light"
    >
      <Dashboard />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const getDarkMode = computed(() => store.getters['getDarkModeStatus'])
const Dashboard = defineAsyncComponent(() => import('./modules/dashboard/layouts/DashboardLayout.vue'))

</script>
