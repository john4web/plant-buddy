<template>
    <nav class="bg-white">
        <div class="max-w-6xl mx-auto">
            <div class="flex justify-start md:justify-center">
                <div class="flex space-x-7">
                    <!-- Desktop Navbar items -->
                    <div
                        class="hidden md:flex items-center space-x-1 text-navy"
                    >
                        <router-link to="/" class="py-4 px-2 font-semibold"
                            >Home</router-link
                        >
                        <router-link
                            to="/my-garden"
                            class="py-4 px-2 font-semibold"
                            >My Garden</router-link
                        >
                        <router-link
                            to="/new-buddy"
                            class="py-4 px-2 font-semibold"
                            >New Buddy</router-link
                        >
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center py-4 px-2">
                    <button class="outline-none" @click="toggleMenu">
                        <div
                            class="h-8 w-8 relative transition-all ease-in-out duration-200"
                            :class="{ 'menu__button--open': menuIsOpen }"
                        >
                            <span
                                class="block absolute w-5 h-1 bg-navy rounded-full top-2 transition-all ease-in-out duration-200"
                            ></span>
                            <span
                                class="block absolute w-8 h-1 bg-navy rounded-full top-5 transition-all ease-in-out duration-200"
                            ></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <!-- mobile menu -->
        <div
            :class="{ hidden: !menuIsOpen }"
            class="w-screen h-[calc(100vh-5rem)] z-20 fixed text-navy bg-white text-xl flex flex-col justify-between transition-all ease-in-out duration-200"
        >
            <ul class="mt-6">
                <li>
                    <router-link
                        @click="toggleMenu"
                        to="/"
                        class="p-4 inline-block mb-2 text-3xl font-bold"
                        >Home</router-link
                    >
                </li>
                <li>
                    <router-link
                        @click="toggleMenu"
                        to="/my-garden"
                        class="p-4 inline-block mb-2 text-3xl font-bold"
                        >My Garden</router-link
                    >
                </li>
                <li>
                    <router-link
                        @click="toggleMenu"
                        to="/new-buddy"
                        class="p-4 inline-block mb-2 text-3xl font-bold"
                        >New Buddy</router-link
                    >
                </li>
            </ul>
            <ul class="mb-6 text-xl">
                <li class="mb-2">
                    <router-link
                        @click="toggleMenu"
                        to="/settings"
                        class="inline-block underline"
                        >Settings</router-link
                    >
                </li>
                <li
                    class="mb-2 text-xl inline-block underline cursor-pointer"
                    @click="
                        toggleMenu();
                        logout();
                    "
                >
                    Logout
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthService from '@/services/AuthService';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'App',
    setup() {
        const menuIsOpen = ref(false);
        const router = useRouter();

        const logout = () => {
            AuthService.logout();

            router.push({ name: 'Authenticate' });
        };

        const toggleMenu = () => {
            menuIsOpen.value = !menuIsOpen.value;
        };

        return {
            menuIsOpen,
            logout,
            toggleMenu,
        };
    },
    methods: {},
});
</script>

<style scoped>
.router-link-exact-active {
    background-color: #d0e1da;
    border-radius: 10px;
}

@media (min-width: 768px) {
    .router-link-exact-active {
        border-bottom: 4px solid #d0e1da;
        background-color: white;
        border-radius: 0;
    }
}

.menu__button--open span {
    width: 2rem;
    top: 0.875rem;
}

.menu__button--open span:nth-child(1) {
    transform: rotate(45deg);
}

.menu__button--open span:nth-child(2) {
    transform: rotate(-45deg);
}

.menu__button--open {
    background-color: #e8e8e8;
    outline: 8px solid #e8e8e8;
    border-radius: 50%;
}
</style>
