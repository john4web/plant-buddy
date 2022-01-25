import {
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot,
    QueryConstraint,
} from 'firebase/firestore';

export interface Service<T> {
    add(item: T): Promise<DocumentReference<T> | void>;
    getAll(
        queryConstraints: QueryConstraint[] = null
    ): Promise<QuerySnapshot<T>>;
    get(id: string): Promise<DocumentSnapshot<T>>;
}

export type Plant = {
    id: string;
    name: string;
    type: string;
    wateringAmount: number;
    fertilizingAmount: number;
    image: string | null;
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
    type: string;
    userReference: DocumentReference<User>;
    plantReference: DocumentReference<Plant>;
    plantId: string;
};
