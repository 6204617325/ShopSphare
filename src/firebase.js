import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfJvSXBuGnVjkKSx0Jj2IJK4iiiqqoAVk",
  authDomain: "shopsphere-70728.firebaseapp.com",
  projectId: "shopsphere-70728",
  storageBucket: "shopsphere-70728.firebasestorage.app",
  messagingSenderId: "482754315011",
  appId: "1:482754315011:web:192044814f23c6be375f36",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;