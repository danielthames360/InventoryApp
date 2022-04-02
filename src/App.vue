<template >
  <div :class="getDarkMode ? 'dark' : ''">
    <div class="transition-colors duration-500 ease-in-out bg-light dark:bg-dark text-light">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";

const store = useStore();


const currentDarkMode = localStorage.getItem("darkMode");
if (currentDarkMode === null) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    store.commit('global/setInitialDarkMode', true)
  } else {
    store.commit('global/setInitialDarkMode', false)
  }
} else {
  store.commit('global/setInitialDarkMode', JSON.parse(currentDarkMode))
}

const getDarkMode = computed(() => store.getters['global/getDarkModeStatus'])

</script>
