<template>
    <div v-if="plant" class="flex flex-col gap-5">
        <button
            class="button button--round z-10 m-5 bg-white"
            @click="$router.back()"
        >
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
        <div class="bg-green-300 w-full h-2/6 absolute top-0 left-0 z-0" />
        <div class="flex flex-col gap-3 bg-white z-10 mt-40 p-10 rounded-3xl">
            <section>
                <h1>{{ plant.name }}</h1>
                <div>{{ plant.type }}</div>
            </section>
            <section>
                <h2>Watering</h2>
                <div class="card">Amount: {{ plant.wateringAmount }}</div>
                Next time to water Julia: ...
            </section>

            <section>
                <h2>Fertilizing</h2>
                <div class="card">Amount: {{ plant.wateringAmount }}</div>
                Next time to fertilize Julia: ...
            </section>
        </div>
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
