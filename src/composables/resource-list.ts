import { Ref, ref } from 'vue';
import { Service } from '@/types';

export const useList = <T>(endpoint: Service<T>) => {
    const isLoading = ref(false);
    const error = ref(false);
    const data: Ref<T[] | null> = ref(null);

    const getList = async () => {
        isLoading.value = true;
        try {
            const response = await endpoint.getAll();
            data.value = response.docs.map((doc) => doc.data());
        } catch (e) {
            error.value = true;
        }
        isLoading.value = false;
    };

    const add = async (item: T, isRefetching = false) => {
        isLoading.value = true;
        try {
            await endpoint.add(item);
            if (isRefetching) await getList();
        } catch (e) {
            error.value = true;
        }
        isLoading.value = false;
    };

    return {
        add,
        data,
        isLoading,
        error,
        getList,
    };
};
