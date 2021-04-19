// const person = {
//     name: 'vincenzo',
//     age: 39,
//     location: {
//         city: "Palermo",
//         temp: 20
//     }
// };

// const {name, age} = person;

// const {city, temp} = person.location;

// console.log(`${name} is ${age}`);
// console.log(`He is in ${city} and it is ${temp}`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

// const address = ['1299 s Jupiter Street', 'Palermo', 'Sicilia', '90040'];

// const [, city, state] = address;

// console.log(`Your are in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '2.75'];
const [product, , mediumPrice] = item;

console.log(`A medium ${product} costs ${mediumPrice}`);