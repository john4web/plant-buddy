<template>
    <DefaultLayout>
        <div>
            <h1>404 Not Found!</h1>
        </div>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/components/DefaultLayout.vue';

export default defineComponent({
    name: 'NotFound',
    components: { DefaultLayout },
});
</script>
