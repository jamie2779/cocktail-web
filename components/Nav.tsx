import { Box } from "@chakra-ui/react";
import NavItem from "./NavItem";
import Image from "next/image";

const Nav = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      padding="12px"
      backgroundColor="#fff"
      borderRadius="8px"
      boxShadow="0 -2px 8px rgba(0, 0, 0, 0.1)"
    >
      <NavItem
        icon={<Image src="/Drink.svg" alt="Menu" width={24} height={24} />}
        label="주문"
      />
      <NavItem
        icon={<Image src="/History.svg" alt="History" width={24} height={24} />}
        label="대기열"
      />
    </Box>
  );
};

export default Nav;
