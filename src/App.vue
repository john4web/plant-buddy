<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'App',
    setup() {
        const menuIsOpen = ref(false);
        const route = useRoute();

        return { route, menuIsOpen };
    },
    methods: {
        toggleMenu() {
            this.menuIsOpen = !this.menuIsOpen;
        },
    },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
