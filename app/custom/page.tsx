"use client";

import { useEffect, useState } from "react";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import CustomCocktail from "@/components/CustomCocktail";
import Back from "@/components/Back";

export default function CustomPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("/api/admin"); // admin의 GET API 호출
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients.");
        }
        const data = await response.json();
        setIngredients(data.availableDrinks || []);
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
