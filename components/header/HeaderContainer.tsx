'use client';

import { useState } from 'react';
import Header from './Header';

const HeaderContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return <Header menuState={menuOpen} onClick={handleToggleMenu} />;
};

export default HeaderContainer;
