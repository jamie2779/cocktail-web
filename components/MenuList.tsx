import { Box } from "@chakra-ui/react";
import Menu from "./Menu";

export interface MenuItem {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

interface MenuListProps {
  menuItems: MenuItem[];
  background?:string;
}

const MenuList = ({ menuItems, background: color="#fff" }: MenuListProps) => {
  return (
    <Box
      backgroundColor={color}
      borderRadius="16px"
      marginBottom="50px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.08)"
    >
      {menuItems.map((item: MenuItem, index: number) => (
        <Menu
          key={index}
          imageSrc={item.imageSrc}
          name={item.name}
          description={item.description}
          abv={item.abv}
        />
      ))}
    </Box>
  );
};

export default MenuList;
