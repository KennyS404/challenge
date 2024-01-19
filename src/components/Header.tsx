import React from 'react';
import { AppBar, Typography, Box, Avatar } from '@mui/material';
import { Section } from '../redux/menuSlice';

type HeaderProps = {
  sections: Section[];
  onSelectCategory: (category: string) => void;
  cartItemCount: number;
  selectedCategory: string; 
};

const Header: React.FC<HeaderProps> = ({ sections, onSelectCategory, selectedCategory }) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ maxWidth: 'calc(100% - 48px)', mx: 'auto', py: 2, gap: 2 }}>
        {sections.map((section) => (
          <Box
            key={section.id}
            onClick={() => onSelectCategory(section.name)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 4,
              pb: 0.5,
              borderBottom: selectedCategory === section.name ? '2px solid #4F372F' : '',
            }}
          >
            <Avatar
              src={section.images && section.images.length > 0 ? section.images[0].image : "URL_de_uma_imagem_padrao"}
              alt={section.name}
              sx={{
                width: 74,
                height: 74,
                flexShrink: 0,
              }}
            />
            <Typography variant="subtitle1">{section.name}</Typography>
          </Box>
        ))}
      </Box>
    </AppBar>
  );
};

export default Header;
