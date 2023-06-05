import style from "./Card.module.css"

export default function Card({flag, name, continent}){
    return (
        <div className={style.card}>
            <img src={flag} alt="img not found" />
            <h2>{name}</h2>
            <h3>{continent}</h3>
        </div>
    )
}