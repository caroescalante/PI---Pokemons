import React from "react";
import style from './Paginate.module.css'

export default function Paginate( { pokemonsInPage, pokemons, paginate } ){
    const pageNumbers = [];
    
    for (let i = 1; i < Math.ceil(pokemons/pokemonsInPage); i++) {
        pageNumbers.push(i);
    }
    return( 
            <nav> {/*etiqueta de navegación*/}
                <ul className={style.pagination} >
                    {
                        pageNumbers?.map(number => (
                             <button  >
                                <a  onClick={() => paginate(number) } className={style.active} key={number}  >{number}</a>
                            </button>
                        ))
                    }
                </ul>
             </nav>
    
        
    )
}