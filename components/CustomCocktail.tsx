"use client";

import { useState } from "react";
import { Box, VStack, Image, Button } from "@chakra-ui/react";
import IngredientItem from "@/components/IngredientItem";

interface Ingredient {
  name: string;
  amount: number;
}

export default function CustomCocktail({
  initialIngredients,
}: {
  initialIngredients: string[];
}) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialIngredients
      .filter((name) => name.trim() !== "") // 빈 문자열 제외
      .map((name) => ({ name, amount: 0 }))
  );

  const handleIncrement = (index: number) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) =>
        i === index
          ? { ...ingredient, amount: ingredient.amount + 10 }
          : ingredient
      )
    );
  };

  const handleDecrement = (index: number) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) =>
        i === index && ingredient.amount > 0
          ? { ...ingredient, amount: ingredient.amount - 10 }
          : ingredient
      )
    );
  };

  const handleOrder = () => {
    alert(
      `주문 완료!\n${ingredients
        .map((ingredient) => `${ingredient.name}: ${ingredient.amount}ml`)
        .join("\n")}`
    );
  };

  return (
    <Box
      width="100%"
      margin="0 auto"
      backgroundColor="#ffffff"
      borderRadius="16px"
      padding="16px"
      boxShadow="0 4px 16px rgba(0, 0, 0, 0.1)"
    >
      <VStack spacing="16px">
        <Image
          src="/Cocktail.png"
          alt="Custom Cocktail"
          borderRadius="16px"
          boxSize="120px"
          objectFit="cover"
        />
        {ingredients.map((ingredient, index) => (
          <IngredientItem
            key={index}
            name={ingredient.name}
            amount={ingredient.amount}
            onIncrement={() => handleIncrement(index)}
            onDecrement={() => handleDecrement(index)}
          />
        ))}
        <Button
          width="100%"
          height="48px"
          backgroundColor="#30336B"
          color="white"
          _hover={{ backgroundColor: "#2C2C69" }}
          _active={{ backgroundColor: "#1E1E54" }}
          onClick={handleOrder}
        >
          주문하기
        </Button>
      </VStack>
    </Box>
  );
}
