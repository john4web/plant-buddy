<template>
    <div v-if="plant" class="flex flex-col gap-5">
        <back-button class="m-5" />
        <div class="bg-green-300 w-full h-2/6 absolute top-0 left-0 z-0" />
        <div
            class="flex flex-col gap-3 bg-white z-10 mt-40 p-5 pt-8 rounded-3xl"
        >
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
import BackButton from '@/components/BackButton.vue';
import { useList } from '@/composables/resource-list';
import NotificationService from '@/services/NotificationService';

export default defineComponent({
    name: 'BuddyDetail',
    components: { BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = String(route.params.id);
        const plant = ref<Plant | null>(null);
        const { data: notifications } = useList(NotificationService);

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
            notifications,
        };
    },
});
</script>
