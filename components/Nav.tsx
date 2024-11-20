import { Box } from "@chakra-ui/react";
import NavItem from "./NavItem";
import Image from "next/image";

const Nav = () => {
  return (
    <Box
      position="fixed"
      width="402px"
      zIndex={999}
      left="50%"
      transform="translateX(-50%)"
      bottom={0}
      h="60px"
      display="flex"
      justifyContent="space-around"
      padding="12px"
      backgroundColor="#fff"
      boxShadow="0px 0px 30px 0px rgba(0, 0, 0, 0.1)"
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
