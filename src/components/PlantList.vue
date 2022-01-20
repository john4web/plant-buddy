<template>
    <h2 class="font-bold">List of plants</h2>
    <ul>
        <li v-for="(plant, index) in plants" :key="index">
            <router-link to="/buddy-detail/qU11BuBV9a8LBKlKYJiN">
                {{ plant.name }} - {{ plant.type }}</router-link
            >
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useList } from '@/composables/resource-list';
import PlantService from '@/services/PlantService';

export default defineComponent({
    name: 'PlantList',
    setup() {
        const plantName = ref('');
        const {
            data: plants,
            getList: getPlantList,
            isLoading,
        } = useList(PlantService);

        // just a simple demonstration of retrieving a single document
        PlantService.get('qU11BuBV9a8LBKlKYJiN').then((plant) => {
            console.log(plant.data());
        });

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
