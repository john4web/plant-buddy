<template>
    <OverlayLayout>
        <h1>New Buddy</h1>
        <div class="form-element">
            <label for="plantName">Name</label>
            <input id="plantName" v-model="plantName" class="" />
        </div>
        <div class="form-element">
            <label for="plantType">Plant Type</label>
            <input id="plantType" v-model="plantType" class="" />
        </div>
        <div class="form-element">
            <h3 for="camera">Take a nice shot!</h3>
            <p>
                The picture will be useful for identifying every plant in your
                garden.
            </p>
            <button
                @click="cameraIsOpen = true"
                class="button flex gap-3 justify-center items-center"
            >
                <img
                    src="../assets/camera.png"
                    alt="camera icon"
                    class="w-8 opacity-50 -mt-2"
                />
                Open Camera
            </button>
            <div
                id="camera"
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
                            class="bg-white rounded-full w-16 h-16 mb-10 border-5 border-transparent outline-white"
                        ></button>

                        <close-button
                            @close="cameraIsOpen = false"
                            class="absolute top-5 left-5"
                        />
                    </div>
                </camera>
            </div>
        </div>

        <img :src="imageSrc" alt="" v-show="image" />

        <section>
            <h2>Watering</h2>
            <label for="waterslider">Amount</label>
            <div class="flex bg-grey gap-2 items-center px-4 rounded-xl">
                low
                <input
                    id="waterslider"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    v-model="wateringAmount"
                />
                high
            </div>
            <h3>Reminder</h3>
            <p>When do you want to be reminded to water your plant?</p>
            <div class="flex flex-col gap-4 mt-2">
                <div v-for="(_, index) in wateringData" :key="index">
                    <NotificationInput
                        v-model="wateringData[index]"
                        @delete="deleteWateringNotification(index)"
                    />
                </div>
                <button
                    v-if="wateringData.length < 7"
                    class="border border-gray-300 border-dashed rounded-full p-2"
                    @click="addNewWaterNotification"
                >
                    + add reminder
                </button>
            </div>
        </section>
        <section>
            <h2>Fertilizing</h2>
            <label for="fertilizeslider">Amount</label>
            <div class="flex bg-grey gap-2 items-center px-4 rounded-xl">
                low
                <input
                    id="fertilizeslider"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    v-model="fertilizingAmount"
                />
                high
            </div>

            <div>
                <h3>Reminder</h3>
                <p>When should we remind you to fertilize your plant?</p>
                <div class="flex flex-col gap-4 mt-2">
                    <div v-for="(_, index) in fertilizingData" :key="index">
                        <NotificationInput
                            v-model="fertilizingData[index]"
                            @delete="deleteFertilizingNotification(index)"
                        />
                    </div>
                    <button
                        v-if="fertilizingData.length < 7"
                        class="border border-gray-300 border-dashed rounded-full p-2"
                        @click="addNewFertilizingNotification"
                    >
                        + add reminder
                    </button>
                </div>
            </div>
        </section>

        <button class="button button--blue" @click="addPlant">Add plant</button>
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
import CloseButton from '@/components/CloseButton.vue';

export default defineComponent({
    name: 'NewBuddy',
    components: { CloseButton, OverlayLayout, NotificationInput, Camera },

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
                            plantId: plantReference.id,
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
                            plantId: plantReference.id,
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

input[type='range']#waterslider::-webkit-slider-runnable-track {
    background: #3b8686;
}

input[type='range']#fertilizeslider::-webkit-slider-runnable-track {
    background: #dc8e55;
}

input[type='range']::-webkit-slider-thumb {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
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
    background: #74a9d8;
    border-radius: 1px;
    border: 0px solid #010101;
}
input[type='range']::-moz-range-thumb {
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
}
input[type='range']::-ms-fill-upper {
    background: #74a9d8;
    border: 0px solid #010101;
    border-radius: 2px;
}
input[type='range']::-ms-thumb {
    margin-top: 1px;
    border: 1px solid #00001e;
    height: 26px;
    width: 26px;
    border-radius: 15px;
    background: #ffffff;
    cursor: pointer;
}
</style>
