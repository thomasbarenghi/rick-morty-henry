import axios from 'axios';

const fetchCharacters = async () => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results;
    return characters;
  } catch (error) {
    console.error(error);
  }
};

export default fetchCharacters;
