import { firebaseApp } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

class AuthService {
  isAuthorized = () => {
    const auth = getAuth(firebaseApp);
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    })
  };

  createUser = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    const auth = getAuth(firebaseApp);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Sthg went wrong when creating a user.", e);
    }
    return null;
  };

  signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    const auth = getAuth(firebaseApp);
    try {
      await setPersistence(auth, browserSessionPersistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Sthg went wrong when signing in.", e);
    }
    return null;
  };

  logout = async () => {
    const auth = getAuth(firebaseApp);
    try {
      return await signOut(auth);
    } catch (e) {
      console.log("Sthg went wrong when signing out.", e);
    }
    return null;
  };
}

export default new AuthService();
