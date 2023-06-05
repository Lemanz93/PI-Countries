import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { Link } from "react-router-dom";

export default function Cards({currentCountries}) {

    return (
      <div className={style.cardsContainer}>
        {
        currentCountries?.map((c) => {
          return (
              <Link key={c.id} to={`/detail/${c.id}`} className={style.link}>
                <Card name={c.name} continent={c.continent} flag={c.flag} season={c.season} />
              </Link>

          );
        })
        }
      </div>
      
    );
  }