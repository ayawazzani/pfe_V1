import { create } from 'zustand';

// Mock generating an order ID
const generateOrderId = () => `ORD-${Math.floor(100 + Math.random() * 900)}`;

export const useStore = create((set) => ({
    cart: [],
    order: null, // { id, items, total, status: 'placed'|'accepted'|'preparing'|'ready'|'delivered', timestamp }

    // Cart Actions
    addToCart: (item) => set((state) => {
        // Check if the exact same item (same id, same extras) exists
        const existingIndex = state.cart.findIndex(
            (c) => c.id === item.id && JSON.stringify(c.selectedExtras) === JSON.stringify(item.selectedExtras)
        );

        if (existingIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += item.quantity;
            return { cart: newCart };
        }
        return { cart: [...state.cart, item] };
    }),

    removeFromCart: (indexToRemove) => set((state) => ({
        cart: state.cart.filter((_, idx) => idx !== indexToRemove)
    })),

    updateCartQuantity: (index, delta) => set((state) => {
        const newCart = [...state.cart];
        if (newCart[index]) {
            const newQuantity = newCart[index].quantity + delta;
            if (newQuantity > 0) {
                newCart[index].quantity = newQuantity;
            }
        }
        return { cart: newCart };
    }),

    clearCart: () => set({ cart: [] }),

    // Order Actions
    placeOrder: () => set((state) => {
        if (state.cart.length === 0) return state;

        const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        const total = subtotal + (subtotal * 0.08); // 8% tax

        const newOrder = {
            id: generateOrderId(),
            table: 5, // mock table
            items: [...state.cart],
            total: total,
            subtotal: subtotal,
            status: 'placed',
            timestamp: Date.now()
        };

        return {
            order: newOrder,
            cart: [] // clear cart after placing order
        };
    }),

    updateOrderStatus: (newStatus) => set((state) => {
        if (!state.order) return state;
        return {
            order: {
                ...state.order,
                status: newStatus
            }
        };
    }),

    clearOrder: () => set({ order: null })
}));
