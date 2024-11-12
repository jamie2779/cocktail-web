import { Box, Text } from "@chakra-ui/react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  return (
    <Box display="flex" alignItems="center" padding="8px" cursor="pointer">
      {icon}
      <Text marginLeft="8px" fontSize="14px" color="#30336b">
        {label}
      </Text>
    </Box>
  );
};

export default NavItem;
