import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import styles from './Details.module.css'

import { getDescription, getClean } from "../../redux/actions";



function Details() {
  
  const  pokemonDescription  = useSelector((state) => state.pokemonDescription);

  console.log(pokemonDescription);
  const dispatch = useDispatch();
  const { id } = useParams();
 


  useEffect(() => {
    dispatch(getDescription(id));
    return () => {
      dispatch(getClean()); // limpia el state
    }
  }, [dispatch, id]);

const {
        name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        types } = pokemonDescription;

  

  return (
 
    <div className={styles.container}>

            <div className={styles.card}>
              <div className={styles.card_container}>
              
                <div className={styles.name}>
                  <h1>{name}</h1>
                </div>

                <div>
                  <img src={image} alt={name} className={styles.image} />
                </div>
                
                <div className={styles.container__info}>
                  <p>Life: {life} years</p>
                  <p>Attack: {attack}</p>
                  <p>Defense: {defense} </p>
                  <p>Speed: {speed}</p>
                  <p>Height: {height}</p>
                  <p>Weight: {weight}</p>
                  {
                    types ? (
                      <p>Types: {types.map(el=>el.name)}</p>
                    ) : (
                      <p>This pokemon has no types to show.</p>
                    )
                  }
                </div>
              </div>
            </div>
    </div>
  );
}

export default Details;