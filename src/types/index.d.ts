import { DocumentReference, QuerySnapshot } from "firebase/firestore";

export interface Service<T> {
  add(item: T): Promise<DocumentReference<T>>;
  getAll(): Promise<QuerySnapshot<T>>;
}

export type Plant = {
  name: string;
  type: string;
};
