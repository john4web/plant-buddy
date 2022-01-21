<template>
    <div v-if="plant">
        <button @click="$router.back()">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
                />
            </svg>
        </button>
        <h1>This is the BuddyDetail page</h1>
        <button>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                />
            </svg>
        </button>
        <div>{{ plant.name }}</div>
        <div>{{ plant.type }}</div>
    </div>
</template>

<script lang="ts">
import PlantService from '@/services/PlantService';
import { Plant } from '@/types';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'BuddyDetail',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = String(route.params.id);
        const plant = ref<Plant | null>(null);
        const isEditMode = ref<boolean>(false);

        onMounted(async () => {
            const result: Plant | undefined = (
                await PlantService.get(id)
            ).data();
            if (result === undefined) {
                router.push({ name: 'MyGarden' });
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
