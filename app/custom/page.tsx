"use client";

import { useEffect, useState } from "react";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import CustomCocktail from "@/components/CustomCocktail";
import Back from "@/components/Back";

export default function CustomPage() {
  // ingredients의 타입을 { [key: string]: string }[] 로 설정
  const [ingredients, setIngredients] = useState<{ [key: string]: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("/api/admin"); // admin의 GET API 호출
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients.");
        }
        const data = await response.json();
        const englishIngredients = data.availableDrinks || [];

        // /api/liquor로 얻은 영어->한국어 매핑 데이터 호출
        const liquorResponse = await fetch("/api/liquor");
        if (!liquorResponse.ok) {
          throw new Error("Failed to fetch liquor translation data.");
        }
        const liquorData = await liquorResponse.json();

        // 영어 이름과 한국어 이름을 객체로 변환
        const ingredientPairs = englishIngredients.map((ingredient: string) => ({
          [ingredient]: liquorData[ingredient] || ingredient // 매핑된 한국어 이름이 없으면 영어 이름 그대로 사용
        }));

        setIngredients(ingredientPairs); // 영어-한국어 매핑 객체 배열로 저장
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (isLoading) {
    return (
      <Box
        width="402px"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#f9f9f9"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      width="402px"
      height="100vh"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <Back />
      <VStack
        flex="1"
        overflowY="scroll"
        margin="24px"
        spacing="16px"
        align="stretch"
      >
        <CustomCocktail initialIngredients={ingredients} />
      </VStack>
    </Box>
  );
}
