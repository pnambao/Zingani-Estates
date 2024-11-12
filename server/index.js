require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Property = require("./models/property");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("MongoDB connect"))
.catch((err)=> console.log("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is Up!");
});

app.get('/api/test-db', async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping(); // Ping the database
      res.json({ message: "Database connected successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Database connection failed.", error: err.message });
    }
  });

app.get("/api/properties", async (req, res)=>{
    try{
        const properties = await Property.find();
        res.json(properties);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

app.post("/api/properties", (req, res)=>{

    const{name, rent, isBooked} = req.body;
    const newProperty = { id: properties.length + 1, name, rent, isBooked};
    properties.push(newProperty);
    res.status(201).json(newProperty);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});