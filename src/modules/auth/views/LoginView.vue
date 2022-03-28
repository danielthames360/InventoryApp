<template>
    <div class="flex justify-between h-screen m-auto sm:justify-center">
        <div class="relative w-full md:w-6/12 lg:w-5/12 xl:w-4/12">
            <div
                class="flex flex-col justify-center h-screen px-10 sm:px-16 md:px-4 lg:px-9 xl:px-12"
            >
                <a
                    href
                    class="text-4xl font-semibold text-center sm:text-left text-dark-300 dark:text-light"
                >{{ $t('auth.logIn') }}</a>
                <h4
                    class="mt-16 text-sm font-medium dark:text-light"
                >{{ $t('auth.logIn') }} {{ $t('auth.authMessage') }}</h4>

                <div class="grid gap-6 mt-5 sm:grid-cols-2">
                    <button
                        class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 dark:text-light dark:focus:animate-bounce"
                    >
                        <div class="flex justify-center gap-4">
                            <img
                                src="@/assets/images/google.svg"
                                class="self-center w-5 max-h-6"
                                alt
                            />
                            <span
                                class="block text-sm font-medium tracking-wide"
                            >{{ $t('auth.signInGoogleButton') }}</span>
                        </div>
                    </button>
                    <button
                        class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 dark:text-light dark:focus:animate-bounce"
                    >
                        <div class="flex justify-center gap-4">
                            <img
                                src="@/assets/images/facebook.svg"
                                class="self-center w-6 max-h-7"
                                alt
                            />
                            <span
                                class="block text-sm font-medium tracking-wide"
                            >{{ $t('auth.signInFacebookButton') }}</span>
                        </div>
                    </button>
                </div>

                <form action class="py-6 mt-5 space-y-6">
                    <div>
                        <label class="pl-2 text-sm">{{ $t('auth.email') }}</label>
                        <input
                            name="email"
                            type="email"
                            :placeholder="$t('auth.emailPlaceholder')"
                            class="w-full px-6 py-3 pl-4 mt-1 text-sm transition shadow-inner placeholder-opacity-40 placeholder-light shadow-dark-100 rounded-xl dark:bg-dark-50 dark:text-light hover:scale-105"
                        />
                    </div>
                    <div>
                        <label class="pl-2 text-sm">{{ $t('auth.password') }}</label>
                        <input
                            name="email"
                            type="email"
                            :placeholder="$t('auth.passwordPlaceholderLogin')"
                            class="w-full px-6 py-3 pl-4 mt-1 text-sm transition shadow-inner placeholder-opacity-40 placeholder-light shadow-dark-100 rounded-xl dark:bg-dark-50 dark:text-light hover:scale-105"
                        />
                    </div>

                    <div>
                        <button
                            class="w-full px-6 py-3 mt-2 transition rounded-xl dark:bg-golden dark:hover:scale-105 dark:focus:animate-bounce"
                        >
                            <span class="font-semibold text-md dark:text-dark-300">Login</span>
                        </button>
                    </div>
                    <div class="text-sm text-center dark:text-light dark:text-opacity-40">
                        <p>
                            {{ $t('auth.noAccount') }}
                            <span
                                class="cursor-pointer dark:text-light dark:text-opacity-100"
                            >{{ $t('auth.signUp') }}</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>

        <div hidden class="md:w-6/12 lg:w-7/12 xl:w-8/12 lg:block clip">
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

</script>
 
 <style scoped>
.clip {
    -webkit-clip-path: polygon(20% 0, 100% 0, 100% 100vh, 0 100%);
    clip-path: polygon(20% 0, 100% 0, 100% 100vh, 0 100%);
}
</style>