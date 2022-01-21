import { firestore as db } from './firebase';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Notification, Service } from '@/types';

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
        return getDocs<Notification>(this.notificationsCollection);
    };

    add = async (notification: Notification) => {
        return addDoc<Notification>(this.notificationsCollection, notification);
    };
}

export default new NotificationService();
