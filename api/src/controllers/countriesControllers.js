const axios = require("axios")
const { Country, Activity} = require("../db")
const { Op } = require("sequelize")

const getAllCountriesController = async () => {

    let countries = await Country.findAll()

    if (countries.length === 0) {

            const allApiData = await axios.get("https://restcountries.com/v3/all")

            const resultMap = await allApiData.data.map((country) => {
              return {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags[1],
                continent: country.continents[0],
                capital: country.capital ? country.capital[0] : 'N/A',
                subregion: country.subregion,
                area: country.area,
                population: country.population,
              }
            })
      
            await Country.bulkCreate(resultMap);
            const countriesAndAct = await Country.findAll({
                include: {
                    model: Activity
                }
            })

            return countriesAndAct
            
    }else{
        let Allcountries = await Country.findAll({
            include: {
                model: Activity
            }
          });
        return Allcountries
    }
    
}

const searchCountryByName = async (name) => {

    const countryName = await Country.findAll({
        where: {
            name: {[Op.iLike]: `%${name}%`}
        }
    })

    return countryName
}

const getCountryController = async (id) => {
    
    const countryId = await Country.findByPk(id,{
        include: {
            model: Activity
        }
    })

    return countryId

}

const activityCreatedController = async (name, difficulty, duration, season, id) => {

    
        const activityCreated = await Activity.create({name, difficulty, duration, season})
        const countryId = await Country.findAll({
            where: {
                id: id
            }
        })
        activityCreated.addCountry(countryId)
    
}

const getAllActivitiesController = async () => {
    const activities = await Activity.findAll()

    return activities
}

module.exports = {
    getAllCountriesController,
    searchCountryByName,
    getCountryController,
    activityCreatedController,
    getAllActivitiesController
}