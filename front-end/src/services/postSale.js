import axios from 'axios';

const POST_SALE_URL = 'http://localhost:3001/sales';
const headers = {
  headers: {
    Authorization: JSON.parse(localStorage.getItem('user')).token,
  },
};

export default async (body) => {
  try {
    const { data: { data: saleId } } = await axios.get(POST_SALE_URL, body, headers);
    if (saleId) {
      return saleId;
    }
  } catch (error) {
    console.error(error);
  }
};
