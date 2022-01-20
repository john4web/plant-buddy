<template>
    <DefaultLayout>
        <div>
            <h1>This is the home page</h1>
        </div>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/components/DefaultLayout.vue';

export default defineComponent({
    name: 'Home',
    components: {
        DefaultLayout,
    },
});
</script>
