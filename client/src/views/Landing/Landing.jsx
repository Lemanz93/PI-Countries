import React from "react"
import { Link } from "react-router-dom"
import styles from "../Landing/Landing.module.css"

export default function Landing(){

    return(
        <div className={styles.mainContainer}>
            <div className={styles.landing}>

                <div className={styles.title}>
                    <h1>WELCOME</h1>
                </div>

               
            </div>
            
             
                    <Link to="/home">
                        <button>START NOW</button>
                    </Link>
        
        </div>
    )
}
    