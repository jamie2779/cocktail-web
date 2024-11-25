import { Box, Text, VStack,HStack} from "@chakra-ui/react";
import Image from "next/image";

interface MenuProps {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

const OverlayMenu = ({ imageSrc, name, description, abv }: MenuProps) => {
  return (
    <Box
      width={362}
      height={162}
      padding="16px"
      backgroundColor="transparent"
      borderRadius="16px"
      borderColor="#DCDCDC"
      borderWidth="1px"
    >
      <HStack>
        <Image
            src={imageSrc}
            alt={name}
            width={130}
            height={130}
            style={{ borderRadius: "10px" }}
        />
        <VStack align="center" ml="12px" mt="9px" spacing="2px">
            <Text fontSize="13px" color="gray.500" margin={0}>
            {description}
            </Text>
            <Text fontSize="18px" fontWeight="semibold" lineHeight="1.2">
            {name}
            </Text>
            <Text fontSize="13px" color="#7174BE">
            ABV {abv}%
            </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default OverlayMenu;
