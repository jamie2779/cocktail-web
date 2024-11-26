import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface SettingProps {
  name: string;
}

export default function Setting({ name }: SettingProps) {
  return (
    <Box
      display="flex"
      padding="16px"
      backgroundColor="#FFFEFA"
      justifyContent="space-between"
      borderRadius="16px"
      alignItems="center"
      borderWidth={1}
    >
      <Text fontSize="18px" fontWeight="semibold" lineHeight="1.2">
        {name}
      </Text>

      <Image src={"/Revise.png"} alt={"revise"} width={40} height={40} />
    </Box>
  );
}
