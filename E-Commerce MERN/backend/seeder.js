const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const User = require("./Models/User");
const Cart = require("./Models/Cart");
const products = require("./data/products");

dotenv.config();

//connect to mongooDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data

const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        //Create a default admin user
        const createduser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        //Assign te default user ID to each product 
        const userID = createduser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        //Insert The products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully");

    } catch (error) { 
        console.error("Error seeding the data", error);
        process.exit(1);
    }
};

seedData();