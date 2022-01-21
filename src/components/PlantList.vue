<template>
    <h2 class="font-bold">List of plants</h2>
    <ul>
        <li v-for="plant in plants" :key="plant.id">
            <router-link :to="`/buddy-detail/${plant.id}`">
                {{ plant.name }} - {{ plant.type }}
            </router-link>
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
