import React from 'react'
import {Link} from 'react-router-dom'
import style from './NavBar.module.css'
import { getAllPokemons } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const NavBar = ()=>{

    const dispatch = useDispatch();

    const handlerHome = () => {
        dispatch(getAllPokemons())
    }

    return(
        <div className={style.mainContainer}>
            <Link to='/home'>
                <button className={style.home} onClick={handlerHome}>Home</button>
            </Link>
            
            <Link to="/create">Form</Link>
        </div>
    )
}




export default NavBar;
