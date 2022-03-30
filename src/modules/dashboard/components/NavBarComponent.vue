<template>
    <!-- Mobile Menu toggle -->

    <button
        @click="sidebar.navOpen = !sidebar.navOpen"
        class="absolute sm:hidden top-5 right-5 focus:outline-none"
    >
        <MenuToggleIcon
            class="w-6 h-6 dark:fill-light fill-dark-300"
            :class="sidebar.navOpen ? 'hidden' : ''"
        />
        <CloseIcon
            class="w-6 h-6 dark:fill-light fill-dark-300"
            :class="sidebar.navOpen ? '' : 'hidden'"
        />
    </button>

    <div
        class="absolute h-full min-h-[-webkit-fill-available] transition-all duration-500 ease-in-out md:relative dark:bg-dark-100 bg-dark"
        :class="{ 'w-52': sidebar.full, 'w-64 sm:w-20': !sidebar.full, 'top-0 left-0': sidebar.navOpen, 'top-0 -left-64 sm:left-0 ': !sidebar.navOpen }"
    >
        <!-- Sidebar toggle-->
        <button
            class="absolute hidden rounded-full shadow-md -z-10 bg-dark-100 sm:block -right-[15px] top-10"
        >
            <AngleRightIcon
                @click="sidebar.full = !sidebar.full"
                class="w-6 h-6 text-white transition-all duration-500 transform fill-light"
                :class="sidebar.full ? 'rotate-180' : '-rotate-360 pl-1'"
            />
        </button>
        <h1
            @click="navigateTo('reports')"
            class="pt-5 font-black transition-all duration-300 cursor-pointer pb-14 ease text-light hover:text-golden"
            :class="sidebar.full ? 'text-2xl px-4' : 'text-xl px-4 xm:px-2'"
        >{{ sidebar.full || sidebar.navOpen ? $t("dashboard.title") : $t('dashboard.title').substring(0, 4) }}</h1>
        <div class="px-4 space-y-4">
            <!-- Nav Items -->
            <div
                v-for="navigation in navigationList"
                :key="navigation.name"
                v-memo="[navigation.showTooltip, sidebar.active, sidebar.full, language]"
            >
                <div
                    @click="navigateTo(navigation.route)"
                    @mouseenter="!sidebar.full && !sidebar.navOpen ? navigation.showTooltip = true : false;"
                    @mouseleave="navigation.showTooltip = false"
                    class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden hover:animate-bounce"
                    :class="{
                        'justify-start': sidebar.full, 'sm:justify-center': !sidebar.full,
                        'text-dark-300 bg-golden': sidebar.active == navigation.route,
                        'hover:text-dark-300': (sidebar.active == navigation.route && sidebar.full)
                    }"
                >
                    <component
                        class="w-6 h-6"
                        :class="{
                            'fill-light': sidebar.active != navigation.route,
                            'fill-dark-300': sidebar.active == navigation.route,
                        }"
                        :is="getIcon(navigation.icon)"
                    ></component>
                    <h1
                        :class="(!sidebar.full && navigation.showTooltip) ? tooltips.class : '' || (!sidebar.full && !navigation.showTooltip) ? 'sm:hidden' : ''"
                    >{{ $t(navigation.name) }}</h1>
                </div>
            </div>
        </div>

        <div class="absolute flex flex-col px-4 space-y-4 bottom-10">
            <div
                @mouseenter="tooltips.userTooltip = true"
                @mouseleave="tooltips.userTooltip = false"
                @click="modal = true"
                class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden"
                :class="{ 'justify-start': sidebar.full, 'sm:justify-center': !sidebar.full }"
            >
                <UserIcon class="w-6 h-6 fill-light" />

                <h1
                    :class="(!sidebar.full && tooltips.userTooltip) ? tooltips.class : '' || (!sidebar.full && !tooltips.userTooltip) ? 'sm:hidden' : ''"
                >{{ $t('dashboard.nav.logout') }}</h1>
            </div>

            <div
                @mouseenter="tooltips.languageTooltip = true"
                @mouseleave="tooltips.languageTooltip = false"
                @click="toggleLanguage"
                class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden"
                :class="{ 'justify-start': sidebar.full, 'sm:justify-center': !sidebar.full }"
            >
                <SpainFlagIcon class="w-6 h-6 fill-light" v-if="(language != 'es')" />
                <EnglishFlagIcon class="w-6 h-6 fill-light" v-else />

                <h1
                    :class="(!sidebar.full && tooltips.languageTooltip) ? tooltips.class : '' || (!sidebar.full && !tooltips.languageTooltip) ? 'sm:hidden' : ''"
                >{{ (language != 'es') ? $t('dashboard.nav.spanish') : $t('dashboard.nav.english') }}</h1>
            </div>

            <div
                @mouseenter="tooltips.darkModeTooltip = true"
                @mouseleave="tooltips.darkModeTooltip = false"
                @click="toggleDarkMode"
                class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden animate-pulse"
                :class="{ 'justify-start': sidebar.full, 'sm:justify-center': !sidebar.full }"
            >
                <NightIcon class="w-6 h-6 fill-light" v-if="!getDarkModeStatus" />
                <LightIcon class="w-6 h-6 fill-light" v-else />

                <h1
                    :class="(!sidebar.full && tooltips.darkModeTooltip) ? tooltips.class : '' || (!sidebar.full && !tooltips.darkModeTooltip) ? 'sm:hidden' : ''"
                >{{ !getDarkModeStatus ? $t('dashboard.nav.darkMode') : $t('dashboard.nav.lightMode') }}</h1>
            </div>
        </div>
    </div>
    <ModalComponent
        :modal="modal"
        :title="$t('modal.logout')"
        :message="$t('modal.unconfirmedChanges')"
        @closeModal="modal = false"
        @confirmModal="logout"
    />
