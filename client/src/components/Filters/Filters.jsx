import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
    filterType,
    getAllPokemons,
    orderByName,
    orderByAttack,
    filterCreated,
    getAllTypes,
    getClean,
    resetFilters,
    filterLife
  } from "../../redux/actions";
  import style from './Filters.module.css'



export default function Filters({ setCurrentPage, setOrden }){

    const dispatch = useDispatch()
    const allTypes = useSelector((state) => state.type);
    const [localState, setLocalState] = useState({})

    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    const handleClick = (e) => { 
        e.preventDefault();
        dispatch(getAllPokemons());
        dispatch(resetFilters)
    };

    const handleFilterByType = (e) => {
        e.preventDefault(e);
        dispatch(filterType(e.target.value)); // llamo a la action que me interesa
        setCurrentPage(1);
        setOrden(e.target.value); // cambio el orden de los perritos
    }

    const handleSort = (e)=> {
      e.preventDefault();
      e.target.value === 'all'
        ? dispatch(orderByName) && setOrden(`ABC ${e.target.value}`)
        : dispatch(orderByName(e.target.value));
      setOrden(`ABC ${e.target.value}`);
      setCurrentPage(1);
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

   function handleFilterByCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handlerFilterLife(e) {
      e.preventDefault()
      dispatch(filterLife(e.target.value))
      setOrden(e.target.value)
    }

    return(
        <div className={style.grupo} >
             <button className={style.boton} onClick={e => handleClick(e)}> 
                    Reset Filters 
              </button><br/>
            <div> {/*PARA LOS FILTROS*/}
               <select className={style.boton} onChange={(e) => handleSort(e)}>
                  <option value='ABC' disabled selected hidden>  Filter by ABC  </option>
                  <option value='A-Z'> A - Z </option>
                  <option value='Z-A'> Z - A </option>
                </select>

              <select defaultValue="TYPE"  className={style.boton} onChange={(e) => handleFilterByType(e)} >
                 <option  value="TYPE" disabled selected>
            Filter by type
          </option>
          { allTypes?.map( (t) => {  // recorro el array de temperamentos
            return(
                <option key={t.id} value={t.name}>
                    {" "}
                    {t.name} {/* muestro el nombre del temperamento */}
                </option>
            ) 
           
          }
          )}
        </select>
        </div>

        <div>
        <select  className={style.boton} onChange={(e) => handleFilterByCreated(e)}>
          <option value='CREATED' disabled selected hidden> 
            Filter by create
          </option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
        <select defaultValue="ATTACK" className={style.boton} onChange={(e) => handleSortAttack(e)}>
          <option value="ATTACK" disabled selected hidden>
            Order by attack
          </option>
          <option value="min">Attack Min</option>
          <option value="max">Attack Max</option>
        </select>
        </div>
        
        <div>
          <select  defaultValue='MAX' className={style.boton} onChange= {(e) => handlerFilterLife(e)}>
          <option value="MAX" disabled selected hidden> Life max </option>
          <option value="max"> MAX</option>
          </select>
        </div>

        </div>
    )
}

  

   

  

