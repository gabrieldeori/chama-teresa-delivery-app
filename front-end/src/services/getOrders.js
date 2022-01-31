import axios from 'axios';

const GET_ORDERS_URL = 'http://localhost:3001/orders';
const headers = {
  headers: {
    Authorization: JSON.parse(localStorage.getItem('user')).token,
  },
  data: {
    email: JSON.parse(localStorage.getItem('user')).email,
  },
};

export default async (callback) => {
  try {
    const { data: { data } } = await axios.get(GET_ORDERS_URL, headers);
    if (data) {
      callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
