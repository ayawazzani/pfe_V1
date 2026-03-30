import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import './Customer.css';

import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';

import CartPage from './pages/CartPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import DishDetailsPage from './pages/DishDetailsPage';
import RequestBillPage from './pages/RequestBillPage';

function CustomerPage() {
  return (
    <Router>
      <Routes>
        {/* Table Welcome URL */}
        <Route path="/table/:qr_token" element={<WelcomePage />} />

        {/* Standalone pages inside layout (Bottom bar hidden on details) */}
        <Route path="/menu/:id" element={<DishDetailsPage />} />

        {/* Main Interface locked within the ClientLayout (Navbar + Bottom Tabs) */}
        <Route element={<ClientLayout />}>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderTrackingPage />} />
          <Route path="/bill" element={<RequestBillPage />} />
        </Route>

        {/* Fallback to Welcome for root testing */}
        <Route path="/" element={<Navigate to="/table/test-token" replace />} />
        <Route path="*" element={<Navigate to="/table/test-token" replace />} />
      </Routes>
    </Router>
  );
}

export default CustomerPage;
