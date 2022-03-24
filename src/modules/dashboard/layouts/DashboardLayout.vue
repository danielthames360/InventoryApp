<template>
  <div class="flex justify-between h-screen mx-auto antialiased">
    <div class="fixed h-screen dark:bg-dark-50 bg-dark-default">
      <h1
        class="py-4 font-black transition-colors duration-300 hover:dark:text-golden"
      >
        {{ $t("dashboard.title") }}
      </h1>
      <div class="px-4 space-y-2">
        <!-- Home -->
        <div
          class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden hover:bg-gray-800"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>