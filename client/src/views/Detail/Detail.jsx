import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../Detail/Detail.module.css"
import Loader from "../../components/Loader/Loader";

export default function Detail(){
    
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [id, dispatch])

    const myCountry = useSelector((state) => state.detailCountry)
    console.log(myCountry)

    return(

        
        <div className={styles.mainContainer}>

            {myCountry.length === 0 && (
                <div>
                    <Loader />
                </div>
            )}

            <div className={styles.title}>
                <h1>DETAIL</h1>
            </div>

            <div className={styles.flagAndDesc}>
                <div className={styles.flag}>
                    <img src={myCountry.flag} alt="not found" width="100px" height="100px" />
                </div>

                <div className={styles.details}>
                    <h2 className={styles.detailsName}>{myCountry.name}</h2>
                    
                    <h2>ID: {myCountry.id}</h2>
                    <h2>Capital: {myCountry.capital}</h2>
                    {myCountry.subregion !== null &&
                    <h2>Subregion: {myCountry.subregion}</h2>
                    }
                    {myCountry.area > 0 &&
                    <h2>Area: {myCountry.area}</h2>
                    }
                    <h2>Population: {myCountry.population}</h2>

                    <h2>Continent: {myCountry.continent}</h2>
                </div>

                
            </div>
            <div className={styles.actAndValues}>
                <div className={styles.activityTitle}>
                    <h2>ACTIVITIES</h2>
                </div>
            
                <div className={styles.activitiesContainer}>
                    <div className={styles.activitiesDescription}>
                        <h3>Name</h3>
                        <h3>Difficulty</h3>
                        <h3>Duration Hrs</h3>
                        <h3>Season</h3>
                    </div>
                    {myCountry.activities?.length > 0 ? (

                        myCountry.activities?.map((el) => (
                            <div className={styles.activitiesValues}>
                                <h3>{el.name}</h3>
                                <h3>{el.difficulty}</h3>
                                <h3>{el.duration}</h3>
                                <h3>{el.season}</h3>
                            </div>
                        ))
                        
                    ) :(
                        <div className={styles.activitiesFailure}>
                        <h2>Activities not found</h2>
                        </div>
                    )}
                </div>
            </div>


            <Link to="/home">
                <button className={styles.goBack}>Go Back</button>
            </Link>
        </div>

        
    )
} 
/** 
 * myCountry.length > 0 ?
                <div>
                    <h1>{myCountry[0].name}</h1>
                    <h3>ID: {myCountry[0].id}</h3>
                    <img src={myCountry[0].flag} alt="img not found" width="100px" height="100px" />
                    <h3>Continent: {myCountry.continent}</h3>
                    {myCountry[0].capital &&
                    <h3>Capital: {myCountry[0].capital}</h3>
                    }
                    {myCountry[0].subregion &&
                    <h3>Subregion: {myCountry[0].subregion}</h3>
                    }
                    {myCountry[0].area &&
                    <h3>Area: {myCountry[0].area}</h3>
                    }
                    <h4>Population: {myCountry[0].population}</h4>
                    {myCountry[0].activities &&
                    <h4>{myCountry[0].activities.map(el => el.name + (" "))}</h4>}
 * 
*/