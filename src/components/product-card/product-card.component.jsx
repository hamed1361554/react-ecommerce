import { useContext } from "react";

import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";

import './product-card.styles.scss';

const ProductCard = ({product}) => {
    const {id, name, price, imageUrl} = product;
    const {cartItems, addItemToCart} = useContext(CartContext);

    const addCartProduct = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addCartProduct}>Add to card</Button>
        </div>
    );
};

export default ProductCard;