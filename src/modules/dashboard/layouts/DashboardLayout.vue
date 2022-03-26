<template>
  <div
    class="relative z-0 flex justify-between h-screen max-h-[-webkit-fill-available] mx-auto antialiased"
  >
    <NavBar :toggleNavSide="toggleNav" />
    <div
      class="relative w-full p-10 sm:w-12/12 -z-50 h-fit min-h-[80vh]"
      @click="toggleNav = !toggleNav"
    >
      <div class="flex items-center justify-center">
        <h1 class="text-center dark:text-light text-dark-300">
          {{ $t('dashboard.text') }}
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>


import { ref, defineAsyncComponent } from 'vue';

const toggleNav = ref(false);
const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'))


</script>
 

 <style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>