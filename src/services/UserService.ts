import { firestore as db } from './firebase';
import {
    collection,
    setDoc,
    doc,
    getDoc,
    QueryDocumentSnapshot,
    getDocs,
} from 'firebase/firestore';
import { User, Service } from '@/types';

const USER_COLLECTION = 'users';

const plantConverter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as User,
};

class UserService implements Service<User> {
    usersCollection = collection(db, USER_COLLECTION).withConverter(
        plantConverter
    );

    get = (id: string) => {
        return getDoc<User>(doc(this.usersCollection, id));
    };

    getAll = () => {
        getDocs<User>(this.usersCollection).then((docs) => {
            docs.forEach((doc) => console.log(doc.id));
        });
        return getDocs<User>(this.usersCollection);
    };

    add = (user: User) => {
        return setDoc<User>(doc(this.usersCollection, user.uuid), user);
    };
}

export default new UserService();
