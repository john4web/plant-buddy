import {
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot,
} from 'firebase/firestore';

export interface Service<T> {
    add(item: T): Promise<DocumentReference<T> | void>;
    getAll(): Promise<QuerySnapshot<T>>;
    get(id: string): Promise<DocumentSnapshot<T>>;
}

export type Plant = {
    id: string;
    name: string;
    type: string;
};

export type User = {
    uuid: string;
    token: string;
};

export type Notification = {
    name: string;
    plantReference: string;
    userReference: string;
};
