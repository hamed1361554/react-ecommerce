import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, addedProduct) => {
    if (cartItems.filter(c => c.id === addedProduct.id).length > 0) {
        return cartItems.map(c => c.id === addedProduct.id ? {...c, quantity: c.quantity+1} : c);
    }

    return [...cartItems, {...addedProduct, quantity: 1}];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCounts, setTotalCounts] = useState(0);

    useEffect(() => {
        setTotalCounts(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }, [cartItems])

    const addItemToCart = (addedProduct) => {
        setCartItems(addCartItem(cartItems, addedProduct));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalCounts};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};