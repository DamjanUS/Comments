import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiJfQQUJERjWgBt-kid5Kx2z-Acoz8U74",
  authDomain: "video-timestamp-comments.firebaseapp.com",
  projectId: "video-timestamp-comments",
  storageBucket: "video-timestamp-comments.appspot.com",
  messagingSenderId: "712247082064",
  appId: "1:712247082064:web:5c6ba7124f7740974f2555",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const createDocument = async (colName, doc) => {
  const docRef = await addDoc(collection(db, colName), doc);
  return docRef.id;
};

export const updateDocument = async (colName, id, obj) => {
  await updateDoc(doc(db, colName, id), obj);
  return id;
};

export const getDocuments = async (colName) => {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
};
