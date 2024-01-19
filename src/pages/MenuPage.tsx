import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, getMenuDetails } from '../redux/store';
import type { AppDispatch } from '../redux/store';
import ItemModal from '../components/ItemModal';
import Header from '../components/Header';
import { Item } from '../redux/menuSlice';
import { Typography, CardMedia, CardContent, Card, Accordion, AccordionDetails, AccordionSummary, Grid, Box } from '@mui/material';
import FilterMenu from '../components/Search';
import CartMiniCard from '../components/CartMiniCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/MenuPageStyles.css';;

const MenuPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: menu, status: menuStatus } = useSelector((state: RootState) => state.menu);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinicartOpen, setIsMinicartOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('Burgers');
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const [expandedSection, setExpandedSection] = useState<string | false>(false);
  useEffect(() => {
    dispatch(getMenuDetails());
  }, [dispatch]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };



   const handleAccordionChange = (sectionName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? sectionName : false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setExpandedSection(category); 
  };

  const renderCard = (item: Item) => {
    return (
      <Card
        key={item.id}
        className="card"
        onClick={() => handleItemClick(item)}
      >
        <CardContent >
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            R${item.price}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={item?.images?.length > 0 ? item.images[0].image : ""}
          alt={item.name}
        />
      </Card>
    );
  };

  if (menuStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (menuStatus === 'succeeded' && menu) {

    return (
      <div>
        <FilterMenu />
        <Box className="father-container">
        {
  (isMinicartOpen || window.innerWidth > 768) && (
    <CartMiniCard onClose={() => setIsMinicartOpen(false)} />
  )
}


        <Box className="main-container">
          <Header 
          sections={menu.sections} 
          onSelectCategory={handleCategorySelect} 
          cartItemCount={cartItemCount} 
          selectedCategory={selectedCategory} 
        />
            {menu?.sections.map((section: any) => (
                 <Accordion 
                 key={section?.id} 
                 expanded={expandedSection === section?.name} 
                 onChange={handleAccordionChange(section?.name)}
                 sx={{
                  boxShadow: 'none',
                  '&:before': { 
                    display: 'none',
                  },
                  '&:not(:last-child)': { 
                    borderBottom: 0,
                  },
                  '&:not(:first-child)': { 
                    borderTop: 0,
                  },
                  '&.Mui-expanded': { 
                    margin: 0, 
                    '&:first-child': {
                      marginTop: 0,
                    },
                    '&:last-child': {
                      marginBottom: 0,
                    },
                  }
                }}
               >
               <AccordionSummary
            expandIcon={<ExpandMoreIcon />} 
          >
                
                  <Typography variant="h6">{section?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className='accordion-details'>
                  <Grid container spacing={2}>
                    {section.items.map((item: any) => (
                      <Grid item xs={12} key={item.id}>
                        {renderCard(item)}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
            {isModalOpen && selectedItem && (
            <ItemModal 
            item={selectedItem} 
            closeModal={() => setIsModalOpen(false)} 
            setIsMinicartOpen={setIsMinicartOpen} 
          />
            )}
          </Box>
        </Box>
      </div>
    );
  }

  return null;
};

export default MenuPage;
