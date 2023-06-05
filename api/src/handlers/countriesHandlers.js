const { getAllCountriesController, searchCountryByName, getCountryController, activityCreatedController, getAllActivitiesController } = require("../controllers/countriesControllers")

const getAllCountriesHandler = async (req, res) => {
    
    const { name } = req.query

    try {
        if(name){
            const results = await searchCountryByName(name)
            if(results.length === 0){
                res.status(400).json({error: `No se encuentra ningun pais por nombre ${name}`})
            }else{
                res.status(200).json(results)
            }
            
        }
        else{
            const results = await getAllCountriesController()
            res.status(200).json(results)
        }
    } catch (error) {
        res.status(400).json(error)
    }

}

const getCountryHandler = async (req, res) => {
    const id = req.params.id.toUpperCase()

    try {
        const countryId = await getCountryController(id)
        if(countryId === null || countryId.length === 0){
            res.status(400).send({error: `No se encuentra ningun pais con el id ${id}`})
        }else{
            res.status(200).json(countryId)
        }
    }catch(error){
        res.status(400).send(error)
    }
}
const createNewActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, id } = req.body;
        const activity = await activityCreatedController(name, difficulty, duration, season, id)
        return res.status(201).json(activity)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const getAllActivitiesHanlder = async (req, res) => {
    try {
        const results = await getAllActivitiesController()
        return res.status(200).json(results)
    } catch (error) {
        return res.status(404).json(error)
    }

}

module.exports =  {
    getAllActivitiesHanlder,
    getAllCountriesHandler,
    createNewActivity,
    getCountryHandler
}