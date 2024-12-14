"use client";

import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordOverlay({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/admin");
      } else {
        toast({
          title: "비밀번호가 틀렸습니다.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      toast({
        title: "오류가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Box
      width="402px"
      margin="0 auto"
      backgroundColor="#ffffff"
      borderWidth="1px"
      padding="20px"
      borderTopRadius={30}
    >
      <VStack flex="1" spacing="27px" align="stretch">
        <Text
          color="#000000"
          fontFamily="Pretendard"
          fontSize="18px"
          fontWeight="600"
          lineHeight="21.48px"
          textAlign="center"
        >
          비밀번호를 입력해주세요
        </Text>
        <HStack justifyContent="center">
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            width="100%"
            textAlign="center"
          />
        </HStack>
        <HStack spacing="16px">
          <Button
            width="175px"
            height="50px"
            backgroundColor="#30336B"
            textColor="white"
            onClick={handleConfirm}
          >
            확인
          </Button>
          <Button
            width="175px"
            height="50px"
            variant="outline"
            color="#2A2A2A"
            onClick={onClose}
          >
            닫기
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
