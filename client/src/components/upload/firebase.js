import firebase from 'firebase/app';
import 'firebase/storage';


const config = {
    "apiKey": "AIzaSyBEvhFPUvAQGPFsvjWQfbOdBUQs6DiU6H0",
    "authDomain": "flaskreact-c0c87.firebaseapp.com",
    "databaseURL": "https://flaskreact-c0c87.firebaseio.com",
    "projectId": "flaskreact-c0c87",
    "storageBucket": "flaskreact-c0c87.appspot.com",
    "messagingSenderId": "537411848434",
    "appId": "1:537411848434:web:903517588ed34c03fc286b",
    "measurementId": "G-K1RNNQXEER"
}

firebase.initializeApp(config);
const storage = firebase.storage();

export {storage, firebase as default}