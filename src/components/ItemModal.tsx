import React, { useState } from 'react';
import { Item } from '../redux/menuSlice';
import { Box, IconButton, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MinusIcon, PlusIcon } from '../icons/icons';
import { addItemToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import '../styles/ItemModalStyles.css'; 
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../utils/formatPrice';
import i18n from '../translate';

interface ItemModalProps {
  item: Item;
  closeModal: () => void;
}

const ItemModal: React.FC<ItemModalProps & { setIsMinicartOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ item, closeModal, setIsMinicartOpen }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const defaultModifierId = item.modifiers?.[0].items[0].id.toString() || '';
  const [selectedSize, setSelectedSize] = useState<string>(defaultModifierId);
  const dispatch = useDispatch();

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };
  
  const handleAddToCart = () => {
    const selectedOption = item.modifiers?.[0].items.find(option => option.id.toString() === selectedSize);
    const selectedOptionName = selectedOption?.name;
    const selectedOptionPrice = selectedOption?.price || 0;
  
    dispatch(addItemToCart({ 
      ...item, 
      quantity, 
      selectedOption: selectedOptionName,
      price: item.price + selectedOptionPrice 
    })); 
    if (window.innerWidth <= 768) {
      setIsMinicartOpen(true);
    }
    closeModal();
  };
  
  
  const handleQuantityChange = (increment: number) => {
    setQuantity((prev) => prev + increment);
  };

  const selectedSizePrice = item.modifiers?.[0].items.find(size => size.id === Number(selectedSize))?.price || 0;

  return (
    <Box className="modal-container">
      <Box className="modal-content">
        <IconButton onClick={closeModal} className="close-button">
          <CloseIcon />
        </IconButton>

        <img
          src={item.images?.length > 0 ? item.images[0].image : ''}
          alt={item.name}
          className="modal-image"
        />

        <Typography variant="h5" className="modal-typography-h5">
          {item.name}
        </Typography>
        <Typography variant="body1" className="modal-typography-body1">
          {item.description}
        </Typography>

        {item.modifiers && item.modifiers.length > 0 && (
          <>
            <Typography variant="body1" className="modal-typography-body1">
              {t("chooseYourSize")}
            </Typography>
            <RadioGroup className="modal-radio-group" value={selectedSize} onChange={handleSizeChange}>
  {item.modifiers[0].items.map((option) => (
    <Box className="form-control-label-content" key={option.id}>
      <Box className="radio-label-text">
        <Typography variant="body2">{option.name}</Typography>
        <Typography variant="caption" className="modal-radio-caption">
        {formatPrice(option.price, i18n.language)}
        </Typography>
      </Box>
      <FormControlLabel
        value={option.id.toString()} 
        control={<Radio />}
        label=""
      />
    </Box>
  ))}
</RadioGroup>


          </>
        )}

        <Box className="quantity-box">
          <Button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="quantity-button"
          >
            <MinusIcon />
          </Button>
          <Typography variant="h6">{quantity}</Typography>
          <Button
            onClick={() => handleQuantityChange(1)}
            className="quantity-button"
          >
            <PlusIcon />
          </Button>
        </Box>

        <Button
          onClick={handleAddToCart}
          variant="contained"
          className="styled-add-button"
        >
   {t("addToOrder")} • {formatPrice((selectedSizePrice + item.price) * quantity, i18n.language)} {/* Modifique esta linha */}
        </Button>
      </Box>
    </Box>
  );
};

export default ItemModal;
