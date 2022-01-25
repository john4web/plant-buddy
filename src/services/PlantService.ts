import { firestore as db } from './firebase';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Plant, Service } from '@/types';

import AuthService from '@/services/AuthService';

const plantConverter = {
    toFirestore: (data: Plant) => data,
    fromFirestore: (snap: QueryDocumentSnapshot): Plant => ({
        ...(snap.data() as Plant),
        id: snap.id,
    }),
};

class PlantService implements Service<Plant> {
    getPlantsCollection = async () => {
        const userUuid = await AuthService.getUserUuid();
        return collection(db, `users/${userUuid}/plants`).withConverter(
            plantConverter
        );
    };

    get = async (id: string) => {
        const plantsCollection = await this.getPlantsCollection();
        return getDoc<Plant>(doc(plantsCollection, id));
    };

    getAll = async () => {
        const plantsCollection = await this.getPlantsCollection();
        return getDocs<Plant>(plantsCollection);
    };

    add = async (item: Plant) => {
        const plantsCollection = await this.getPlantsCollection();
        return addDoc<Plant>(plantsCollection, item);
    };
}

export default new PlantService();
