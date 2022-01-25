<template>
    <button
        class="close-button flex flex-col justify-center items-center w-10 h-10 bg-grey rounded-full"
        @click="$emit('close')"
    >
        <span
            class="w-5 h-[0.2rem] absolute bg-navy rounded-full rotate-45"
        ></span>
        <span
            class="w-5 h-[0.2rem] absolute bg-navy rounded-full -rotate-45"
        ></span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CloseButton',
});
</script>
