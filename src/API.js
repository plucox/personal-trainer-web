import axios from 'axios';

export default axios.create({
  baseURL: `https://personal-trainer-api.herokuapp.com/api/`
});