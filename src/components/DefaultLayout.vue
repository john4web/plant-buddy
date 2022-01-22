<template>
    <div class="flex flex-col gap-5 p-5">
        <NavBar />
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
    name: 'DefaultLayout',
    components: { NavBar },
    setup() {
        return {};
    },
    methods: {},
});
</script>

<style scoped></style>
