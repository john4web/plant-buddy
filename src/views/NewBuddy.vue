<template>
    <OverlayLayout>
        <div>
            <h1>This is the newBuddy page</h1>
            <input
                v-model="plantName"
                class="border shadow rounded py-1 px-3"
            />
            <input
                v-model="plantType"
                class="border shadow rounded py-1 px-3"
            />
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

export default defineComponent({
    name: 'NewBuddy',
    components: { OverlayLayout },
    setup() {
        const { add: addPlant } = useList(PlantService);
        const plantName = ref('');
        const plantType = ref('');

        return {
            addPlant,
            plantName,
            plantType,
        };
    },
});
</script>
