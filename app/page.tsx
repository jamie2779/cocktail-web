"use client";

import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PasswordOverlay from "@/components/overlay/PasswordOverlay";

export default function Home() {
  const router = useRouter(); // useRouter 훅 추가
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNavigation = (path: string) => {
    if (path === "/admin") {
      setShowOverlay(true); // PasswordOverlay 표시
    } else {
      router.push(path); // 경로 이동
    }
  };

  return (
    <Box
      width="402px"
      height="100vh"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" margin={30}>
        <IconButton
          backgroundColor={"#f9f9f9"}
          aria-label="admin"
          cursor="pointer"
          onClick={() => handleNavigation("/admin")}
        >
          <Image src={"/User.png"} alt={"user"} width={30} height={40} />
        </IconButton>
      </Flex>
      <VStack
        flex="1"
        overflowY="scroll"
        margin="24px"
        spacing="16px"
        align="stretch"
      >
        <Box ml="10px" mb="10px">
          <Heading as="h2" fontSize="24px" fontWeight="bold" textAlign="center">
            {"환영합니다!"}
          </Heading>
          <Text fontSize="16px" opacity={0.5} textAlign="center">
            {"원하는 칵테일을 제조해 드리는 ‘칵테일 제조기’ 입니다."}
          </Text>
          <Button
            width={340}
            height={254}
            backgroundColor="#787eff"
            marginTop={85}
            marginBottom={120}
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            onClick={() => handleNavigation("/order")}
          >
            <VStack>
              <Image
                src={"/Cocktail.png"}
                alt={"cocktail"}
                width={200}
                height={200}
              />
              <Text fontSize={20}>주문하기</Text>
            </VStack>
          </Button>
        </Box>
      </VStack>
      {showOverlay && <PasswordOverlay onClose={() => setShowOverlay(false)} />}
    </Box>
  );
}
