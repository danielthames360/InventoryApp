<template>
    <div>
        <transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div
                class="fixed inset-0 z-10 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
                v-show="props.modal"
            >
                <div
                    class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                >
                    <div
                        class="fixed inset-0 transition-opacity bg-black bg-opacity-80"
                        aria-hidden="true"
                    ></div>

                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span
                        class="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >&#8203;</span>

                    <transition
                        enter-active-class="duration-300 ease-ouy"
                        enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
                        leave-active-class="duration-200 ease-in"
                        leave-from-class="translate-y-0 opacity-100 sm:scale-100"
                        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            v-show="props.modal"
                            class="relative inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-md shadow-golden bg-dark-300 dark:bg-dark-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        >
                            <div class="px-4 pt-5 pb-4 bg-dark-100 dark:bg-dark-300 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto transition-all rounded-full dark:bg-dark-100 dark:shadow-sm dark:shadow-red-400 sm:mx-0 sm:h-10 sm:w-10"
                                    >
                                        <svg
                                            class="w-6 h-6 shadow-sm animate-pulse dark:text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            class="text-lg font-medium leading-6 dark:text-light"
                                            id="modal-title"
                                        >{{ title }}</h3>
                                        <div class="mt-3">
                                            <p
                                                class="text-sm opacity-75 dark:text-light"
                                            >{{ message }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-center px-4 text-center py-7 bg-dark-300 dark:bg-dark-00 sm:px-6"
                            >
                                <button
                                    @click="$emit('closeModal')"
                                    type="button"
                                    class="px-4 py-2 mt-3 transition rounded-xl bg-dark-300 dark:bg-red-500 opacity-80 hover:scale-105 dark:focus:animate-pulse sm:ml-3 sm:w-auto hover:opacity-100"
                                >
                                    <span class="text-sm font-medium dark:text-light">Cancel</span>
                                </button>
                                <button
                                    @click="$emit('confirmModal')"
                                    type="button"
                                    class="px-4 py-2 mt-3 transition rounded-xl bg-dark-300 dark:bg-golden opacity-80 hover:scale-105 dark:focus:animate-pulse sm:ml-5 sm:w-auto hover:opacity-100"
                                >
                                    <span class="text-sm font-medium dark:text-dark-300">Continuar</span>
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    modal: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String },
})


</script>
 