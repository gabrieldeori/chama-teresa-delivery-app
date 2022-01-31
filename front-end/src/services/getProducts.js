import axios from 'axios';

const GET_PRODUCTS_URL = 'http://localhost:3001/products';
const headers = {
  headers: {
    Authorization: JSON.parse(localStorage.getItem('user')).token,
  },
};

export default async (callback) => {
  try {
    const { data: { data } } = await axios.get(GET_PRODUCTS_URL, headers);
    if (data) {
      callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
