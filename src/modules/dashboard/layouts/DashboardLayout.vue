<template>
  <div class="relative z-0 flex justify-between h-screen mx-auto antialiased">
    <NavBar :toggleNavSide="toggleNav" />
    <div class="relative w-11/12 p-10 -z-50" @click="toggleNav = !toggleNav">
      <div class="flex items-center justify-center h-full">
        <h1 class="dark:text-light text-dark-300">{{ $t('dashboard.text') }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>

import NavBar from '../components/NavBar';

import { ref } from 'vue';

const toggleNav = ref(false);
 
</script>

<style>
</style>