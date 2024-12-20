import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface MenuProps {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

const Menu = ({ imageSrc, name, description, abv }: MenuProps) => {
  return (
    <Box
      display="flex"
      padding="16px"
      backgroundColor="transparent"
      borderRadius="16px"
    >
      <Box width="80px" height="80px" overflow="hidden" borderRadius="10px">
        <Image
          src={imageSrc}
          alt={name}
          layout="responsive"
          width={80}
          height={80}
          objectFit="cover"
        />
      </Box>
      <VStack align="flex-start" ml="12px" mt="9px" spacing="2px">
        <Text fontSize="13px" color="gray.500" margin={0}>
          {description}
        </Text>
        <Text fontSize="18px" fontWeight="semibold" lineHeight="1.2">
          {name}
        </Text>
        {abv !== -1 && (
          <Text fontSize="13px" color="#7174BE">
            ABV {abv}%
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Menu;
