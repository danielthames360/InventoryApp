<template>
    <!-- Mobile Menu toggle -->
    <button
        @click="sidebar.navOpen = !sidebar.navOpen"
        class="absolute sm:hidden top-5 right-5 focus:outline-none"
    >
        <MenuToggleIcon class="w-6 h-6 fill-light" :class="sidebar.navOpen ? 'hidden' : ''" />
        <CloseIcon class="w-6 h-6 fill-light" :class="sidebar.navOpen ? '' : 'hidden'" />
    </button>

    <div
        class="absolute h-screen transition-all duration-500 ease-in-out dark:bg-dark-50 bg-dark-default"
        :class="{ 'w-52': sidebar.full, 'w-64 sm:w-20': !sidebar.full, 'top-0 left-0': sidebar.navOpen, 'top-0 -left-64 sm:left-0 ': !sidebar.navOpen }"
    >
        <!-- Sidebar toggle-->
        <button
            class="absolute hidden rounded-full shadow-md -z-10 bg-dark-50 sm:block -right-[15px] top-10"
        >
            <AngleRightIcon
                @click="sidebar.full = !sidebar.full"
                class="w-6 h-6 text-white transition-all duration-500 transform fill-light"
                :class="sidebar.full ? 'rotate-180' : '-rotate-360 pl-1'"
            />
        </button>
        <h1
            class="pt-5 pb-10 font-black transition-all duration-300 ease hover:dark:text-golden"
            :class="sidebar.full ? 'text-2xl px-4' : 'text-xl px-4 xm:px-2'"
        >{{ sidebar.full ? $t("dashboard.title") : $t('dashboard.title').substring(0, 4) }}</h1>
        <div class="px-4 space-y-2">
            <!-- Nav Items -->
            <template v-for="navigation in navigationList" :key="navigation.name">
                <div
                    @mouseover="navigation.showTooltip = true"
                    @mouseleave="navigation.showTooltip = false"
                    class="relative flex items-center p-2 space-x-2 transition-colors duration-300 rounded-md cursor-pointer hover:text-golden hover:bg-gray-800 hover:animate-bounce"
                    :class="{ 'justify-start': sidebar.full, 'sm:justify-center': !sidebar.full }"
                >
                    <component class="w-6 h-6 fill-light" :is="getIcon(navigation.icon)"></component>
                    <h1
                        :class="(!sidebar.full && navigation.showTooltip) ? tooltipClass : '' || (!sidebar.full && !navigation.showTooltip) ? 'sm:hidden' : ''"
                    >{{ navigation.name }}</h1>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>

import HomeIcon from '@/assets/icons/HomeIcon';
import AngleRightIcon from '@/assets/icons/AngleRightIcon';
import SalesIcon from '@/assets/icons/SalesIcon';
import PurchasesIcon from '@/assets/icons/PurchasesIcon';
import MenuToggleIcon from '@/assets/icons/MenuToggleIcon';
import CloseIcon from '@/assets/icons/CloseIcon';

import { useI18n } from 'vue-i18n/index'

import { ref } from 'vue';

const { t } = useI18n() // use as global scope


const sidebar = ref({
    full: false,
    active: 'home',
    navOpen: false
})

const tooltipClass = 'block sm:absolute -top-1 sm:px-2 sm:bg-dark-default border-gray-800 left-7 sm:text-sm sm:bg-gray-900 sm:px2 sm:py-1 sm:rounded z-1';

const navigationList = ref([
    {
        name: t('dashboard.nav.home'),
        icon: 'HomeIcon',
        showTooltip: false,
    },
    {
        name: t('dashboard.nav.sales'),
        icon: 'SalesIcon',
        showTooltip: false,
    },
    {
        name: t('dashboard.nav.purchases'),
        icon: 'PurchasesIcon',
        showTooltip: false,
    }
])

const icons = [
    { name: 'HomeIcon', component: HomeIcon }, { name: 'SalesIcon', component: SalesIcon }, { name: 'PurchasesIcon', component: PurchasesIcon }
]

const getIcon = (name) => {
    return icons.find((el) => el.name == name).component;
}


</script>

<style lang="scss" scoped>
</style>