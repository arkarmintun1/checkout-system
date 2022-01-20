import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutItem from '../components/CheckoutItem';
import { selectProducts, selectSubTotal } from '../redux/productSlice';
import { selectUserLevel, userActions } from '../redux/userSlice';
import { USER_LEVEL } from '../utils/UserType';

const CheckoutPage = () => {
    const products = useSelector(selectProducts);
    const subTotal = useSelector(selectSubTotal);
    const userLevel = useSelector(selectUserLevel);
    const dispatch = useDispatch();

    const handleChangeUserLevel = (e) => {
        dispatch(userActions.changeUserLevel({ userLevel: e.target.value }));
    };

    return (
        <div className='flex flex-col h-screen'>
            <header className='flex flex-row justify-between w-full bg-slate-500 items-center px-10 py-4 text-white drop-shadow-md'>
                <p className='font-bold text-lg'>E-commerce</p>
                <div className='flex flex-row space-x-3'>
                    <label htmlFor='user-level'>Level:</label>
                    <select
                        value={userLevel}
                        onChange={handleChangeUserLevel}
                        className='border-none focus:border-none rounded w-[200px] bg-transparent ring-transparent focus:ring-transparent'
                    >
                        <option value={USER_LEVEL.ASSOCIATE}>Associate</option>
                        <option value={USER_LEVEL.DIAMOND}>Diamond</option>
                    </select>
                </div>
            </header>

            <div className='flex flex-col flex-1 md:flex-row items-start bg-gray-100 py-5 px-10 space-y-4 space-x-0 md:space-y-0 md:space-x-4'>
                <div className='w-full md:w-2/3'>
                    <div className='bg-white p-5 rounded'>
                        <p className='text-lg font-semibold pb-2'>My Bag</p>
                        <hr />
                        <div data-testid='products-container'>
                            {products && products.map((product) => <CheckoutItem key={product.id} product={product} />)}
                        </div>
                        <div className='flex flex-row justify-end text-lg font-semibold'>Sub-total: RM {subTotal}</div>
                    </div>
                </div>
                <div className='w-full md:w-1/3'>
                    <div className='bg-white p-5 rounded'>
                        <p className='text-lg font-semibold pb-2'>Summary</p>
                        <hr />
                        <div className='flex flex-row justify-between my-4'>
                            <p className='text-lg font-semibold'>Total</p>
                            <p className='text-xl font-semibold'>RM {subTotal}</p>
                        </div>
                        <button className='w-full bg-green-500 py-4 rounded text-white drop-shadow'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
