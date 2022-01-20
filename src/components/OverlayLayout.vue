<template>
    <div>
        <button @click="$router.back()">X</button>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'OverlayLayout',
    setup() {
        return {};
    },
    methods: {},
});
</script>

<style scoped></style>
