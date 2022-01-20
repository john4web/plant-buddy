<template>
    <DefaultLayout>
        <div class="text-navy">
            <h1>My Garden</h1>
            <div>All your beloved green buddies in one place.</div>
            <router-link to="/new-buddy" class="button"
                >+ Add new Buddy</router-link
            >
            <PlantList />
        </div>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PlantList from '@/components/PlantList.vue';
import DefaultLayout from '@/components/DefaultLayout.vue';
export default defineComponent({
    name: 'MyGarden',
    components: {
        PlantList,
        DefaultLayout,
    },
});
</script>
