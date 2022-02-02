import axios from 'axios';

export default async (body) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return axios.get('http://localhost:3001/');
  }

  const POST_SALE_URL = 'http://localhost:3001/orders';
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data: { id } } } = await axios.get(POST_SALE_URL, body, headers);
    if (id) {
      return id;
    }
  } catch (error) {
    console.error(error);
  }
};
