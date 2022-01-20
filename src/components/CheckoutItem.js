import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux/productSlice';
import { selectUserLevel } from '../redux/userSlice';

const CheckoutItem = ({ product }) => {
    const dispatch = useDispatch();
    const userLevel = useSelector(selectUserLevel);

    const handleIncreaseQuantity = () => {
        dispatch(productActions.increaseProductQuantity({ id: product.id }));
    };

    const handleDecreaseQuantity = () => {
        dispatch(productActions.decreaseProductQuantity({ id: product.id }));
    };

    return (
        <div className='flex flex-row py-4 space-x-4'>
            <img className='w-[100px] h-[100px]' src='https://via.placeholder.com/100' alt='' />
            <div className='flex-1'>
                <div className='h-full flex flex-col md:flex-row justify-between items-baseline'>
                    <div className='h-full flex flex-col flex-1 justify-between'>
                        <p className='text-lg'>{product.name}</p>
                        <div className='flex flex-row space-x-2 my-4'>
                            <p className='text-slate-400'>Quantity:</p>
                            <div className='flex flex-row items-center border border-slate-300 rounded'>
                                <button
                                    id='btn-minus'
                                    data-testid='btn-minus'
                                    className='h-full cursor-pointer'
                                    onClick={handleDecreaseQuantity}
                                >
                                    <MinusIcon className='h-full w-3 text-gray-500 mx-2 ' />
                                </button>

                                <div data-testid='quantity' className='w-6 text-center text-gray-500'>
                                    {product.quantity}
                                </div>

                                <button
                                    id='btn-plus'
                                    data-testid='btn-plus'
                                    className='h-full cursor-pointer'
                                    onClick={handleIncreaseQuantity}
                                >
                                    <PlusIcon className='h-full w-3 text-gray-500 mx-2 ' />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-end'>
                        <div className='flex flex-row space-x-2 items-baseline'>
                            <p className='text-slate-500 text-sm'>{`${product.quantity} x RM ${product.price}`}</p>
                            <p>=</p>
                            <p data-testid='total'>{`RM ${product.totalWithDiscount(userLevel)}`}</p>
                        </div>
                        <div className='text-slate-500 text-sm'>
                            {product.quantity > 0 &&
                                (product.isDealApplied(userLevel) ? 'Special Deal applied!' : 'Discount applied')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutItem;
