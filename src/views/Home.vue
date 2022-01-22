<template>
    <DefaultLayout>
        <section class="flex flex-col">
            <h1>Hi, plant buddy!</h1>
            <p>
                We're glad you chose to take care of your green little friends.
            </p>
        </section>
        <section class="flex flex-col gap-3">
            <h2>
                Your Garden
                <span class="badge"> {{ plants ? plants.length : 0 }} </span>
            </h2>

            <template v-if="isLoadingPlants"> ... loading </template>
            <template v-else>
                <ul class="grid grid-cols-2 gap-4">
                    <plant-card
                        v-for="plant in plants.slice(0, 2)"
                        :plant="plant"
                        :key="plant.id"
                    />
                </ul>
                <router-link to="/my-garden" class="link"
                    >See all plants</router-link
                >
            </template>
        </section>
        <section class="flex flex-col gap-3">
            <h2>
                Today's tasks
                <span class="badge">
                    {{ notifications ? notifications.length : 0 }}
                </span>
            </h2>
            <template v-if="isLoadingNotifications"> ... loading </template>
            <ul class="flex flex-col gap-4">
                <li
                    v-for="(notification, i) in notifications"
                    :key="i"
                    class="card"
                    :class="`card--${notification.type}`"
                >
                    {{ notification.title }}
                </li>
            </ul>
        </section>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DefaultLayout from '@/components/DefaultLayout.vue';
import PlantCard from '@/components/PlantCard.vue';

import PlantService from '@/services/PlantService';
import { useList } from '@/composables/resource-list';
import NotificationService from '@/services/NotificationService';

export default defineComponent({
    name: 'Home',
    components: {
        PlantCard,
        DefaultLayout,
    },
    setup() {
        const {
            data: plants,
            getList: getPlantList,
            isLoading: isLoadingPlants,
        } = useList(PlantService);

        const {
            data: notifications,
            getList: getNotificationList,
            isLoading: isLoadingNotifications,
        } = useList(NotificationService);

        getPlantList();
        getNotificationList();

        return {
            isLoadingNotifications,
            isLoadingPlants,
            notifications,
            plants,
        };
    },
});
</script>

<style scoped>
.card--fertilize {
    background-color: var(--green-light);
}

.card--water {
    background-color: var(--blue-light);
}
</style>
