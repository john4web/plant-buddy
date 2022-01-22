<template>
    <OverlayLayout>
        <div class="flex flex-col gap-5">
            <h1>New Buddy</h1>
            <div>Add a plant to your collection.</div>
            <div>
                <label for="plantName">Name</label>
                <input id="plantName" v-model="plantName" class="input block" />
            </div>
            <div>
                <label for="plantType">Plant Type</label>
                <input id="plantType" v-model="plantType" class="input block" />
            </div>
            <button @click="cameraIsOpen = true" class="button">
                Open Camera
            </button>
            <div
                class="bg-black fixed w-screen h-screen left-0 top-0 z-10"
                v-if="cameraIsOpen"
            >
                <camera
                    :resolution="{ width: 375, height: 812 }"
                    ref="camera"
                    autoplay
                >
                    <div class="w-full h-full flex justify-center items-end">
                        <button
                            @click="
                                snapshot();
                                cameraIsOpen = false;
                            "
                            class="bg-white rounded-full w-16 h-16 mb-10"
                        ></button>

                        <button
                            @click="cameraIsOpen = false"
                            class="absolute top-5 left-5"
                        >
                            <div class="h-8 w-8 relative close-button">
                                <span
                                    class="block absolute w-5 h-1 bg-navy rounded-full top-2"
                                ></span>
                                <span
                                    class="block absolute w-8 h-1 bg-navy rounded-full top-5"
                                ></span>
                            </div>
                        </button>
                    </div>
                </camera>
            </div>

            <img :src="imageSrc" alt="" v-show="image" />

            <div>Watering</div>

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

            <div
                v-for="(_, index) in wateringData"
                :key="index"
                class="border-2 mb-5 p-5 relative"
            >
                <NotificationInput v-model="wateringData[index]" />
                <button
                    @click="deleteWateringNotification(index)"
                    v-if="index !== 0"
                    class="absolute -top-2 -right-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#0B486B"
                    >
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"
                        />
                    </svg>
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
        </div>

        <div>
            <h3>Fertilizing</h3>

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
            <div
                v-for="(_, index) in fertilizingData"
                :key="index"
                class="border-2 mb-5 p-5 relative"
            >
                <NotificationInput v-model="fertilizingData[index]" />
                <button
                    @click="deleteFertilizingNotification(index)"
                    v-if="index !== 0"
                    class="absolute -top-2 -right-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#3B8686"
                    >
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"
                        />
                    </svg>
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
import { defineComponent, ref, computed } from 'vue';
import OverlayLayout from '@/components/OverlayLayout.vue';
import NotificationInput from '@/components/NotificationInput.vue';
import NotificationService from '@/services/NotificationService';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import Camera from 'simple-vue-camera';
import { storage } from '@/services/firebase';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import router from '@/router';

export default defineComponent({
    name: 'NewBuddy',
    components: { OverlayLayout, NotificationInput, Camera },

    setup() {
        const { add } = useList(PlantService);
        const plantName = ref('');
        const plantType = ref('');
        const wateringData = ref([{ day: 1, time: '12:00' }]);
        const fertilizingData = ref([{ day: 1, time: '12:00' }]);
        const wateringAmount = ref(3);
        const fertilizingAmount = ref(3);
        const image = ref<Blob | null>(null);
        const cameraIsOpen = ref(false);

        const imageSrc = computed(() => {
            return image.value && URL.createObjectURL(image.value);
        });

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
            let imageId = null;
            if (image.value) imageId = await saveBlobToFirestore(image.value);

            try {
                const plantReference = await add({
                    id: '',
                    name: plantName.value,
                    type: plantType.value,
                    wateringAmount: wateringAmount.value,
                    fertilizingAmount: fertilizingAmount.value,
                    image: imageId,
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
                            type: 'water',
                            time: notification.time,
                            plantReference: plantReference,
                            userReference: userReference,
                        });
                    });

                    fertilizingData.value.forEach((notification) => {
                        NotificationService.add({
                            title: `Fertilize ${plantName.value} (${plantType.value})!`,
                            body: `Don't forget to fertilize your little buddy (Amount: ${wateringAmount.value}).`,
                            type: 'fertilize',
                            day: notification.day,
                            time: notification.time,
                            plantReference: plantReference,
                            userReference: userReference,
                        });
                    });
                }
                await router.push('/my-garden');
            } catch (e) {
                console.log('sth went wrong', e);
            }
        };

        const camera = ref<InstanceType<typeof Camera>>();

        const snapshot = async () => {
            const blob = await camera.value?.snapshot({
                width: 375,
                height: 812,
            });
            if (blob) image.value = blob;
        };

        const saveBlobToFirestore = async (blob: Blob) => {
            const imageId = uuidv4();
            const storageReference = storageRef(storage, imageId);
            await uploadBytes(storageReference, blob);

            return imageId;
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
            image,
            snapshot,
            camera,
            imageSrc,
            cameraIsOpen,
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

input[type='range'] {
    height: 34px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
}

input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    background: #0b486b;
    border-radius: 6px;
    border: 0px solid #010101;
}

input[type='range']#fertilizeslider::-webkit-slider-runnable-track {
    background: #3b8686;
}

input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000031;
    border: 1px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
}

input[type='range']::-moz-range-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #74a9d8;
    border-radius: 1px;
    border: 0px solid #010101;
}
input[type='range']::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000031;
    border: 1px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #ffffff;
    cursor: pointer;
}
input[type='range']::-ms-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}
input[type='range']::-ms-fill-lower {
    background: #74a9d8;
    border: 0px solid #010101;
    border-radius: 2px;
    box-shadow: 1px 1px 1px #000000;
}
input[type='range']::-ms-fill-upper {
    background: #74a9d8;
    border: 0px solid #010101;
    border-radius: 2px;
    box-shadow: 1px 1px 1px #000000;
}
input[type='range']::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000031;
    border: 1px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #ffffff;
    cursor: pointer;
}

.close-button span {
    width: 2rem;
    top: 0.875rem;
}

.close-button span:nth-child(1) {
    transform: rotate(45deg);
}

.close-button span:nth-child(2) {
    transform: rotate(-45deg);
}

.close-button {
    background-color: #e8e8e8;
    outline: 8px solid #e8e8e8;
    border-radius: 50%;
}
</style>
