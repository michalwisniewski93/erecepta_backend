const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Login = require("./models/Login");
const Doctors = require("./models/Doctors")
const Activeprofile = require('./models/Activeprofile')
const Patients = require('./models/Patients')
const Recipes = require('./models/Recipes')
const Permission = require('./models/Permission')

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


app.get("/activeprofile", async (req, res) => {
  try {
    const activeprofiles = await Activeprofile.findOne();
    res.json(activeprofiles);
    
  } catch (err) {
    res.status(400).send("Error fetching active profile");
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


app.put("/activeprofile/:id", async (req, res) => {
  try {
    const updatedProfile = await Activeprofile.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { name: req.body.name, surname: req.body.surname, accesscode: req.body.accesscode, pwz: req.body.pwz, phonenumber: req.body.phonenumber, address: req.body.address },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).send("Error updating doctor");
  }
});



app.get("/patients", async(req, res) => {
  try{
    const patients = await Patients.find();
    res.json(patients);
  }catch(err){
    res.status(400).send("Error fetching patients");
  }
});



app.post('/patients', async (req, res) => {
  const newPatients = new Patients({
    name: req.body.name,
    surname: req.body.surname,
    pesel: req.body.pesel,
    street: req.body.street,
    city: req.body.city,
    postcode: req.body.postcode,
    country: req.body.country,
    patientsystemnumber: req.body.patientsystemnumber,
    
  })
  try {
    await newPatients.save();
    res.status(201).json(newPatients);
  } catch (err) {
    res.status(400).send("Error adding patient");
  }
})

app.delete("/patients/:id", async (req, res) => {
  try {
    const patients = await Patients.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted", patients });
  } catch (err) {
    res.status(400).send("Error deleting patient");
  }
});



app.put("/patients/:id", async (req, res) => {
  try {
    const updatedPatient = await Patients.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { name: req.body.name, surname: req.body.surname, pesel: req.body.pesel, street: req.body.street, city: req.body.city, postcode: req.body.postcode, country: req.body.country, patientsystemnumber: req.body.patientsystemnumber },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).send("Error updating patient");
  }
});

app.get("/recipes", async(req, res) => {
  try{
    const recipes = await Recipes.find();
    res.json(recipes);
  }catch(err){
    res.status(400).send("Error fetching recipes");
  }
});

app.post('/recipes', async (req, res) => {
  const newRecipes = new Recipes({
    barcodenumber: req.body.barcodenumber,
    dateofissuedata: req.body.dateofissuedata,
    recipescontentinfo: req.body.recipescontentinfo,
    patient: req.body.patient,
    doctorsname: req.body.doctorsname,
    doctorssurname: req.body.doctorssurname,
    doctorsaccesscode: req.body.doctorsaccesscode,
    doctorspwz: req.body.doctorspwz,
    doctorsphonenumber: req.body.doctorsphonenumber,
    doctorsaddress: req.body.doctorsaddress,
    patientsystemnumber: req.body.patientsystemnumber,

    
  })
  try {
    await newRecipes.save();
    res.status(201).json(newRecipes);
  } catch (err) {
    res.status(400).send("Error adding recipe");
  }
})

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipes = await Recipes.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted", recipes });
  } catch (err) {
    res.status(400).send("Error deleting recipe");
  }
});


app.get("/permission", async(req, res) => {
  try{
    const permission = await Permission.find();
    res.json(permission);
  }catch(err){
    res.status(400).send("Error fetching permission");
  }
});


app.put("/permission/:id", async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { permission: req.body.permission },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedPermission);
  } catch (err) {
    res.status(400).send("Error updating permission");
  }
});




// Uruchamiamy serwer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
