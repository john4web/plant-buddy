<template>
    <div class="flex justify-between gap-2 align-stretch">
        <select
            class="bg-grey p-2 rounded-lg grow"
            :value="modelValue.day"
            @input="
                $emit('update:modelValue', {
                    ...modelValue,
                    day: $event.target.value,
                })
            "
        >
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
        </select>
        <input
            class="bg-grey p-2 rounded-lg flex-none"
            type="time"
            :value="modelValue.time"
            @input="
                $emit('update:modelValue', {
                    ...modelValue,
                    time: $event.target.value,
                })
            "
        />
        <close-button @close="$emit('delete')" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseButton from '@/components/CloseButton.vue';

export default defineComponent({
    name: 'NotificationInput',
    components: { CloseButton },
    props: {
        modelValue: {
            type: Object,
        },
    },
});
</script>

<style scoped>
select {
    flex-grow: 1;
}
</style>
