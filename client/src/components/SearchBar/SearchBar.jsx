import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getPokemonsForName } from '../../redux/actions'
// import { useHistory } from "react-router-dom";
import style from './SearchBar.module.css'
import { getAllPokemons } from '../../redux/actions';


export const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchPokemon, setSearchPokemon] = useState('')
    
    useEffect(() => {
        dispatch(getAllPokemons);
    }, [dispatch]);

    const handleInput = (e) => {
        e.preventDefault()
        setSearchPokemon(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPokemonsForName(searchPokemon))
    }

    return (
        <div className={style.container}>
            <input className={style.search} type="text" onChange={e => handleInput(e)}  placeholder="Search..."/>
            <button className={style.button} type="submit" onClick={e => handleSubmit(e)}>❔</button>
            
        </div>
    )
}

export default SearchBar;