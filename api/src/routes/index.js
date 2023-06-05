const { Router } = require('express');
const { getAllCountriesHandler, getAllActivitiesHanlder, getCountryHandler, createNewActivity } = require("../handlers/countriesHandlers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/countries", getAllCountriesHandler)

router.get("/countries/:id", getCountryHandler)

router.get("/activities", getAllActivitiesHanlder)

router.post("/activities", createNewActivity)

module.exports = router;
