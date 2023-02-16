import axios from 'axios';

const getCharacter = async (slug) => {
  console.log(slug)
  try {
    if(slug){
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${slug}`);
    console.log("res",slug, response.data)
    const characters = response.data;
   return characters;
  }
  } catch (error) {
    console.error(error);
  }
};

export default getCharacter;



