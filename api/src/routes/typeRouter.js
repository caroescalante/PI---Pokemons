const { Router } = require("express");
const { typesHandler } = require('../Handlers/typeHandler')


const typeRouter = Router();


typeRouter.get('/', typesHandler)
 
module.exports = typeRouter;