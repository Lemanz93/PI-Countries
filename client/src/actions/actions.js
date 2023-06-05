import axios from "axios"

export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION"
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES"
export const POST_ACTIVITY = "POST_ACTIVITY"
export const GET_DETAIL = "GET_DETAIL"
export const FILTER_BY_SEASON = "FILTER_BY_SEASON"


export function getCountries(){
    return async function (dispatch) {
        var countriesBd = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: GET_COUNTRIES,
            payload: countriesBd.data
        })
          
    }
}

export function getActivities(){
    return async function (dispatch){
        var activitiesBd = await axios.get("http://localhost:3001/activities")
        return dispatch({
            type: GET_ACTIVITIES,
            payload: activitiesBd.data
        })
    }
}

export function getNameCountries(name){
    return async function(dispatch){
        try{
            var cnn = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: cnn.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/countries/" + id)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postActivity(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/activities", payload)
        console.log(response)
        return response 
    }
}

export function filterByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function filterBySeason(payload){
    console.log(payload)
    return {
    type: FILTER_BY_SEASON,
    payload
  };
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}