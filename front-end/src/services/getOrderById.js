import axios from 'axios';

export default async (callback, orderId) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const GET_ORDER_BY_ID_URL = `http://localhost:3001/orders/${orderId}`;
  const GET_USERS_BY_ID_URL = (userId) => `http://localhost:3001/users/sellers/${userId}`;
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data: { data } } = await axios.get(GET_ORDER_BY_ID_URL, headers);
    const {
      data: { data: { name } },
    } = await axios.get(GET_USERS_BY_ID_URL(data.sellerId), headers);
    if (data) {
      callback({ ...data, sellerName: name });
    }
  } catch (error) {
    console.error(error);
  }
};
