<template>
  <div>
    <h1
      class="pl-2 mt-4 text-4xl font-bold text-center text-dark-300 dark:text-light sm:mt-0 sm:text-left"
    >
      {{ $t("auth.logIn") }}
    </h1>
    <h4 class="pl-2 mt-16 text-sm font-semibold text-dark-300 dark:text-light">
      {{ $t("auth.logIn") }} {{ $t("auth.authMessage") }}
    </h4>

    <div class="grid grid-cols-2 gap-6 mt-5">
      <button
        @click.prevent="authWithGoogle"
        class="px-6 py-3 transition ease-in shadow-inner rounded-xl bg-dark-300 text-light shadow-dark-100 hover:scale-105 focus:animate-bounce dark:bg-dark-50"
      >
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/google.svg" class="w-5 max-h-6" alt />
          <span class="hidden text-sm font-medium tracking-wide sm:block">{{
            $t("auth.signInGoogleButton")
          }}</span>
        </div>
      </button>
      <button
        @click.prevent="authWithFacebook"
        class="px-6 py-3 transition ease-in shadow-inner rounded-xl bg-dark-300 text-light shadow-dark-100 hover:scale-105 focus:animate-bounce dark:bg-dark-50"
      >
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/facebook.svg" class="w-6 max-h-7" alt />
          <span class="hidden text-sm font-medium tracking-wide sm:block">{{
            $t("auth.signInFacebookButton")
          }}</span>
        </div>
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="py-6 mt-3 space-y-6 sm:mt-5">
      <div>
        <label
          class="pl-2 text-sm font-semibold text-dark-300 dark:text-light"
          >{{ $t("auth.email") }}</label
        >
        <input
          name="email"
          type="email"
          v-model="userForm.email"
          :placeholder="$t('auth.emailPlaceholder')"
          class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-sm outline-none appearance-none rounded-xl bg-light text-dark-300 placeholder-dark-300 placeholder-opacity-60 shadow-dark-100 hover:scale-105 dark:bg-dark-50 dark:text-light dark:placeholder-light dark:placeholder-opacity-40 dark:shadow-inner"
          :class="{
            'shadow-md shadow-red-500 dark:shadow-md dark:shadow-red-400 ':
              v$.email.$error,
          }"
        />
        <div
          class="pt-2 pl-2 text-sm text-red-500 opacity-80 dark:text-red-400 dark:opacity-70"
          v-if="v$.email.$error"
        >
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>
      <div>
        <label
          class="pl-2 text-sm font-semibold text-dark-300 dark:text-light"
          >{{ $t("auth.password") }}</label
        >
        <input
          name="password"
          type="password"
          v-model="userForm.password"
          :placeholder="$t('auth.passwordPlaceholderLogin')"
          class="w-full px-6 py-3 pl-4 mt-1 text-sm transition border-red-100 shadow-sm outline-none appearance-none rounded-xl bg-light text-dark-300 placeholder-dark-300 placeholder-opacity-60 shadow-dark-100 hover:scale-105 dark:bg-dark-50 dark:text-light dark:placeholder-light dark:placeholder-opacity-40 dark:shadow-inner"
          :class="{
            'shadow-md shadow-red-500 dark:shadow-md dark:shadow-red-400':
              v$.password.$error,
          }"
        />
        <div
          class="pt-2 pl-2 text-sm text-red-500 opacity-80 dark:text-red-400 dark:opacity-70"
          v-if="v$.password.$error"
        >
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <div class="mt-2">
        <div
          class="pb-2 pl-2 text-sm text-red-500 opacity-80 dark:text-red-400 dark:opacity-70"
          v-if="errorMessage.message"
        >
          {{ errorMessage.message }}
        </div>
        <button
          type="submit"
          class="w-full px-6 py-3 transition rounded-xl bg-dark-300 hover:scale-105 dark:bg-golden dark:focus:animate-pulse"
        >
          <span class="font-semibold text-md dark:text-dark-300">{{
            $t("auth.logInButton")
          }}</span>
        </button>
      </div>
      <div
        class="text-sm text-center text-dark-300 dark:text-light dark:text-opacity-40"
      >
        <p>
          {{ $t("auth.noAccount") }}
          <a
            @click.prevent="router.push({ name: 'register' })"
            href
            class="font-bold cursor-pointer dark:text-light dark:text-opacity-100"
            >{{ $t("auth.signUp") }}</a
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, defineProps, watch } from "vue";
import useAuth from "../composables/useAuth";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useI18n } from "vue-i18n/index.mjs";

const props = defineProps(["language"]);

const { t } = useI18n();

const router = useRouter();

const { signInUser, signInWithGoogle, signInWithFacebook } = useAuth();

const userForm = reactive({ email: "", password: "" });

const errorMessage = reactive({
  code: "",
  message: "",
});

const rules = reactive({
  email: {
    required: helpers.withMessage(
      () => `${t("validations.required")}`,
      required
    ),
    email: helpers.withMessage(() => `${t("validations.email")} `, email),
  },
  password: {
    required: helpers.withMessage(
      () => `${t("validations.required")}`,
      required
    ),
  },
});

const v$ = useVuelidate(rules, userForm);

const authWithGoogle = async () => {
  const { ok, code } = await signInWithGoogle();

  if (!ok) {
    errorMessage.message = t(`auth.errorMessages.${code}`);
    errorMessage.code = code;
  } else router.push({ name: "reports" });
};

const authWithFacebook = async () => {
  const { ok, code } = await signInWithFacebook();

  if (!ok) {
    errorMessage.message = t(`auth.errorMessages.${code}`);
    errorMessage.code = code;
  } else router.push({ name: "reports" });
};

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) return;

  const { ok, code } = await signInUser(userForm);

  if (!ok) {
    errorMessage.message = t(`auth.errorMessages.${code}`);
    errorMessage.code = code;
  } else router.push({ name: "reports" });
};

watch(props.language, async () => {
  if (errorMessage.code != "") {
    errorMessage.message = t(`auth.errorMessages.${errorMessage.code}`);
  }
});
</script>
