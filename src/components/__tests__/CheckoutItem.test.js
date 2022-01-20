import Product from '../../models/product';
import { render, screen, fireEvent } from '../../redux/test-util';
import { DISCOUNT_TYPE } from '../../utils/DiscountType';
import { USER_LEVEL } from '../../utils/UserType';
import CheckoutItem from '../CheckoutItem';

const product = new Product(1, 'Kone', 3488.99, 'RM', 0, [
    {
        level: USER_LEVEL.DIAMOND,
        type: DISCOUNT_TYPE.PURCHASE_MORE,
        min: 3,
        perItemPrice: 2588.99,
    },
]);

test('renders minus buttton', () => {
    render(<CheckoutItem product={product} />);
    const linkElement = screen.getByTestId('btn-minus');
    expect(linkElement).toBeInTheDocument();
});

test('renders plus buttton', () => {
    render(<CheckoutItem product={product} />);
    const linkElement = screen.getByTestId('btn-plus');
    expect(linkElement).toBeInTheDocument();
});

test('renders quantity value', () => {
    render(<CheckoutItem product={product} />);
    const linkElement = screen.getByTestId('quantity');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.innerHTML).toBe('0');
});

test('can click on btn plus', async () => {
    render(<CheckoutItem product={product} />);

    const btnElement = screen.getByTestId('btn-plus');
    fireEvent.click(btnElement);
});

test('can click on btn minus', async () => {
    render(<CheckoutItem product={product} />);

    const btnElement = screen.getByTestId('btn-minus');
    fireEvent.click(btnElement);
});

test('no special discount nor deal when quantity is zero!', async () => {
    render(<CheckoutItem product={product} />);

    expect(() => screen.getByText(/discount applied/i)).toThrow();
    expect(() => screen.getByText(/special deal applied!/i)).toThrow();
});

test('special deal is applied!', async () => {
    product.quantity = 4;
    render(<CheckoutItem product={product} />);

    const element = screen.getByText(/special deal applied!/i);
    expect(element).toBeInTheDocument();
});

test('discount applied!', async () => {
    product.quantity = 1;
    render(<CheckoutItem product={product} />);

    const element = screen.getByText(/discount applied/i);
    expect(element).toBeInTheDocument();
});

test('chaning quantity update UI!', async () => {
    product.quantity = 1;
    render(<CheckoutItem product={product} />);

    const element = screen.getByTestId('total');
    expect(element.innerHTML).toBe('RM 2791.19');
});
