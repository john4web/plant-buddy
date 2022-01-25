<template>
    <li class="card">
        <router-link
            :to="`/buddy-detail/${plant.id}`"
            class="flex flex-col gap-1"
        >
            <div v-if="isLoading" class="card__image h-40" />
            <img
                v-else
                class="card__image object-cover h-40"
                :src="imageSrc"
                :alt="plant.name"
            />
            <div>
                <h3>{{ plant.name }}</h3>
                <p>{{ plant.type }}</p>
            </div>
        </router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFileStorage } from '@/composables/fileStorage';

export default defineComponent({
    name: 'PlantCard',
    props: {
        plant: {
            type: Object,
            default: null,
        },
    },
    setup(props) {
        const { imageSrc, isLoading } = useFileStorage(props.plant.image);

        return {
            imageSrc,
            isLoading,
        };
    },
});
</script>
