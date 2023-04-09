const { Type } = require('../db');
const axios = require('axios')

const apiType = async () => {
    const apiTypes = await axios.get (`https://pokeapi.co/api/v2/type`);
    const info = await apiTypes.data.results.map(el => el.name)
  

    const joinData = info.join()
    const splitData = joinData.replace(/ /g,'').split(',')
    const filterData = [...new Set(splitData)]
    
    return filterData

}

const getAllTypes = async () => {
    const api = await apiType();
    api.forEach(el => Type.findOrCreate({ where: { name: el } })) 
  const allTypes = await Type.findAll()
  return allTypes
}
  





module.exports={ getAllTypes }