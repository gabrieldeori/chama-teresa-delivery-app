import axios from 'axios';

export default async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const GET_USERS_URL = 'http://localhost:3001/users';
  const config = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data } } = await axios.get(GET_USERS_URL, config);
    if (data) {
      callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
