import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCsKI7puA4z_qr1igjoJ0IxDxkd5mB84t4",
    authDomain: "atlas-lumigram.firebaseapp.com",
    projectId: "atlas-lumigram",
    storageBucket: "atlas-lumigram.firebasestorage.app",
    messagingSenderId: "978746231167",
    appId: "1:978746231167:web:4c45a17404beb23de6f24a",
    measurementId: "G-41QMNJ754N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
