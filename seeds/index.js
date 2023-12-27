const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbUrl= process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

//new version change
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    // delete all data from the DB
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        // Get two random indexes from the pic array
        const randomPicIndexes = Array.from({ length: 2 }, () => Math.floor(Math.random() * pic.length));

        // Extract the url and filename for each image
        const image1 = pic[randomPicIndexes[0]];
        const image2 = pic[randomPicIndexes[1]];

        const camp = new Campground({
            author: '6584340d5c61a13dec57630a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [image1, image2],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

const pic = [
    {//good
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702817697/YelpCamp/goow2fpw3jo3mgwkmaed.png',
        filename: 'YelpCamp/goow2fpw3jo3mgwkmaed'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702817698/YelpCamp/ywk6uiqwzktlkfwcszx2.png',
        filename: 'YelpCamp/ywk6uiqwzktlkfwcszx2'
    }
    ,
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702808357/YelpCamp/lpkawqcpmj6b6jf2asia.jpg',
        filename: 'YelpCamp/lpkawqcpmj6b6jf2asia'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702809958/YelpCamp/ahp90pivpmqesvknunwu.jpg',
        filename: 'YelpCamp/ahp90pivpmqesvknunwu'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702810026/YelpCamp/goaylun5noavbp13wneb.jpg',
        filename: 'YelpCamp/goaylun5noavbp13wneb'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702810026/YelpCamp/xiab2rr9ote9vsfmnbc2.jpg',
        filename: 'YelpCamp/xiab2rr9ote9vsfmnbc2'
    }, {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702810443/YelpCamp/gqjioceg9rsxbdfuzqnd.png',
        filename: 'YelpCamp/gqjioceg9rsxbdfuzqnd'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702810443/YelpCamp/jhi2bphxafhspoarkygv.png',
        filename: 'YelpCamp/jhi2bphxafhspoarkygv'
    },
    {
        url: 'https://res.cloudinary.com/dzengo527/image/upload/v1702810443/YelpCamp/eyo7rzgnv3m7iqru5gdn.png',
        filename: 'YelpCamp/eyo7rzgnv3m7iqru5gdn'
    }
]


const rand = () => {
    const num = Math.floor(Math.random() * pic.size) + 1;
}  
