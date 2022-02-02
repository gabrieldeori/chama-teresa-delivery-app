import axios from 'axios';

export default async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return axios.get('http://localhost:3001/');
  }

  const GET_ORDERS_URL = 'http://localhost:3001/orders/users';
  const headers = {
    headers: {
      Authorization: user.token,
    },
    data: {
      email: user.email,
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
