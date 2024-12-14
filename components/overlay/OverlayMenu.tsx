import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface MenuProps {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

const OverlayMenu = ({ imageSrc, name, description, abv }: MenuProps) => {
  const validImageSrc =
    imageSrc && imageSrc !== "none" ? imageSrc : "/Cocktail.png";

  return (
    <Box
      width="100%"
      height="162px"
      padding="16px"
      backgroundColor="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="#DCDCDC"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      display="flex"
      alignItems="center"
    >
      <Box
        position="relative"
        width="130px"
        height="130px"
        overflow="hidden"
        borderRadius="10px"
      >
        <Image
          src={validImageSrc}
          alt={name}
          fill
          style={{ objectFit: "cover",
            objectPosition: "top",
           }}
        />
      </Box>
      <VStack
        align="flex-start"
        ml="16px"
        spacing="4px"
        flex="1"
        justifyContent="center"
      >
        <Text fontSize="13px" color="gray.500" noOfLines={2}>
          {description}
        </Text>
        <Text fontSize="18px" fontWeight="semibold" lineHeight="1.2" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="13px" color="#7174BE">
          ABV {abv}%
        </Text>
      </VStack>
    </Box>
  );
};

export default OverlayMenu;
