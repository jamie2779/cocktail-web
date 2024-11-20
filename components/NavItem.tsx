import { Box, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="8px"
      cursor="pointer"
      onClick={onClick}
    >
      {icon}
      <Text marginLeft="8px" fontSize="14px" color="#30336b">
        {label}
      </Text>
    </Box>
  );
};

export default NavItem;
