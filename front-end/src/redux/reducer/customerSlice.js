import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'customer',
  initialState: {
    orderProducts: [],
  },
  reducers: {
    addProductOnOrder: (state, action) => ({
      ...state,
      orderProducts: [...state.orderProducts, action.payload],
    }),
    removeProductFromOrder: (state, action) => ({
      ...state,
      orderProducts: [
        ...state.orderProducts
          .filter(({ name: productName }) => productName !== action.payload),
      ],
    }),
    updateOrderProducts: (state, action) => ({
      ...state,
      orderProducts: [
        ...state.orderProducts.map((product) => {
          if (product.name === action.payload.name) {
            return { ...product, quantity: action.payload.quantity };
          }
          return product;
        }),
      ],
    }),
  },
});

export const {
  addProductOnOrder,
  removeProductFromOrder,
  updateOrderProducts,
} = slice.actions;

export default slice.reducer;
