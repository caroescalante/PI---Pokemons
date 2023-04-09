const {Pokemon, Type}= require('../db')
const axios = require('axios')


const apiFn = async () => {
     //traer la info de la api
     
     const info = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
     const apiUrls = await info.data.results.map((e)=>{ return { url: e.url }})
     let allInfo = await apiUrls.map(e=> {
        return axios.get(e.url)
    })
    allInfo = await Promise.all(allInfo) 
     const getApiInfo = await allInfo.map((e) => { 
         return {
             id: e.data.id,
             name: e.data.name,
             image: e.data.sprites.other.home.front_default,
             life: e.data.stats[0].base_stat,
             attack: e.data.stats[1].base_stat,
             speed: e.data.stats[5].base_stat,
             defense: e.data.stats[2].base_stat,
             height: e.data.height,
             weight: e.data.weight,
             types: e.data.types.map(t => { return {name: t.type.name}})
     }
   })
   
   return getApiInfo;
}

const dbFn = async () => {
    const getDbInfo = await Pokemon.findAll({
        include : {
          model: Type,
          attributes: ['name'],
				  through: {
					  attributes: [],
				},}
      })
      const dbInfo = [...getDbInfo]
      console.log(dbInfo)
      return dbInfo
}

const getPokemons = async (name) => {
  const apiResult= await apiFn();
  const dbResult = await dbFn()
  const allData = [...apiResult,...dbResult]
  if (name){
    const pokemon = allData.filter((e) => e.name.includes(name));
    if(!pokemon) return ("Pokemon doesn´t found")
    else return pokemon
    
  }

  return allData
}

const getPokemonById = async (id,source) => {
    const apiPokemons = await apiFn();
    if(source==="api"){
      const resp =  apiPokemons.find(pokemon => pokemon.id  == id)
      return resp
    }return Pokemon.findByPk(id)

}

const createPokemon = async ({name, image, life, attack, speed, defense, height, weight, typeId}) => {
    // const pokemonChecked = await Pokemons.findAll({
    //     where: { name: { [Op.iLike]: `%${name}%` } }
    //   })
  
      //  if(pokemonChecked) { return ('The pokemon already exist') }
      //  if (![name, image, life, attack, speed, defense, height, weight, type]) return Error('Missing data')
       if(!name || !image || !life || !attack || !defense)return Error('Missing data')
      const newPokemon = await Pokemon.create({name, image, life, attack, speed, defense, height, weight}) 
      let pokemonsTypes = await Type.findAll({
        where:{ name: typeId }
      })
      newPokemon.addTypes(pokemonsTypes)

    
    return newPokemon
}


module.exports = {
    getPokemons,
    getPokemonById,
    createPokemon
}
