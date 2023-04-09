const { getPokemonById, createPokemon, getPokemons } = require("../Controllers/pokemonControllers");


  const getPokemonsHandler = async (req,res)=>{
    
    try {
      const { name }= req.query
      const pokemon =
      name ? (await getPokemons(name))
      : await getPokemons()
      res.status(200).json(pokemon)      
    } catch (error) {
      res.status(404).send(error)
    }
      }
    
    const getIdHandler = async (req, res)=>{
      const { id } = req.params 
      const source = isNaN(id) ? "db" : "api"
        try {
          const pokemon = await getPokemonById(id, source);
          res.status(200).json(pokemon);
        } catch (error) {
          res.status(404).send(error.message);
        }
      }
      
    const createHandler = async (req, res) => {
        try {
          const  {name, image, life, attack, speed, defense, height, weight, typeId} = req.body;
          const newPokemon = await createPokemon({name, image, life, attack, speed, defense, height, weight, typeId});
          console.log(newPokemon)
          res.status(200).send("Successfully created.");
        } catch (error) {
          res.status(404).json({ error: error.message }); //el error.message es el throw q se maneja en el catch del controller
        }
      }


module.exports = {
    getPokemonsHandler,
    getIdHandler,
    createHandler
}


