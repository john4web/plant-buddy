<template>
    <div class="p-5nod">
        <div class="flex justify-end items-center">
            <button class="outline-none" @click="$router.back()">
                <div class="h-8 w-8 relative close-button">
                    <span
                        class="block absolute w-5 h-1 bg-navy rounded-full top-2"
                    ></span>
                    <span
                        class="block absolute w-8 h-1 bg-navy rounded-full top-5"
                    ></span>
                </div>
            </button>
        </div>

        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OverlayLayout',
    setup() {
        return {};
    },
    methods: {},
});
</script>

<style scoped>
.close-button span {
    width: 2rem;
    top: 0.875rem;
}

.close-button span:nth-child(1) {
    transform: rotate(45deg);
}

.close-button span:nth-child(2) {
    transform: rotate(-45deg);
}

.close-button {
    background-color: #e8e8e8;
    outline: 8px solid #e8e8e8;
    border-radius: 50%;
}
</style>
