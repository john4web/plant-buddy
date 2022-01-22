import {
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot,
    Blob
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';

export interface Service<T> {
    add(item: T): Promise<DocumentReference<T> | void>;
    getAll(): Promise<QuerySnapshot<T>>;
    get(id: string): Promise<DocumentSnapshot<T>>;
}

export type Plant = {
    id: string;
    name: string;
    type: string;
    wateringAmount: number;
    fertilizingAmount: number;
    image: StorageReference | null;
};

export type User = {
    uuid: string;
    token: string;
};

export type Notification = {
    title: string;
    body: string;
    day: int;
    time: string;
    plantReference: DocumentReference<Plant>;
    userReference: DocumentReference<User>;
};
