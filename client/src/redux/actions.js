import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"; // get all poke
export const GET_DESCRIPTION = "GET_DESCRIPTION"; // get description
export const GET_POKEMONS_FOR_NAME = "GET_POKEMONS_FOR_NAME"; // get pokes for name
export const GET_ALL_TYPES = "GET_ALL_TYPES"; // get description
export const FILTER_TYPE = "FILTER_TYPE"; // filter tipe
export const ORDER_BY_NAME = "ORDER_BY_NAME"; // order by name
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"; // order by weight
export const FILTER_CREATED = "FILTER_CREATED"; // filter created
export const GET_CLEAN = "GET_CLEAN"; // get clean
export const POST_POKEMON = "POST_POKEMON" ; // post POKEs
export const RESET_FILTERS = "RESET_FILTERS"; //resetea todos los filtros, limpiando los estados
export const ERROR = "ERROR"; // error
export const FILTER_LIFE = "FILTER_LIFE" //filtrar mayor a menor por vida




// Action para obtener datos desde el back el cual esta corriendo en el puerto 3001
export const getAllPokemons = () => {
    return async function(dispatch){
        try {
            const apiData = await axios.get('http://localhost:3001/pokemons');
            const allData = apiData.data;
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: allData,
            })
        } catch (error) {
            dispatch({
                type: Error,
                payload: error,
            })
        }
    }
}


export const getAllTypes = () => {
    // Obtengo todos los types de mi back
    return async function (dispatch) {
        try {
            const api = await axios.get(`http://localhost:3001/type`);
          
            return dispatch ({
                type: GET_ALL_TYPES,
                payload: api.data
            })
        }
        catch(error) {
            return dispatch ({
                type: ERROR,
            })
        }
    }
}

export const getDescription = (id) => {
    // Enviar el id al reducere para crear la seccion de Description
    return async function (dispatch) {
        try {
            const api = await axios.get(`http://localhost:3001/pokemons/${id}`);
            console.log(api.data);
            return dispatch ({
                type: GET_DESCRIPTION,
                payload: api.data
            })
        }
        catch(error) {
            return ({
                type: ERROR,
            })
        }
    }
}

export function getPokemonsForName (name)  {
    return async function (dispatch) {
        // let letra= name.toLowerCase().charAt(0).toUpperCase()+ name.toLowerCase().slice(1)
        let letra = name.toLowerCase()
        try{
            const pokeData = await axios.get(`http://localhost:3001/pokemons?name=${letra}`)
             const allData = pokeData.data
          if (allData) {
           dispatch({
                type: GET_POKEMONS_FOR_NAME,
                payload: allData,
            })
          } else {
            return alert("Pokemon doesnt found")
          }
            
            
        } catch(error){
            dispatch({
                type: Error,
                payload: error,
            })
        }
    }
}

export function postPokemon (payload) {
    return async function(dispatch){
        try {
            const api = await axios.post('http://localhost:3001/pokemons/', payload )
            dispatch({
                type: POST_POKEMON
            });
        } catch (error) {
            dispatch({
                type: Error,
                payload: error,
            });
        }
    }

}

// Utils

export function setError ()  {
    return { type: ERROR };
};

export function getClean () {
    return{
        type: GET_CLEAN,
        payload: []
    }
}

// Filters

export const filterType = (types) => {
   //en types recibe el nombre del filtro
    return {
        type: FILTER_TYPE,
        payload: types

    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    };
}

export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function filterCreated(payload){ 
    return {    
        type: FILTER_CREATED,
        payload
    }
}

export function resetFilters(payload){ 
    return {    
        type: RESET_FILTERS,
        payload
    }
}


export function filterLife(payload){
    return{
        type: FILTER_LIFE,
        payload
    }
}
