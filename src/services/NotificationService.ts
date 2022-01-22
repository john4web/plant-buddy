import { firestore as db } from './firebase';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Notification, Service } from '@/types';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

const notificationConverter = {
    toFirestore: (data: Notification) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Notification,
};

class NotificationService implements Service<Notification> {
    notificationsCollection = collection(db, 'notifications').withConverter(
        notificationConverter
    );
    get = async (id: string) => {
        return getDoc<Notification>(doc(this.notificationsCollection, id));
    };

    getAll = async () => {
        const userUuid = await AuthService.getUserUuid();
        const userReference = userUuid
            ? await UserService.getDocReference(userUuid)
            : null;
        const currentDay = new Date().getDay();
        const q = query(
            this.notificationsCollection,
            where('userReference', '==', userReference),
            where('day', '==', currentDay.toString())
        );

        return getDocs<Notification>(q);
    };

    add = async (notification: Notification) => {
        return addDoc<Notification>(this.notificationsCollection, notification);
    };
}

export default new NotificationService();
