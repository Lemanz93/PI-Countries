import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { filterBySeason } from '../../actions/actions';
import style from "../FilterActivity/FilterActivity.module.css"

export default function FilterActivity({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [selectSeason, setSelectSeason] = useState([])
  
 
  const handleChange = (e) => {
    const seasons = e.target.value
    setCurrentPage(1);
    setSelectSeason(seasons)
    dispatch(filterBySeason(seasons));
    };

    function toggleDropdown(){
      setIsOpen(!isOpen)
    }

  return (
    <div>
      <div className={style.filter}>
        <button className={style.filterName} onClick={toggleDropdown}>
          Filter Season
        </button>
        {isOpen && (
          <div> 
            <div className={style.filterList}>
        <label className={style.filterTitle}>
          <input
          id="all"
          type="checkbox"
          name='all'
          value='all'
          checked={selectSeason.includes('all')}
          onChange={handleChange}
          />
          All
        </label>

        <label className={style.filterTitle}>
          <input
          id="all" 
          type="checkbox"
          name='Summer'
          value='summer'
          checked={selectSeason.includes('summer')}
          onChange={handleChange}
          />
          Summer
        </label>

        <label className={style.filterTitle}>
          <input
          id="all" 
          type="checkbox"
          name='Spring'
          value='spring'
          checked={selectSeason.includes('spring')}
          onChange={handleChange}
          />
          Spring
        </label>

        <label className={style.filterTitle}>
          <input
          id="all" 
          type="checkbox"
          name='Autumn'
          value='autumn'
          checked={selectSeason.includes('autumn')}
          onChange={handleChange}
          />
          Autumn
        </label>

        <label className={style.filterTitle}>
          <input
          id="all" 
          type="checkbox"
          name='Winter'
          value='winter'
          checked={selectSeason.includes('winter')}
          onChange={handleChange}
          />
          Winter
        </label>
      </div>
          </div>
        )}
      </div>
      
    </div>
  );
}