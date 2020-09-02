
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDB9v0ePFd94jniq__zSgH516OjEfffw6w",
  authDomain: "my-insta-clone-d501f.firebaseapp.com",
  databaseURL: "https://my-insta-clone-d501f.firebaseio.com",
  projectId: "my-insta-clone-d501f",
  storageBucket: "my-insta-clone-d501f.appspot.com",
  messagingSenderId: "480415591969",
  appId: "1:480415591969:web:7ef0a62fbd0990f89bbd60",
  measurementId: "G-CNW0EW9SBP"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export { db, auth, storage }

//   import firebase from 'firebase';
// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyB1gLG1s-sgmw08Ab8LRNLHmF0dpndECBI",
//     authDomain: "instagram-clone-ecdb8.firebaseapp.com",
//     databaseURL: "https://instagram-clone-ecdb8.firebaseio.com",
//     projectId: "instagram-clone-ecdb8",
//     storageBucket: "instagram-clone-ecdb8.appspot.com",
//     messagingSenderId: "469692571962",
//     appId: "1:469692571962:web:a639a60498cc4cb518f003",
//     measurementId: "G-4DNJJXBS8S"
// });
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();

// export {db,auth,storage}