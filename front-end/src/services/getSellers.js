import axios from 'axios';

export default async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const GET_SELLERS_URL = 'http://localhost:3001/users/seller';
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data } } = await axios.get(GET_SELLERS_URL, headers);
    if (data) {
      callback((element) => [...element, ...data]);
    }
  } catch (error) {
    console.error(error);
  }
};
