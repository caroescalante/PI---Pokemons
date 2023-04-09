import React from "react";
import { Link } from 'react-router-dom'
import style from './Landing.module.css'

export default function LandingPage () {
    return (
        <div > 
        
           
            <div className={style.background}>

                <div className={style.title}>
                    <h1>WELCOME TO THE POKEMONS HOUSE</h1>
                </div>

                <div className={style.button}>
                    <Link to='/home'>
                         <button className={style.patita}>➜ </button>
                    </Link>
                </div>
               
            </div>
           
        </div>
    )
}