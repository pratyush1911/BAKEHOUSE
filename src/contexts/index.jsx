import { CartProvider } from './CartContext';
import { ToastProvider } from './ToastContext';
import { OrderProvider } from './OrderContext';
import { UserProvider } from './UserContext';

export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <CartProvider>
        <UserProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </UserProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export { useCart } from './CartContext';
export { useToast } from './ToastContext';
export { useOrders } from './OrderContext';
export { useUser } from './UserContext';
