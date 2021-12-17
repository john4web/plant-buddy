<template>
  <div>
    <h1>My Garden Page</h1>
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
