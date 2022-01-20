<template>
  <div>
    <h1>My Garden Page</h1>
    <router-link
      to="/new-buddy"
      class="border rounded shadow bg-green-600 py-1 px-3 text-white"
      >+ Add new Buddy</router-link
    >
    <PlantList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PlantList from "@/components/PlantList.vue";

export default defineComponent({
  name: "MyGarden",
  components: {
    PlantList,
  },
});
</script>
