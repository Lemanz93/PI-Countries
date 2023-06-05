import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../actions/actions";
import styles from "../Form/Form.module.css"

function validate(input) {
    let errors = {};
    let letters = /^[A-Za-z]+$/
  
    if (!input.name.trim()) {
      errors.name = "name is required";
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
      errors.name = "name must be only letters ";
    } 
  
    if (!input.difficulty) errors.difficulty = "difficulty is required";
    if (!input.duration) errors.duration = "duration is required";
    if (parseInt(input.duration) < 1 || parseInt(input.duration) > 30)
      errors.duration = "duration must be greater than 0 and less than 30";
    if (!input.season) errors.season = "season is required";
    if (!input.id.length === 0)
      errors.id = "country is required";
  
      console.log(errors)
    return errors;
  };

export default function Form(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        id: []

    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleRadioDifficulty(e){
        if(e.target.checked){
            setInput({
                ...input,
                difficulty: e.target.value
            })
           
        }else{
        setErrors(validate({
            ...input,
            difficulty : e.target.value
        }));
    }
    }

    function handleRadioSeason(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }else{
            setErrors(validate({
                ...input,
                difficulty : e.target.value
            }));
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            id: [...new Set([...input.id, e.target.value])], //evito que se dupliquen
        })
        setErrors(validate({
            ...input,
            id : e.target.value
        }));
    }

    function handleDelete(el){
        setInput({
            ...input,
            id: input.id.filter(cnt => cnt !== el)
        })
    }

    function handleSubmit(e){
        if (
            !input.name ||
            !input.difficulty ||
            !input.duration ||
            !input.season ||
            !input.id
          ) {
            e.preventDefault();
            alert("Complete todos los campos para poder continuar");
          } else {
            e.preventDefault();
            dispatch(postActivity(input));
            alert("Tu actividad ha sido creada exitosamente");
            // Para volver a la pantalla principal
            history.push("/countries");
            // Reseteamos el createAct
            setInput({
              name: "",
              difficulty: "",
              duration: "",
              season: "",
              id: [],
            });
          }
        
    }

    let sortedCountries = countries.sort(function(a, b) {
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
    })

    


    useEffect(() =>{
        dispatch(getCountries())
    }, [])


    return (


        
        <div className={styles.mainContainer}>
            
            <div className={styles.formTitle}>
            <h1>Create Your Own Activity</h1>
            </div>
            <Link  to="/home">
                <button className={styles.goBack}>Go Back</button>
            </Link>

            <form className={styles.formMain} onSubmit={(e) => handleSubmit(e)}>

                <div className={styles.formGroup}>

                    <label for="name" className={styles.formGroupName}>Name: </label>
                    <div className={styles.formGroupInput}>
                        <input className={styles.formInput}
                        type="text"
                        value={input.name}
                        name="name"
                        id="name"
                        placeholder="Insert activity name"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                        {errors.name && (
                            <p className={styles.errors}>{errors.name}</p>
                        )}
                    
                
                    <label for="difficulty" className={styles.formGroupDifficulty}>Difficulty: </label>
                    <div className={styles.formGroupRadio}>
                        <input id="difficulty" className={styles.formRadio} type="radio" name="difficulty" value="1" onChange={(e) => handleRadioDifficulty(e)}/>
                        <label>1</label>

                        <input className={styles.formRadio} type="radio" name="difficulty" value="2" onChange={(e) => handleRadioDifficulty(e)}/>
                        <label>2</label>

                        <input className={styles.formRadio} type="radio" name="difficulty" value="3" onChange={(e) => handleRadioDifficulty(e)}/>
                        <label>3</label>

                        <input className={styles.formRadio} type="radio" name="difficulty" value="4" onChange={(e) => handleRadioDifficulty(e)}/>
                        <label>4</label>

                        <input className={styles.formRadio} type="radio" name="difficulty" value="5" onChange={(e) => handleRadioDifficulty(e)}/>
                        <label>5</label>
                    </div>  
                        {errors.difficulty && (
                            <p className={styles.errors}>{errors.difficulty}</p>
                        )}
                    

                    <label for="duration" className={styles.formGroupDuration}>Duration in hours: </label>
                    <div className={styles.formGroupInput}>
                        
                        <input className={styles.formInput}
                        type="number"
                        min="1"
                        max="30"
                        id="duration"
                        value={input.duration}
                        name="duration" 
                        placeholder="1, 2, 3,... 30"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>   
                        {errors.duration && (
                            <p className={styles.errors}>{errors.duration}</p>
                        )}
                    

                    <label for="season" className={styles.formGroupSeason}>Seasons</label>
                    <div className={styles.formGroupRadio}>
                        <input className={styles.formRadio} type="radio" id="season" name="season" value="summer" onChange={(e) => handleRadioSeason(e)}
                        />
                        <label>Summer</label><br />

                        <input type="radio" name="season" value="autumn" onChange={(e) => handleRadioSeason(e)}/>
                        <label>Autumn</label><br />

                        <input type="radio" name="season" value="winter" onChange={(e) => handleRadioSeason(e)}/>
                        <label>Winter</label><br />

                        <input type="radio" name="season" value="spring" onChange={(e) => handleRadioSeason(e)}/>
                        <label>Spring</label>
                    </div>   
                        {errors.season && (
                            <p className={styles.errors}>{errors.season}</p>
                        )}
                    
                    
                    <label for="countries" className={styles.formGroupCountries}>Select Countries</label>
                    <div className={styles.formGroupSelect}>
                        <select id="countries" className={styles.formSelect} onChange={(e) => handleSelect(e)}>
                            <option >Countries</option>
                            {sortedCountries.map((cnt, i) => (
                                <option key={i} value={cnt.id}>{cnt.name}</option>
                            )) }
                        </select>
                    </div>    
                        {errors.id && (
                            <p className={styles.errors}>{errors.id}</p>
                        )}
                    
                    <br />


                    <div className={styles.formGroupButton}>
                        <button type="submit">Create Activity</button>
                    </div>
                    
                </div>
            </form>
            
            <div className={styles.display}>
            {input.id.map((el, i)=> (
                    <div className={styles.displayCountries}>
                        <label key={i}>{el}</label>
                        <button className="botonX" onClick={() => handleDelete(el)}>x</button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}