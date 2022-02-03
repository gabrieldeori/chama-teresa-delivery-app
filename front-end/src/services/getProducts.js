import axios from 'axios';

export default async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const GET_PRODUCTS_URL = 'http://localhost:3001/products';
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data } } = await axios.get(GET_PRODUCTS_URL, headers);
    if (data) {
      callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
