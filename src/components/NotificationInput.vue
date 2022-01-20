<template>
    <div>
        <div>
            <select
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
        </div>
        <div>
            <input
                type="time"
                :value="modelValue.time"
                @input="
                    $emit('update:modelValue', {
                        ...modelValue,
                        time: $event.target.value,
                    })
                "
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotificationInput',

    methods: {
        updateValue: function (value: number) {
            this.$emit('input', value);
        },
    },
    props: {
        modelValue: {
            type: Object,
        },
    },
});
</script>

<style scoped></style>
