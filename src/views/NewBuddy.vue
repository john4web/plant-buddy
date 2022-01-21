<template>
    <OverlayLayout>
        <div class="text-navy p-6">
            <h1>New Buddy</h1>
            <div>Add a plant to your collection.</div>
            <div class="mt-10 flex-col">
                <label for="plantName" class="block">Name</label>
                <input id="plantName" v-model="plantName" class="input block" />
            </div>
            <div class="mt-5">
                <label for="plantType" class="block">Plant Type</label>
                <input id="plantType" v-model="plantType" class="input block" />
            </div>
            <div class="p-4">UPLOAD A PHOTO HERE</div>
            <div>Watering</div>

            <div class="flex flex-col space-y-2 p-2 w-80">
                <label for="waterslider">Amount</label>
                <input
                    id="waterslider"
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

            <button
                class="p-2 rounded-full bg-navy"
                @click="addNewWaterNotification"
            >
                <div class="h-8 w-8 relative plus-button">
                    <span
                        class="block absolute w-5 h-1 bg-white rounded-full top-2"
                    ></span>
                    <span
                        class="block absolute w-8 h-1 bg-white rounded-full top-5"
                    ></span>
                </div>
            </button>

            <div>Fertilizing</div>

            <div class="flex flex-col space-y-2 p-2 w-80">
                <label for="fertilizeslider">Amount</label>
                <input
                    id="fertilizeslider"
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

            <button
                class="p-2 rounded-full bg-drakgreen"
                @click="addNewFertilizingNotification"
            >
                <div class="h-8 w-8 relative plus-button">
                    <span
                        class="block absolute w-5 h-1 bg-white rounded-full top-2"
                    ></span>
                    <span
                        class="block absolute w-8 h-1 bg-white rounded-full top-5"
                    ></span>
                </div>
            </button>

            <button class="button" @click="addPlant">Add plant</button>
        </div>
    </OverlayLayout>
</template>

<script lang="ts">
import { useList } from '@/composables/resource-list';
import PlantService from '@/services/PlantService';
import { defineComponent, ref } from 'vue';
import OverlayLayout from '@/components/OverlayLayout.vue';
import NotificationInput from '@/components/NotificationInput.vue';
import NotificationService from '@/services/NotificationService';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

export default defineComponent({
    name: 'NewBuddy',
    components: { OverlayLayout, NotificationInput },
    setup() {
        const { add } = useList(PlantService);
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

        const addPlant = async () => {
            const plantReference = await add({
                id: '',
                name: plantName.value,
                type: plantType.value,
                wateringAmount: wateringAmount.value,
                fertilizingAmount: fertilizingAmount.value,
            });
            const userUuid = await AuthService.getUserUuid();
            const userReference = userUuid
                ? await UserService.getDocReference(userUuid)
                : null;
            if (plantReference && userReference) {
                wateringData.value.forEach((notification) => {
                    NotificationService.add({
                        title: `${plantName.value} (${plantType.value}) is thirsty!`,
                        body: `Don't forget to give your little buddy water (Amount: ${wateringAmount.value}).`,
                        day: notification.day,
                        time: notification.time,
                        plantReference: plantReference,
                        userReference: userReference,
                    });
                });

                fertilizingData.value.forEach((notification) => {
                    NotificationService.add({
                        title: `Fertilize ${plantName.value} (${plantType.value})!`,
                        body: `Don't forget to fertilize your little buddy (Amount: ${wateringAmount.value}).`,
                        day: notification.day,
                        time: notification.time,
                        plantReference: plantReference,
                        userReference: userReference,
                    });
                });
            }
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
.plus-button span {
    width: 2rem;
    top: 0.875rem;
}

.plus-button span:nth-child(1) {
    transform: rotate(-90deg);
}

.plus-button {
    border: 0;
    border-radius: 50%;
}
</style>
