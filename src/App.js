import { Provider } from 'react-redux';
import CheckoutPage from './pages/CheckoutPage';
import { store } from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <CheckoutPage />
        </Provider>
    );
}

export default App;
