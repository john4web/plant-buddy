<template>
    <div class="flex gap-3">
        <span
            v-for="(_, i) in 5"
            :key="i"
            class="bg-grey w-7 h-7 rounded-full border-white border-4 outline-black"
            :class="`${i < amount ? color : ''}`"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AmountIndicator',
    props: {
        amount: {
            type: Number,
            default: 0,
        },

        color: {
            type: String,
        },
    },
});
</script>
