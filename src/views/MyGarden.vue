<template>
    <DefaultLayout>
        <div class="flex gap-5 z-10">
            <div>
                <h1>My Garden</h1>
                <p>All your beloved green buddies in one place.</p>
            </div>
            <router-link to="/new-buddy" class="button button--round">
                <span>+</span>
            </router-link>
        </div>
        <template v-if="isLoading"> ... loading </template>
        <div
            v-else-if="plants.length === 0"
            class="flex flex-col items-center text-center py-10 gap-3 bg-grey rounded-3xl"
        >
            <img
                src="../assets/plant-icon.png"
                alt="plant icon"
                class="w-[20vw] opacity-30"
            />
            <h3>No plants yet?</h3>
            <router-link to="/new-buddy" class="button button--blue w-[50vw]"
                >Add a buddy</router-link
            >
        </div>
        <ul v-else class="grid grid-cols-2 gap-4">
            <plant-card
                v-for="plant in plants"
                :plant="plant"
                :key="plant.id"
            />
        </ul>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useList } from '@/composables/resource-list';
import PlantService from '@/services/PlantService';

import DefaultLayout from '@/components/DefaultLayout.vue';
import PlantCard from '@/components/PlantCard.vue';

export default defineComponent({
    name: 'MyGarden',
    components: {
        PlantCard,
        DefaultLayout,
    },
    setup() {
        const plantName = ref('');
        const {
            data: plants,
            getList: getPlantList,
            isLoading,
        } = useList(PlantService);

        getPlantList();

        return {
            getPlantList,
            plantName,
            plants,
            isLoading,
        };
    },
});
</script>
