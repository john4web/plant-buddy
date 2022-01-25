<template>
    <div class="p-5 flex flex-col gap-5">
        <close-button class="self-end" @close="$router.back()" />
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseButton from '@/components/CloseButton.vue';

export default defineComponent({
    name: 'OverlayLayout',
    components: { CloseButton },
    setup() {
        return {};
    },
    methods: {},
});
</script>
