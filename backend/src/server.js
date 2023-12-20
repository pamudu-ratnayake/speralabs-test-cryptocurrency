const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cryptocurrency Price Tracking",
            version: "1.0.0",
            description: "Cryptocurrency Price Tracking for spera labs test",
        },
    },
    apis: ["./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const authRoutes = require("../src/routes/userRT");
app.use("/auth-user", authRoutes);