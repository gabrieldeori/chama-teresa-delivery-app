import axios from 'axios';

export default async (email) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const DELETE_USER_BY_EMAIL_URL = 'http://localhost:3001/users';
  const config = {
    headers: {
      Authorization: user.token,
    },
    data: {
      email,
    },
  };

  try {
    await axios.delete(DELETE_USER_BY_EMAIL_URL, config);
  } catch (error) {
    console.error(error);
  }
};
