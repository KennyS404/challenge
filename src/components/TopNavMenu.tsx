import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import '../styles/TopNavMenuStyles.css';
import { useTranslation } from 'react-i18next';

const TopNavMenu = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const drawerButton = document.getElementById('drawer-button');
    const drawerMenu = document.getElementById('drawer-menu');

    if (drawerButton && drawerMenu) {
      drawerButton.addEventListener('click', () => {
        if (drawerMenu.style.right === '0px' || drawerMenu.style.right === '') {
          drawerMenu.style.right = '-250px';
        } else {
          drawerMenu.style.right = '0px';
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="menu">
        <Link to="/" className="menu-link">
          <span className="menu-text">{t("menu")}</span>
        </Link>
        <Link to="/contato" className="menu-link">
          <span className="menu-text">{t("contact")}</span>
        </Link>
        <Link to="/entrar" className="menu-link">
          <span className="menu-text">{t("login")}</span>
        </Link>
      </div>
      {(window.innerWidth < 768) && (
        <button className="drawer-button" id="drawer-button">
       < MenuIcon /> 
      </button>
        )
      }
     
      <div className="banner">
        <img
          src="https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png"
          alt="Banner"
          className="banner-image"
        />
      </div>
      <div className="drawer-menu" id="drawer-menu">
        <Link to="/" className="menu-link">
          <span className="menu-text">{t("menu")}</span>
        </Link>
        <Link to="/contato" className="menu-link">
          <span className="menu-text">{t("contact")}</span>
        </Link>
        <Link to="/entrar" className="menu-link">
          <span className="menu-text">{t("login")}</span>
        </Link>
      </div>
    </div>
  );
};

export default TopNavMenu;
