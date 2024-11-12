const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let properties =[
    {id:1, name: "House A", rent: 5500, isBooked: true},
    {id:2, name: "House B", rent: 5500, isBooked: true},
    
]

app.get("/", (req, res)=>{
    res.send("Server is Up!");
});

app.get("/api/properties", (req, res)=>{
    res.json(properties);
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