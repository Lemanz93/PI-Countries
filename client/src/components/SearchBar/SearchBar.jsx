import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { getNameCountries } from "../../actions/actions";
import styles from "../SearchBar/SearchBar.module.css"

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        setName("")
        setCurrentPage(1)
    }
    

    return (
        <div className={styles.searchBarContainer}>
            <input
            className={styles.searchBar}
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
             />

             <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
