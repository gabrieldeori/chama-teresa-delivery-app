import axios from 'axios';

const GET_SELLERS_URL = 'http://localhost:3001/users/role=seller';
const headers = {
  headers: {
    Authorization: JSON.parse(localStorage.getItem('user')).token,
  },
};

export default async (callback) => {
  try {
    const { data: { data } } = await axios.get(GET_SELLERS_URL, headers);
    if (data) {
      callback((element) => [...element, ...data]);
    }
  } catch (error) {
    console.error(error);
  }
};
