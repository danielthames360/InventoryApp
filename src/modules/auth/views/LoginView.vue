<template>
    <h1
        class="pl-2 mt-4 text-4xl font-bold text-center sm:mt-0 sm:text-left text-dark-300 dark:text-light"
    >{{ $t('auth.logIn') }}</h1>
    <h4
        class="pl-2 mt-16 text-sm font-semibold dark:text-light text-dark-300"
    >{{ $t('auth.logIn') }} {{ $t('auth.authMessage') }}</h4>

    <div class="grid grid-cols-2 gap-6 mt-5">
        <button
            class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 bg-dark-300 text-light focus:animate-bounce"
        >
            <div class="flex justify-center gap-4">
                <img src="@/assets/images/google.svg" class="self-center w-5 max-h-6" alt />
                <span
                    class="hidden text-sm font-medium tracking-wide sm:block"
                >{{ $t('auth.signInGoogleButton') }}</span>
            </div>
        </button>
        <button
            class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 bg-dark-300 text-light focus:animate-bounce"
        >
            <div class="flex justify-center gap-4">
                <img src="@/assets/images/facebook.svg" class="self-center w-6 max-h-7" alt />
                <span
                    class="hidden text-sm font-medium tracking-wide sm:block"
                >{{ $t('auth.signInFacebookButton') }}</span>
            </div>
        </button>
    </div>
    <form @submit.prevent="onSubmit" class="py-6 mt-3 space-y-6 sm:mt-5">
        <div>
            <label
                class="pl-2 text-sm font-semibold dark:text-light text-dark-300"
            >{{ $t('auth.email') }}</label>
            <input
                name="email"
                v-model="userForm.email"
                :placeholder="$t('auth.emailPlaceholder')"
                class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-inner dark:placeholder-opacity-40 placeholder-opacity-60 dark:placeholder-light placeholder-dark-300 shadow-dark-100 rounded-xl bg-light dark:bg-dark-50 dark:text-light text-dark-300 hover:scale-105"
                :class="{ 'dark:shadow-red-400 shadow-red-500 shadow-md ': v$.email.$error }"
            />
            <div
                class="pt-2 pl-2 text-sm text-red-500 dark:text-red-400 dark:opacity-70 opacity-80"
                v-if="v$.email.$error"
            >{{ v$.email.$errors[0].$message }}</div>
        </div>
        <div>
            <label
                class="pl-2 text-sm font-semibold dark:text-light text-dark-300"
            >{{ $t('auth.password') }}</label>
            <input
                name="password"
                type="password"
                v-model="userForm.password"
                :placeholder="$t('auth.passwordPlaceholderLogin')"
                class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-inner placeholder-opacity-60 dark:placeholder-opacity-40 dark:placeholder-light placeholder-dark-300 shadow-dark-100 rounded-xl bg-light dark:bg-dark-50 dark:text-light text-dark-300 hover:scale-105"
                :class="{ 'dark:shadow-red-400 shadow-red-500 shadow-md': v$.password.$error }"
            />
            <div
                class="pt-2 pl-2 text-sm text-red-500 dark:text-red-400 dark:opacity-70 opacity-80"
                v-if="v$.password.$error"
            >{{ v$.password.$errors[0].$message }}</div>
        </div>

        <div>
            <button
                type="submit"
                class="w-full px-6 py-3 mt-2 transition rounded-xl bg-dark-300 dark:bg-golden hover:scale-105 dark:focus:animate-pulse"
            >
                <span class="font-semibold text-md dark:text-dark-300">{{ $t('auth.logInButton') }}</span>
            </button>
        </div>
        <div class="text-sm text-center dark:text-light text-dark-300 dark:text-opacity-40">
            <p>
                {{ $t('auth.noAccount') }}
                <a
                    href
                    class="font-bold cursor-pointer dark:text-light dark:text-opacity-100"
                >{{ $t('auth.signUp') }}</a>
            </p>
        </div>
    </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import useAuth from "../composables/useAuth";
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n/index'


const { t } = useI18n({ useScope: 'global' })

const router = useRouter();

const { signInUser } = useAuth();

const userForm = reactive({ email: "", password: "" });

const rules = computed(() => ({
    email: {
        required: helpers.withMessage(`${t('validations.required')}`, required),
        email: helpers.withMessage(`${t('validations.email')} `, email),

    },
    password: {
        required: helpers.withMessage(`${t('validations.required')}`, required),
        minLength: helpers.withMessage(
            ({
                $params,
            }) => `${t('validations.minLength')} ${$params.min} ${t('validations.characters')} `,
            minLength(6)
        )
    },
}))

const v$ = useVuelidate(rules, userForm)


const onSubmit = async () => {
    const isFormCorrect = await v$.value.$validate()

    // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
    if (!isFormCorrect) return
    // actually submit form

    const { ok, message } = await signInUser(userForm);

    if (!ok) console.log("Error!", message, "error");
    else router.push({ name: "reports" });
};

</script>
 
