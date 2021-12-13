<template>
  <h2 class="font-bold">Add a new plant:</h2>
  <div class="flex flex-col">
    <div>
      <input v-model="plantName" class="border shadow rounded py-1 px-3" />
      <button
        class="border rounded shadow bg-green-600 py-1 px-3 text-white"
        @click="addPlant({ name: plantName, type: 'type' }, true)"
      >
        Add plant
      </button>
    </div>
  </div>
  <h2 class="font-bold">List of plants</h2>
  <ul>
    <li v-for="(plant, index) in plants" :key="index">
      {{ plant.name }} - {{ plant.type }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useList } from "@/composables/resource-list";
import PlantService from "@/services/PlantService";

export default defineComponent({
  name: "PlantList",
  props: {
    msg: String,
  },
  setup() {
    const plantName = ref("");
    const {
      add: addPlant,
      data: plants,
      getList: getPlantList,
      isLoading,
    } = useList(PlantService);

    // just a simple demonstration of retrieving a single document
    PlantService.get("qU11BuBV9a8LBKlKYJiN").then((plant) => {
      console.log(plant.data());
    });

    getPlantList();

    return {
      addPlant,
      getPlantList,
      plantName,
      plants,
      isLoading,
    };
  },
});
</script>
