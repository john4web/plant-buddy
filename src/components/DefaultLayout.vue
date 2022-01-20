<template>
    <div>
        <NavBar />
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
