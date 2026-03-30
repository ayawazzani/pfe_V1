import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrdersProvider } from './context/OrdersContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import WaiterDashboard from './pages/Waiter/WaiterDashboard';
import KitchenDisplay from './pages/Kitchen/KitchenDisplay';
import ClientLayout from './pages/Customer/layouts/ClientLayout';
import WelcomePage from './pages/Customer/pages/WelcomePage';
import MenuPage from './pages/Customer/pages/MenuPage';
import CartPage from './pages/Customer/pages/CartPage';
import OrderTrackingPage from './pages/Customer/pages/OrderTrackingPage';
import DishDetailsPage from './pages/Customer/pages/DishDetailsPage';
import RequestBillPage from './pages/Customer/pages/RequestBillPage';
import './pages/Customer/Customer.css';

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Customer Interface Routes (Public - No Authentication) */}
            <Route path="/table/:qr_token" element={<WelcomePage />} />
            <Route path="/menu/:id" element={<DishDetailsPage />} />
            
            <Route element={<ClientLayout />}>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order/:id" element={<OrderTrackingPage />} />
              <Route path="/bill" element={<RequestBillPage />} />
            </Route>

            {/* Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/waiter/*"
              element={
                <ProtectedRoute allowedRoles={['waiter', 'admin']}>
                  <WaiterDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/kitchen/*"
              element={
                <ProtectedRoute allowedRoles={['kitchen', 'admin']}>
                  <KitchenDisplay />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </OrdersProvider>
    </AuthProvider>
  );
}
