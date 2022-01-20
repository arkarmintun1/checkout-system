import { createSlice } from '@reduxjs/toolkit';
import { DISCOUNT_TYPE } from '../utils/DiscountType';
import { USER_LEVEL } from '../utils/UserType';
import Product from '../models/product';

const productInitialState = {
    products: [
        {
            id: 1,
            name: 'Kone',
            price: 3488.99,
            currency: 'RM',
            quantity: 0,
            discount: [
                // For Diamond Level user, if they buy 3 or more item of this type, they will get discount of 2588.99 per item
                {
                    level: USER_LEVEL.DIAMOND,
                    type: DISCOUNT_TYPE.PURCHASE_MORE,
                    min: 3,
                    perItemPrice: 2588.99,
                },
            ],
        },
        {
            id: 2,
            name: 'Ironhide Cartridge',
            price: 529.99,
            currency: 'RM',
            quantity: 0,
            discount: [
                // For Diamond Level user, if they buy 3 items, they will only have to pay for 2.
                {
                    level: USER_LEVEL.DIAMOND,
                    type: DISCOUNT_TYPE.DEAL,
                    buy: 3,
                    pay: 2,
                },
            ],
        },
    ],
};

const productSlice = createSlice({
    name: 'product',
    initialState: productInitialState,
    reducers: {
        increaseProductQuantity: (state, action) => {
            const product = state.products.find((item) => item.id === action.payload.id);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseProductQuantity: (state, action) => {
            const product = state.products.find((item) => item.id === action.payload.id);
            if (product && product.quantity > 0) {
                product.quantity -= 1;
            }
        },
    },
});

export const selectProducts = (state) =>
    state.product.products.map(
        (item) => new Product(item.id, item.name, item.price, item.currency, item.quantity, item.discount)
    );

export const selectSubTotal = (state) =>
    state.product.products
        .map((item) => new Product(item.id, item.name, item.price, item.currency, item.quantity, item.discount))
        .reduce((total, current) => {
            const userLevel = state.user.level;
            const result = parseFloat(total) + parseFloat(current.totalWithDiscount(userLevel));
            return result.toFixed(2);
        }, 0);

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
