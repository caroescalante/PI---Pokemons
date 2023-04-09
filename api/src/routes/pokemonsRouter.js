const { Router } = require("express");
const {
  getPokemonsHandler,
  getIdHandler,
  createHandler
} = require('../Handlers/pokemonsHandler')

const pokemonsRouter = Router();


pokemonsRouter.get('/', getPokemonsHandler);

pokemonsRouter.get("/:id", getIdHandler);

pokemonsRouter.post("/", createHandler);
  


module.exports = pokemonsRouter;