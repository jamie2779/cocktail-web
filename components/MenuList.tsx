"use client";

import { Box } from "@chakra-ui/react";
import Menu from "./Menu";
import SelectMenu from "./SelectMenu";
import { useState } from "react";

export interface MenuItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, string | number | boolean>;
  imageSrc: string;
}

interface MenuListProps {
  menuItems: MenuItem[];
  background?: string;
}

const MenuList = ({ menuItems, background: color = "#fff" }: MenuListProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  const handleMenuClick = (item: MenuItem) => {
    setSelectedMenu(item);
  };

  const closeOverlay = () => {
    setSelectedMenu(null);
  };

  return (
    <Box
      backgroundColor={color}
      borderRadius="16px"
      marginBottom="50px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.08)"
    >
      {menuItems.map((item: MenuItem, index: number) => (
        <Box key={index} onClick={() => handleMenuClick(item)} cursor="pointer">
          <Menu
            key={index}
            imageSrc={item.imageSrc}
            name={item.name}
            description={item.cocktail}
            abv={item.abv}
          />
        </Box>
      ))}
      {selectedMenu && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
          onClick={closeOverlay}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <SelectMenu menuItem={selectedMenu} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuList;
