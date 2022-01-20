<template>
    <OverlayLayout>
        <div>
            <h1>New Buddy</h1>
            <div>Add a plant to your collection</div>
            <div>
                <label for="plantName">Name</label>
                <input
                    id="plantName"
                    v-model="plantName"
                    class="border shadow rounded py-1 px-3"
                />
            </div>
            <div>
                <label for="plantType">Plant Type</label>
                <input
                    v-model="plantType"
                    class="border shadow rounded py-1 px-3"
                />
            </div>
            <div>UPLOAD A PHOTO HERE</div>
            <div>Watering</div>

            <div class="flex flex-col space-y-2 p-2 w-80">
                <input
                    type="range"
                    class="w-full"
                    min="1"
                    max="5"
                    step="1"
                    v-model="wateringAmount"
                />
                <ul class="flex justify-between w-full px-[10px]">
                    <li class="flex justify-center relative">
                        <span class="absolute">low</span>
                    </li>
                    <li class="flex justify-center relative">
                        <span class="absolute">high</span>
                    </li>
                </ul>
            </div>

            <div v-for="(_, index) in wateringData" :key="index">
                <NotificationInput v-model="wateringData[index]" />
                <button
                    @click="deleteWateringNotification(index)"
                    v-if="index !== 0"
                >
                    X
                </button>
            </div>

            <button @click="addNewWaterNotification">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
            </button>
            <div>Fertilizing</div>

            <div class="flex flex-col space-y-2 p-2 w-80">
                <input
                    type="range"
                    class="w-full"
                    min="1"
                    max="5"
                    step="1"
                    v-model="fertilizingAmount"
                />
                <ul class="flex justify-between w-full px-[10px]">
                    <li class="flex justify-center relative">
                        <span class="absolute">low</span>
                    </li>
                    <li class="flex justify-center relative">
                        <span class="absolute">high</span>
                    </li>
                </ul>
            </div>

            <div v-for="(_, index) in fertilizingData" :key="index">
                <NotificationInput v-model="fertilizingData[index]" />
                <button
                    @click="deleteFertilizingNotification(index)"
                    v-if="index !== 0"
                >
                    X
                </button>
            </div>

            <button @click="addNewFertilizingNotification">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
            </button>

            <button
                class="border rounded shadow bg-green-600 py-1 px-3 text-white"
                @click="addPlant({ name: plantName, type: plantType }, true)"
            >
                Add plant
            </button>
        </div>
    </OverlayLayout>
</template>

<script lang="ts">
import { useList } from '@/composables/resource-list';
import PlantService from '@/services/PlantService';
import { defineComponent, ref } from 'vue';
import OverlayLayout from '@/components/OverlayLayout.vue';
import NotificationInput from '@/components/NotificationInput.vue';

export default defineComponent({
    name: 'NewBuddy',
    components: { OverlayLayout, NotificationInput },
    setup() {
        const { add: addPlant } = useList(PlantService);
        const plantName = ref('');
        const plantType = ref('');
        const wateringData = ref([{ day: 1, time: '12:00' }]);
        const fertilizingData = ref([{ day: 1, time: '12:00' }]);
        const wateringAmount = ref(3);
        const fertilizingAmount = ref(3);

        const addNewWaterNotification = () => {
            wateringData.value.push({ day: 1, time: '12:00' });
        };

        const addNewFertilizingNotification = () => {
            fertilizingData.value.push({ day: 1, time: '12:00' });
        };

        const deleteWateringNotification = (index: number) => {
            wateringData.value.splice(index, 1);
        };

        const deleteFertilizingNotification = (index: number) => {
            fertilizingData.value.splice(index, 1);
        };

        return {
            addPlant,
            plantName,
            plantType,
            wateringData,
            fertilizingData,
            addNewWaterNotification,
            addNewFertilizingNotification,
            deleteWateringNotification,
            deleteFertilizingNotification,
            wateringAmount,
            fertilizingAmount,
        };
    },
});
</script>


<style scoped>
</style>