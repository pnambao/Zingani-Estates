require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

//importing routes
const propertyRoutes = require("./routes/propertyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
//using routes
app.use("/api/properties", propertyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tenants", tenantRoutes);

//connection to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("MongoDB connect"))
.catch((err)=> console.log("Error connecting to MongoDB:", err));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});