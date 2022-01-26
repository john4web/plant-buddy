<template>
    <div v-if="plant" class="flex flex-col gap-5">
        <back-button class="m-5" />
        <div class="bg-grey w-full h-2/6 absolute top-0 left-0 z-0">
            <img
                :src="imageSrc"
                class="object-cover h-full w-full"
                alt="picture of your plant"
            />
        </div>
        <div
            class="flex flex-col gap-3 bg-white z-10 mt-40 p-5 pt-8 rounded-3xl"
        >
            <section>
                <h1>{{ plant.name }}</h1>
                <div>{{ plant.type }}</div>
            </section>
            <section class="flex flex-col gap-3">
                <div>
                    <h2>Watering</h2>
                    The perfect amount of water for your plant:
                </div>
                <amount-indicator
                    :amount="parseInt(plant.wateringAmount)"
                    color="bg-blue"
                />
                <div v-if="waterNotifications && waterNotifications.length > 0">
                    <h3>Your Reminders</h3>
                    <ul class="flex flex-col gap-2 mt-3">
                        <li
                            v-for="notification in waterNotifications"
                            :key="notification.day"
                            class="card"
                        >
                            <span class="text-lg font-bold">
                                {{ WEEKDAYS[notification.day] }},
                            </span>
                            <span class="text-lg">
                                {{ notification.time }}
                            </span>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="flex flex-col gap-3">
                <div>
                    <h2>Fertilizing</h2>
                    The perfect amount of fertilizer for your plant:
                </div>
                <amount-indicator
                    :amount="parseInt(plant.fertilizingAmount)"
                    color="bg-red"
                />
                <div
                    v-if="
                        fertilizingNotifications &&
                        fertilizingNotifications.length > 0
                    "
                >
                    <h3>Your Reminders</h3>
                    <ul class="flex flex-col gap-2 mt-3">
                        <li
                            v-for="notification in fertilizingNotifications"
                            :key="notification.day"
                            class="card"
                        >
                            <span class="text-lg font-bold">
                                {{ WEEKDAYS[notification.day] }},
                            </span>
                            <span class="text-lg">
                                {{ notification.time }}
                            </span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import PlantService from '@/services/PlantService';
import { Plant } from '@/types';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import { useList } from '@/composables/resource-list';
import NotificationService from '@/services/NotificationService';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from '@/services/firebase';
import { where } from 'firebase/firestore';
import AmountIndicator from '@/components/AmountIndicator.vue';

const WEEKDAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default defineComponent({
    name: 'BuddyDetail',
    components: { AmountIndicator, BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = String(route.params.id);
        const plant = ref<Plant | null>(null);

        const { data: notifications, getList: getNotificationList } =
            useList(NotificationService);

        const imageSrc = ref('');

        onMounted(async () => {
            const result: Plant | undefined = (
                await PlantService.get(id)
            ).data();
            if (result === undefined) {
                await router.push({ name: 'MyGarden' });
            } else {
                plant.value = result;
                if (plant.value.image) {
                    imageSrc.value = await getDownloadURL(
                        storageRef(storage, plant.value.image)
                    );
                }
                await getNotificationList([
                    where('plantId', '==', plant.value.id),
                ]);
            }
        });

        const waterNotifications = computed(() =>
            notifications.value?.filter(
                (notification) => notification.type === 'water'
            )
        );

        const fertilizingNotifications = computed(() =>
            notifications.value?.filter(
                (notification) => notification.type === 'fertilize'
            )
        );

        return {
            plant,
            waterNotifications,
            fertilizingNotifications,
            imageSrc,
            WEEKDAYS,
        };
    },
});
</script>
