<template>
    <li class="card">
        <router-link
            :to="`/buddy-detail/${plant.id}`"
            class="flex flex-col gap-1"
        >
            <img
                v-if="plant.image"
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
import { defineComponent, onMounted, ref } from 'vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebase';

export default defineComponent({
    name: 'PlantCard',
    props: {
        plant: {
            type: Object,
            default: null,
        },
    },
    setup(props) {
        const imageSrc = ref('');

        onMounted(async () => {
            imageSrc.value = await getImageUrl();
        });

        const getImageUrl = async () => {
            return await getDownloadURL(storageRef(storage, props.plant.image));
        };

        return {
            imageSrc,
            getImageUrl,
        };
    },
});
</script>
