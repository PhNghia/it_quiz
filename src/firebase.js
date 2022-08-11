import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCnthCQ3ERUi3ycFk0ZePThXsrOmHW3Kd0",
    authDomain: "it-quiz-aac0c.firebaseapp.com",
    databaseURL: "https://it-quiz-aac0c-default-rtdb.firebaseio.com",
    projectId: "it-quiz-aac0c",
    storageBucket: "it-quiz-aac0c.appspot.com",
    messagingSenderId: "99818776373",
    appId: "1:99818776373:web:35bd276320d2b154278e7c",
    databaseURL: "https://it-quiz-aac0c-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export { auth, database }