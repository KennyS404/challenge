
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/FilterMenuStyles.css';
const FilterMenu = () => {
  return (
    <div className="FilterMain">
    <div className="FilterMenuContainer">
     <div className="SearchIconWrapper"> 
        <SearchIcon />
        </div>
        <InputBase
        placeholder="Search menu items…"
        className="StyledInputBase"
      />
   </div>
   </div>
  );
};

export default FilterMenu;
