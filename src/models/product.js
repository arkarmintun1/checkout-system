import { DISCOUNT_TYPE } from '../utils/DiscountType';
import { USER_LEVEL } from '../utils/UserType';

export default class Product {
    constructor(id, name, price, currency, quantity, discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.quantity = quantity;
        this.discount = discount;
    }

    totalWithDiscount(userLevel) {
        const discount = this.discount.find((item) => item.level === userLevel);
        if (discount) {
            switch (discount.type) {
                case DISCOUNT_TYPE.DEAL: {
                    const discountedAmount = discountDeal(this, discount, userLevel);
                    return discountedAmount.toFixed(2);
                }
                case DISCOUNT_TYPE.PURCHASE_MORE: {
                    const discountedAmount = discountPurchaseMore(this, discount, userLevel);
                    return discountedAmount.toFixed(2);
                }
                default: {
                    const total = this.quantity * this.price;
                    return (total - (total / 100) * 20).toFixed(2);
                }
            }
        }
        return (this.quantity * this.price).toFixed(2);
    }

    isDealApplied(userLevel) {
        const discount = this.discount.find((item) => item.level === userLevel);
        if (discount) {
            switch (discount.type) {
                case DISCOUNT_TYPE.DEAL: {
                    return this.quantity >= discount.buy;
                }
                case DISCOUNT_TYPE.PURCHASE_MORE: {
                    return this.quantity >= discount.min;
                }
                default: {
                    return false;
                }
            }
        }
        return false;
    }
}

// {
//     level: USER_LEVEL.DIAMOND,
//     type: DISCOUNT_TYPE.DEAL,
//     buy: 3,
//     pay: 2,
// }
const discountDeal = (product, discount, userLevel) => {
    const totalPrice = product.quantity * product.price;
    if (product.quantity >= discount.buy) {
        const reducedAmount = (
            Math.floor(product.quantity / discount.buy) *
            (discount.buy - discount.pay) *
            product.price
        ).toFixed(2);
        return totalPrice - reducedAmount;
    } else {
        return calculateForUserType(totalPrice, userLevel);
    }
};

// {
//     level: USER_LEVEL.DIAMOND,
//     type: DISCOUNT_TYPE.PURCHASE_MORE,
//     min: 3,
//     perItemPrice: 2588.99,
// }
const discountPurchaseMore = (product, discount, userLevel) => {
    if (product.quantity >= discount.min) {
        return product.quantity * discount.perItemPrice;
    } else {
        const totalPrice = product.quantity * product.price;
        return calculateForUserType(totalPrice, userLevel);
    }
};

const calculateForUserType = (totalPrice, userLevel) => {
    switch (userLevel) {
        case USER_LEVEL.ASSOCIATE: {
            return totalPrice - (totalPrice * 5) / 100;
        }
        case USER_LEVEL.DIAMOND: {
            return totalPrice - (totalPrice * 20) / 100;
        }
        default: {
            return totalPrice;
        }
    }
};