</template>

<script setup>

import UserIcon from '@/assets/icons/UserIcon';
import HomeIcon from '@/assets/icons/HomeIcon';
import AngleRightIcon from '@/assets/icons/AngleRightIcon';
import SalesIcon from '@/assets/icons/SalesIcon';
import PurchasesIcon from '@/assets/icons/PurchasesIcon';
import MenuToggleIcon from '@/assets/icons/MenuToggleIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import LightIcon from '@/assets/icons/LightIcon';
import NightIcon from '@/assets/icons/NightIcon';
import EnglishFlagIcon from '@/assets/icons/EnglishFlagIcon';
import SpainFlagIcon from '@/assets/icons/SpainFlagIcon';

import ModalComponent from '../components/ModalComponent';

import { ref, reactive, computed, defineProps, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n/index'


//Instances
const { locale } = useI18n() // use as global scope
const router = useRouter()
const store = useStore()

//Props
const props = defineProps(['toggleNavSide'])

//Objects and primitives
const modal = ref(false)
const icons = [
    { name: 'HomeIcon', component: HomeIcon }, { name: 'SalesIcon', component: SalesIcon }, { name: 'PurchasesIcon', component: PurchasesIcon }
]
const navigationList = ref([
    {
        name: 'dashboard.nav.home',
        icon: 'HomeIcon',
        showTooltip: false,
        route: 'reports'
    },
    {
        name: 'dashboard.nav.sales',
        icon: 'SalesIcon',
        showTooltip: false,
        route: 'sales'
    },
    {
        name: 'dashboard.nav.purchases',
        icon: 'PurchasesIcon',
        showTooltip: false,
        route: 'purchases'
    }
])
const sidebar = ref({
    full: false,
    active: router.currentRoute.value.name,
    navOpen: false
})
const tooltips = reactive({
    darkModeTooltip: false,
    languageTooltip: false,
    userTooltip: false,
    class: 'w-max block sm:absolute top-3 sm:px-2 left-10 sm:text-sm bg-dark-100 sm:rounded z-1'
})

//methods
const getDarkModeStatus = computed(() =>
    store.getters['global/getDarkModeStatus'])

const language = computed(() =>
    store.getters['getLanguage'])


const closeSideBar = () => {
    sidebar.value.navOpen = false;
    sidebar.value.full = false;
}
const getIcon = (name) => {
    return icons.find((el) => el.name == name).component;
}
const navigateTo = (routeName) => {
    router.push({ name: routeName });
    sidebar.value.active = routeName
    if (sidebar.value.navOpen && !sidebar.value.full) {
        sidebar.value.navOpen = false;
        sidebar.value.full = false;
    }

}
const toggleDarkMode = () => {
    store.commit('global/toggleDarkMode');
    closeSideBar()
}
const toggleLanguage = () => {
    store.commit('global/toggleLanguage');

    locale.value = (locale.value == "es") ? "en" : "es";
    closeSideBar()
}
const logout = async () => {
    const { ok } = await store.dispatch('auth/logout')
    if (ok) return console.log('error al salir');
    router.push({ name: 'login' })
}

//Watchers
watchEffect(() => {
    props.toggleNavSide;
    closeSideBar()
})

</script>
 