import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, getActivities, filterByContinent, filterByActivity, orderByName, orderByPopulation } from "../../actions/actions"
import React from "react"
import { Link } from "react-router-dom"
import Paginado from "../../components/Paginado/Paginado"
import SearchBar from "../../components/SearchBar/SearchBar"
import FilterActivity from "../../components/FilterActivity/FilterActivity"
import style from "../Home/Home.module.css"
import Loader from "../../components/Loader/Loader"

export default function Home(){

    const dispatch = useDispatch()
    

    const allCountries = useSelector((state) => state.countries)

    const allActivities = useSelector((state) => state.activities)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }




    useEffect(() =>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries())
    }

    function handleFilteredByContinents(e){
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
    }

    function handleFilteredByActivity(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Odenado ${e.target.value}`)
    }

    function handleOrderByPopulation(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Odenado ${e.target.value}`)
    }

    return(
        <div className={style.mainContainer}>
            
            
            <div className={style.title}>
            <p>COUNTRIES APP</p>
            </div>

            <div>
            <Link  to ="/form">
                <button className={style.buttonCreate}>Create Activity</button>
            </Link>
            </div>
           

            <div className={style.orderAndFilters}>
                <div className={style.orderAlphPop}>
                    <div className={style.orderTitle} >
                        <h3>Order by</h3>
                    </div>
                    <div className={style.orders}>
                        
                        <select onChange={e => handleOrderByName(e)}>
                            <option value="">Alphabetically</option>
                            <option value="atoz"> A to Z</option>
                            <option value="ztoa">Z to A</option>
                        </select>
                    </div>
                    
                    

                    <div className={style.ordersBottom} >
                            <select  onChange={e => handleOrderByPopulation(e)}>
                                <option value="">Population</option>
                                <option value="asc">Less Population</option>
                                <option value="desc">More Population</option>
                            </select>
                    </div>

                </div>
                
                <div className={style.filterContAct}>

                        <div className={style.filterTitle}>
                            <h3>Filter by</h3>
                        </div>
                        <div className={style.filters}>
                            <select onChange={e => handleFilteredByContinents(e)}>
                                <option value="all">Continents</option>
                                <option value="Africa">Africa</option>
                                <option value="Antarctica">Antartica</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="North America">North America</option>
                                <option value="South America">South America</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </div>

                        <div className={style.filtersBottom}>
                            <select onChange={e => handleFilteredByActivity(e)}>
                                <option value="all">Activities</option>
                                {allActivities && allActivities.map((el, i) => (
                                    <option key={i} value={el.name}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                </div>    
            </div>
                    <button className={style.clearFilter} onClick={(e) => {handleClick(e)}}>
                    Clear Filter
                    </button>
                   <div> 

                    {allCountries.length === 0 && (
                        <div>
                            <Loader />
                        </div>
                    )}
                    {allCountries.length > 0 && ( 

                        <div className={style.searchBar}>
                            <Paginado countriesPerPage={countriesPerPage}
                            allCountries={allCountries.length}
                            paginado={paginado} />


                            <SearchBar setCurrentPage={setCurrentPage}/>

                            <CardsContainer currentCountries={currentCountry}/>
                        </div>

                        )}

                    

                    
            </div>  
                    
                     
                     
                       

        </div>
    )
}

/**awda

 * awdawd
 */