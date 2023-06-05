import { GET_COUNTRIES, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_NAME_COUNTRIES, POST_ACTIVITY, GET_DETAIL, FILTER_BY_SEASON } from "../actions/actions"


const initialState = {
    countries: [],
    activities: [],
    countriesCopy: [],
    detailCountry: [],
    actCountries: []
}

const rootReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload, countriesCopy: action.payload, actCountries: action.payload}

        case GET_ACTIVITIES:
            return{...state, activities: action.payload}

        case GET_NAME_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }

        case GET_DETAIL:
            return{
                ...state,
                detailCountry: action.payload
            }

        case POST_ACTIVITY:
            return{
                ...state
            }
        
        case FILTER_BY_CONTINENT:
            const countriesCont = state.countriesCopy
            const continentsFiltered = action.payload === "all" ? countriesCont : countriesCont.filter(el => el.continent === action.payload)
            return{
                ...state,
                countries: continentsFiltered
            }
        
       

            case ORDER_BY_NAME:
                let sortedCountries =  action.payload === 'atoz' ?
                state.countries.sort(function(a, b) {
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function(a, b) {
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    countries: sortedCountries
                } 
            
            case ORDER_BY_POPULATION:
                let sortedPopulation =  action.payload === 'asc' ?
                state.countries.sort(function(a, b) {
                    if(a.population > b.population){
                        return 1
                    }
                    if(b.population > a.population){
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function(a, b) {
                    if(a.population > b.population){
                        return -1
                    }
                    if(b.population > a.population){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    countries: sortedPopulation
                }
                case FILTER_BY_ACTIVITY:
                const countriesAct = state.actCountries
                const activitiesFiltered = action.payload === "all" ? countriesAct.filter((el) => el.activities?.length > 0) : countriesAct.filter((el) => el.activities?.some((s) => s.name.includes(action.payload)) )
                
                return{
                    ...state,
                    countries: activitiesFiltered
                }
            
                case FILTER_BY_SEASON:
                    const { payload } = action;
                    console.log(payload);
                  
                    const filteredActivities = state.countriesCopy.map((act) => {
                      console.log(act.activities);
                      const temporada = act.activities?.map((el) => ({ seasons: el.season }));
                      console.log(temporada);
                      return {
                        id: act.id,
                        name: act.name,
                        flag: act.flag,
                        continent: act.continent,
                        capital: act.capital,
                        population: act.population,
                        activities: temporada,
                      };
                    });
                  
                    let seasonActivities = [];
                    if (payload === 'all') {
                      seasonActivities = filteredActivities.filter((el) => el.activities?.length > 0);
                    } else {
                      seasonActivities = filteredActivities.filter((el) =>
                        el.activities?.some((s) => s.seasons && s.seasons.includes(payload))
                      );
                    }
                  
                    console.log(seasonActivities);
                  
                    return {
                      ...state,
                      countries: seasonActivities,
                    };


        default:
            return { ...state}
    }


}

export default rootReducer