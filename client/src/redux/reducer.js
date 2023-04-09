import { 
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_POKEMONS_FOR_NAME,
    FILTER_TYPE,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    FILTER_CREATED,
    POST_POKEMON,
    RESET_FILTERS,
    FILTER_LIFE
  } 
  from "./actions";
  
  // Estado inicial
  const initialState = {
    allPokemons: [], // Array de pokemones
    pokemonsFilter: [], // Array de pokemones filtrados
    type: [],
    pokemonDescription: [],
    copyState:[],
    error: false,
  }
  
  
  // Reducer
  const rootReducer = (state = initialState, action) => {
    switch(action.type){
        // Obtener todos los dogs tanto de la api como la base de datos
          case GET_ALL_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                pokemonsFilter: action.payload,
                copyState: action.payload
            }
  
        case GET_ALL_TYPES:
            return{
                ...state,
                type: action.payload
            }
  
        case GET_DESCRIPTION:
            // obtener la descripcion 
            console.log(action.payload);
            return{
                ...state,
                pokemonDescription: action.payload,
                error:false
            }
  
        case POST_POKEMON:
            return { ...state };
        
        case GET_POKEMONS_FOR_NAME:
          // console.log('entré')
          // console.log(action.payload); //vacío
          return{
            ...state,
            pokemonsFilter: action.payload,
            error: false
        }
        
        case FILTER_TYPE:
          const pokemonsType = state.allPokemons;
          let pokemonFilter;
          if (action.payload === "Types") {
              pokemonFilter = pokemonsType;
          } else {
             let priFil = pokemonsType.filter(el => el.types.find(e => e.name === action.payload))
             pokemonFilter = priFil;
          }
          return {
              ...state,
              pokemonsFilter: pokemonFilter
          };
        
        case ORDER_BY_NAME:
            // ordenar los perros por nombre
            const pokemonsFilterName = state.allPokemons;
            let ordenado;
            if (action.payload === "Nombre") {
              ordenado = pokemonsFilterName;
            } else {
              ordenado =
                action.payload === "A-Z"
                  ? state.allPokemons.sort(function (a, b) {
                      if (a.name > b.name) {return 1 }
                      if (b.name > a.name) {
                        return -1;
                      }
                      return 0;
                    })
                  : state.allPokemons.sort(function (a, b) {
                      if (a.name > b.name) {
                        return -1;
                      }
                      if (b.name > a.name) {
                        return 1;
                      }
                      return 0;
                    });
            }
            return {
                ...state,
                copyState: ordenado,
            };  
  
  
        case ORDER_BY_ATTACK:
          let orderAttack;
            if(action.payload === "min"){
                orderAttack = state.allPokemons.sort(function(a, b){
                    if(a.attack < b.attack) return -1 
                    if(a.attack > b.attack) return 1
                    return 0;
                })
            } else {
                orderAttack = state.allPokemons.sort(function(a, b){
                    if(a.weightMin > b.weightMin) return -1
                    if(a.weightMin < b.weightMin) return 1 
                    return 0;
                })
            }
  
            return{
                ...state,
                pokemonsFilter: orderAttack
            }
  
        case FILTER_CREATED:
          const localState = state.copyState;
          let allFilter;
          console.log(localState);
          if (action.payload === "api") {
              allFilter = localState;
          } else if (action.payload === "db") {
              allFilter = localState.filter((el) => isNaN(el.id) );
              
          }           
          return {
            ...state,
            pokemonsFilter: allFilter
          }
          
        case GET_CLEAN:
            // limpiar el estado
            return{
                ...state,
                pokemonDescription: action.payload 
            }
        
       case RESET_FILTERS:
          return {
            ...state,
            copyState: action.payload,
            pokemonFilter: action.payload,
          }

          case FILTER_LIFE:
            let orderLife;
            if(action.payload === "max"){
              orderLife = state.allPokemons.sort(function(a,b){
                if(a.life > b.life) return 1
              })
            }
            return {
              ...state,
              pokemonFilter: orderLife
            }

       
        default:
            return {...state}; // Retorno el estado actual
    }
  }
  
  
  export default rootReducer;