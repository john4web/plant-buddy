import { onMounted, ref } from 'vue';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from '@/services/firebase';

export const useFileStorage = (imageReference: string) => {
    const imageSrc = ref('');
    const isLoading = ref(false);

    onMounted(async () => {
        isLoading.value = true;
        imageSrc.value = await getDownloadURL(
            storageRef(storage, imageReference)
        );
        isLoading.value = false;
    });
    return {
        imageSrc,
        isLoading,
    };
};
