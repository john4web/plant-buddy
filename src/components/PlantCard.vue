<template>
    <li class="card">
        <router-link
            :to="`/buddy-detail/${plant.id}`"
            class="flex flex-col gap-1"
        >
            <img
                class="card__image object-cover h-40"
                src="../assets/boeck.jpg"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'PlantCard',
    props: {
        plant: {
            type: Object,
            default: null,
        },
    },
});
</script>
