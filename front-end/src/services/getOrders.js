import axios from 'axios';

export default async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const GET_ORDERS_URL = 'http://localhost:3001/orders/users';
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data } } = await axios.get(GET_ORDERS_URL, headers);
    if (data) {
      callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
