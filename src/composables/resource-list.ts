import { Ref, ref } from 'vue';
import { Service } from '@/types';
import { QueryConstraint } from 'firebase/firestore';

export const useList = <T>(service: Service<T>) => {
    const isLoading = ref(false);
    const error = ref(false);
    const data: Ref<T[] | null> = ref(null);

    const getList = async (queryConstraints: QueryConstraint[] = []) => {
        isLoading.value = true;
        try {
            const response = await service.getAll(queryConstraints);
            data.value = response.docs.map((doc) => doc.data());
        } catch (e) {
            error.value = true;
        }
        isLoading.value = false;
    };

    const add = async (item: T, isRefetching = false) => {
        isLoading.value = true;
        try {
            const doc = await service.add(item);
            if (isRefetching) await getList();
            return doc;
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
