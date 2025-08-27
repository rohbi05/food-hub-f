import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/authContext.jsx';
import { RetailerProvider } from './context/retailerContext.jsx';
import { CustomerProvider } from './context/customerContext.jsx';
import { SignupProvider } from './context/signupContext.jsx';
import { MenuProvider } from './context/menuContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RetailerProvider>
      <CustomerProvider>
        <SignupProvider>
          <MenuProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </MenuProvider>
        </SignupProvider>
      </CustomerProvider>
    </RetailerProvider>
  </AuthProvider>,
)
