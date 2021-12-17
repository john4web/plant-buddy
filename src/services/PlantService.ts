import { firestore as db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Plant, Service } from "@/types";

const PLANT_COLLECTION = "plants";

const plantConverter = {
  toFirestore: (data: Plant) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Plant,
};

class PlantService implements Service<Plant> {
  plantsCollection = collection(db, PLANT_COLLECTION).withConverter(
    plantConverter
  );

  get = (id: string) => {
    return getDoc<Plant>(doc(this.plantsCollection, id));
  };

  getAll = () => {
    return getDocs<Plant>(this.plantsCollection);
  };

  add = (item: Plant) => {
    return addDoc<Plant>(this.plantsCollection, item);
  };
}

export default new PlantService();
