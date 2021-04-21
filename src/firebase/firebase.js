import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export {firebase, database as default};
// database.ref('notes').push({
//   description: "Rent",
//   amount: 100000,
//   note: '',
//   createdAt: 0
// });

// database.ref('notes').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((item) => {
//     expenses.push({
//       id: item.key,
//       ...item.val()
//     })
//   });
//   console.log(expenses);
// });

// setTimeout(() => {
//   database.ref('notes').push({
//     description: "Water bill",
//     amount: 200000,
//     note: 'By end of the month',
//     createdAt: 0
//   });
// }, 4000);

// database.ref('name').once('value')
// .then((snapshot)=>{
//   const val = snapshot.val();
//   console.log(val);
// })
// .catch((e) => {
//   console.log('Error fetching data', e)
// })

// database.ref().set(
//   {
//     name: 'Vincenzo Gambino',
//     age: 39,
//     stressLevel: 6,
//     location: {
//       city: 'Palermo',
//       country: 'Italy'
//     },
//     job: {
//       title: 'Software engineer',
//       company: 'Google'
//     }
//   }
// ).then(() => {
//   console.log('Data is saved');
// }).catch(() => {
//   console.log('This failed');
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'London'
// }).then(() => {
//   console.log('updated')
// }).catch((e) => {
//   console.log(e.message)
// });

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Is single removed')
//   }).catch((e) => {
//     console.log(e.message)
//   });