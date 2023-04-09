import React from "react"
import Card from "../Card/Card"
import style from './CardsContainer.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Paginate from '../Paginate/Paginate'
import { useState } from "react"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import { getAllPokemons, getAllTypes } from "../../redux/actions"
import Filters from "../Filters/Filters"
import SearchBar from "../SearchBar/SearchBar"
import Loading from "../Loading/image/Loading"




const CardsContainer = ()=>{

  const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.allPokemons)
    const copy = useSelector(state => state.pokemonsFilter)
    
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsInPage, setPokemonsInPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsInPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsInPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const currentCopy = copy.slice(indexOfFirstPokemon, indexOfLastPokemon)


    useEffect(() => {
      dispatch(getAllPokemons());
  }, [dispatch]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
    return (
      <div className={style.containerTotal}>

        <h1>POKEMONS HOME</h1>
        <div className={style.fil_conainer}>

          <SearchBar  key={'SearchBar'}/>
          <div className={style.filters}>
             { currentPokemons.length > 0 ? (
                  <Filters setCurrentPage={setCurrentPage}  key={'filters'} setOrden={setOrden} />
                 ) : (<div> <Loading /> </div>)
             }
          </div>

        </div>
        
      

        <div className="paginado">
            <Paginate pokemonsInPage={pokemonsInPage} pokemons={pokemons.length} key={'paginate'} paginate={paginate} currentPage={currentPage}/>
        </div>
        

          <div className = {style.pokemon}>
           { pokemons.length?(currentCopy?.map(p => {
            return(
              <Link to={'/detail/' + p.id}>
                <Card
                   key={p.id}
                   name={p.name}
                   image={p.image}
                   types={p.types.map(el => el.name)}
                  />
                </Link>
             )
              })
            ) : ( ( currentPokemons.map(p => {
              return(
                <Link to={'/detail/' + p.id}>
                  <Card
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    types={p.types.map(el => el.name)}
                    life={p.life}
                    attack={p.attack}
                    defense={p.defense}
                    speed={p.speed}
                    height={p.height}
                    weight={p.weight}
                    />
                  </Link>
               )
                })
              ) ) 
                }
        </div> 
        <Paginate pokemonsInPage={pokemonsInPage} pokemons={pokemons.length}  key={'paginate'} paginate={paginate}/>

      </div> 
    )
}


export default CardsContainer;