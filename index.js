const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Login = require("./models/Login");
const Doctors = require("./models/Doctors")

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB połączenie
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});



app.get("/login", async (req, res) => {
  try {
    const logins = await Login.find();
    res.json(logins);
    
  } catch (err) {
    res.status(400).send("Error fetching login");
  }
});



app.get("/doctors", async(req, res) => {
  try{
    const doctors = await Doctors.find();
    res.json(doctors);
  }catch(err){
    res.status(400).send("Error fetching doctors");
  }
});


app.get("/activeprofile", async(req, res) => {
  try{
    const doctors = await Doctors.findOne();
    res.json(doctors);
  }catch(err){
    res.status(400).send("Error fetching active doctor");
  }
});

app.post('/doctors', async (req, res) => {
  const newDoctors = new Doctors({
    accesscode: req.body.accesscode,
    name: req.body.name,
    surname: req.body.surname,
    pwz: req.body.pwz,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
    
  })
  try {
    await newDoctors.save();
    res.status(201).json(newDoctors);
  } catch (err) {
    res.status(400).send("Error adding doctor");
  }
})


app.delete("/doctors/:id", async (req, res) => {
  try {
    const doctors = await Doctors.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted", doctors });
  } catch (err) {
    res.status(400).send("Error deleting doctor");
  }
});

// Trasa do edycji elementu
app.put("/doctors/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctors.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { name: req.body.name, surname: req.body.surname, accesscode: req.body.accesscode, pwz: req.body.pwz, phonenumber: req.body.phonenumber, address: req.body.address },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).send("Error updating doctor");
  }
});




// Uruchamiamy serwer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
