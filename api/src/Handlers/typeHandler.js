const { getAllTypes } = require("../Controllers/typeControllers");



const typesHandler = async (req, res) =>{
    try {
        const types = await getAllTypes();
        res.status(200).send(types)
    } catch (error) {
        res.status(404).send(error)
    }
}





module.exports= { typesHandler };