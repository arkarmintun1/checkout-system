import { render, screen, fireEvent } from '../../redux/test-util';
import CheckoutPage from '../CheckoutPage';

test('renders my bag title', () => {
    render(<CheckoutPage />);
    const linkElement = screen.getByText(/my bag/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders checkout button', () => {
    render(<CheckoutPage />);
    const linkElement = screen.getByRole('button', {
        name: /checkout/i,
    });
    expect(linkElement).toBeInTheDocument();
});

test('render products!', () => {
    render(<CheckoutPage />);
    const linkElement = screen.getByTestId('products-container');
    expect(linkElement.children.length).toBeGreaterThan(0);
});

test('clickin on + button increment quantity', () => {
    render(<CheckoutPage />);
    const buttonElements = screen.getAllByTestId('btn-plus');
    const quantityElements = screen.getAllByTestId('quantity');

    expect(quantityElements[0].innerHTML).toBe('0');

    fireEvent.click(buttonElements[0]);

    expect(quantityElements[0].innerHTML).toBe('1');
});

test('clickin on - button increment quantity', () => {
    render(<CheckoutPage />);
    const plusElements = screen.getAllByTestId('btn-plus');
    const minusElements = screen.getAllByTestId('btn-minus');
    const quantityElements = screen.getAllByTestId('quantity');

    fireEvent.click(plusElements[0]);

    expect(quantityElements[0].innerHTML).toBe('1');

    fireEvent.click(minusElements[0]);

    expect(quantityElements[0].innerHTML).toBe('0');
});
