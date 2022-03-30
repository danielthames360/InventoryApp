<template>
    <div>
        <h1
            class="pl-2 mt-4 text-4xl font-bold text-center sm:mt-0 sm:text-left text-dark-300 dark:text-light"
        >{{ $t('auth.signUp') }}</h1>
        <h4
            class="pl-2 mt-16 text-sm font-semibold dark:text-light text-dark-300"
        >{{ $t('auth.signUp') }} {{ $t('auth.authMessage') }}</h4>

        <div class="grid grid-cols-2 gap-6 mt-5">
            <button
                @click.prevent="authWithGoogle"
                class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 bg-dark-300 text-light focus:animate-bounce"
            >
                <div class="flex items-center justify-center gap-4">
                    <img src="@/assets/images/google.svg" class="w-5 max-h-6" alt />
                    <span
                        class="hidden text-sm font-medium tracking-wide sm:block"
                    >{{ $t('auth.signInGoogleButton') }}</span>
                </div>
            </button>
            <button
                @click.prevent="authWithFacebook"
                class="px-6 py-3 transition ease-in shadow-inner hover:scale-105 shadow-dark-100 rounded-xl dark:bg-dark-50 bg-dark-300 text-light focus:animate-bounce"
            >
                <div class="flex items-center justify-center gap-4">
                    <img src="@/assets/images/facebook.svg" class="w-6 max-h-7" alt />
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
                >{{ $t('auth.name') }}</label>
                <input
                    name="name"
                    v-model="userForm.name"
                    type="text"
                    :placeholder="$t('auth.namePlaceholder')"
                    class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-sm outline-none dark:shadow-inner dark:placeholder-opacity-40 placeholder-opacity-60 dark:placeholder-light placeholder-dark-300 shadow-dark-100 rounded-xl bg-light dark:bg-dark-50 dark:text-light text-dark-300 hover:scale-105"
                    :class="{ 'dark:shadow-red-400 shadow-red-500 shadow-md dark:shadow-md ': v$.name.$error }"
                />
                <div
                    class="pt-2 pl-2 text-sm text-red-500 dark:text-red-400 dark:opacity-70 opacity-80"
                    v-if="v$.name.$error"
                >{{ v$.name.$errors[0].$message }}</div>
            </div>
            <div>
                <label
                    class="pl-2 text-sm font-semibold dark:text-light text-dark-300"
                >{{ $t('auth.email') }}</label>
                <input
                    name="email"
                    type="email"
                    v-model="userForm.email"
                    :placeholder="$t('auth.emailPlaceholder')"
                    class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-sm outline-none dark:shadow-inner dark:placeholder-opacity-40 placeholder-opacity-60 dark:placeholder-light placeholder-dark-300 shadow-dark-100 rounded-xl bg-light dark:bg-dark-50 dark:text-light text-dark-300 hover:scale-105"
                    :class="{ 'dark:shadow-red-400 shadow-red-500 shadow-md dark:shadow-md ': v$.email.$error }"
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
                    :placeholder="$t('auth.passwordPlaceholder')"
                    class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-sm outline-none dark:shadow-inner placeholder-opacity-60 dark:placeholder-opacity-40 dark:placeholder-light placeholder-dark-300 shadow-dark-100 rounded-xl bg-light dark:bg-dark-50 dark:text-light text-dark-300 hover:scale-105"
                    :class="{ 'dark:shadow-red-400 shadow-red-500 shadow-md dark:shadow-md': v$.password.$error }"
                />
                <div
                    class="pt-2 pl-2 text-sm text-red-500 dark:text-red-400 dark:opacity-70 opacity-80"
                    v-if="v$.password.$error"
                >{{ v$.password.$errors[0].$message }}</div>
            </div>

            <div class="mt-2">
                <div
                    class="pb-2 pl-2 text-sm text-red-500 dark:text-red-400 dark:opacity-70 opacity-80"
                    v-if="errorMessage.message"
                >{{ errorMessage.message }}</div>
                <button
                    type="submit"
                    class="w-full px-6 py-3 transition rounded-xl bg-dark-300 dark:bg-golden hover:scale-105 dark:focus:animate-pulse"
                >
                    <span
                        class="font-semibold text-md dark:text-dark-300"
                    >{{ $t('auth.signInButton') }}</span>
                </button>
            </div>
            <div class="text-sm text-center dark:text-light text-dark-300 dark:text-opacity-40">
                <p>
                    {{ $t('auth.alreadyAccount') }}
                    <a
                        @click.prevent="router.push({ name: 'login' })"
                        href
                        class="font-bold cursor-pointer dark:text-light dark:text-opacity-100"
                    >{{ $t('auth.logIn') }}</a>
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, defineProps, watch } from "vue";
import useAuth from "../composables/useAuth";
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n/index'


const props = defineProps(['language'])

const { t } = useI18n()

const router = useRouter();

const { createUser, signInWithGoogle, signInWithFacebook } = useAuth();

const userForm = reactive({ name: "", email: "", password: "" });

const errorMessage = reactive({
    code: '',
    message: ''
});

const rules = reactive({
    name: {
        required: helpers.withMessage(() => `${t('validations.required')}`, required),
        minLength: helpers.withMessage(({ $params }) => `${t('validations.minLength')} ${$params.min} ${t('validations.characters')}`, minLength(8))
    },
    email: {
        required: helpers.withMessage(() => `${t('validations.required')}`, required),
        email: helpers.withMessage(() => `${t('validations.email')} `, email)
    },
    password: {
        required: helpers.withMessage(() => `${t('validations.required')}`, required),
        minLength: helpers.withMessage(({ $params }) => `${t('validations.minLength')} ${$params.min} ${t('validations.characters')}`, minLength(8))
    },
})

const v$ = useVuelidate(rules, userForm)


const onSubmit = async () => {
    const isFormCorrect = await v$.value.$validate()

    if (!isFormCorrect) return

    const { ok, code } = await createUser(userForm);

    if (!ok) {
        errorMessage.message = t(`auth.errorMessages.${code}`)
        errorMessage.code = code
    }
    else router.push({ name: "reports" });
};

const authWithGoogle = async () => {
    const { ok, code } = await signInWithGoogle();

    if (!ok) {
        errorMessage.message = t(`auth.errorMessages.${code}`)
        errorMessage.code = code
    }
    else router.push({ name: "reports" });
};

const authWithFacebook = async () => {
    const { ok, code } = await signInWithFacebook();

    if (!ok) {
        errorMessage.message = t(`auth.errorMessages.${code}`)
        errorMessage.code = code
    }
    else router.push({ name: "reports" });
};

watch(props.language, async () => {
    if (errorMessage.code != '') {
        errorMessage.message = t(`auth.errorMessages.${errorMessage.code}`)
    }
})

</script>
 
