import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { MinusIcon, PlusIcon } from '../icons/icons';
import '../styles/CartMiniCardStyles.css'; 
import { incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../utils/formatPrice';

const CartMiniCard = ({ onClose }: { onClose: () => void }) => {
  const { t, i18n  } = useTranslation();
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const calculateSubtotal = () => {
    return cartItems.reduce((total: number, item: { price: number; quantity: number; }) => total + (item.price * item.quantity), 0);
  };
  const handleIncrement = (itemId: any) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };
  return (
    <Box className="cart-mini-card-container">
      <Typography variant="h6" className='cart-name'>{t("cart")}</Typography>
      {cartItems.map((item: any) => (
        <Box key={item.id} className="cart-item">
          <Box className="cart-item-details">
            <Typography>{item.name}</Typography>
            {item.selectedOption && (
              <Typography sx={{ mt: 1 }}>{item.selectedOption}</Typography>
            )}
            <Box className="cart-item-quantity">
            <Button
            onClick={() => handleDecrement(item.id)}
        
            className="quantity-button"
          >
            <MinusIcon />
          </Button>
          
              <Typography className="cart-item-quantity-text">
                {item.quantity}
              </Typography>
              <Button
            onClick={() => handleIncrement(item.id)}
    
            className="quantity-button"
          >
            <PlusIcon />
          </Button>
            </Box>
          </Box>
          <Typography>{formatPrice(item.price * item.quantity, i18n.language)}</Typography> 
        </Box>
      ))}
    <Typography>Total: {formatPrice(calculateSubtotal(), i18n.language)}</Typography> 
      {
  (window.innerWidth < 768) && (
    <Box className="checkout-button-container">
      <Button variant="contained" className='checkout-button' onClick={onClose}>
        Checkout Now
      </Button>
      </Box>
        )
      }
    </Box>
  );
};

export default CartMiniCard;
