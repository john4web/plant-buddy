<template>
  <div>
    <h1>This is the BuddyDetail page</h1>
    <router-link to="/my-garden">Back to my garden</router-link>
    <button @click="isEditMode = !isEditMode">Edit Mode</button>
    <div>{{ plant.name }}</div>
    <div>{{ plant.type }}</div>
  </div>
</template>

<script lang="ts">
import PlantService from "@/services/PlantService";
import { Plant } from "@/types";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "BuddyDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = String(route.params.id);
    const plant = ref<Plant>({ name: "", type: "" });
    const isEditMode = ref<boolean>(false);

    onMounted(async () => {
      const result: Plant | undefined = (await PlantService.get(id)).data();
      if (result === undefined) {
        router.push({ name: "MyGarden" });
      } else {
        plant.value = result;
      }
    });

    return {
      plant,
      isEditMode,
    };
  },
});
</script>
