"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  Image,
  Button,
  useToast, // useToast 추가
} from "@chakra-ui/react";
import IngredientItem from "@/components/IngredientItem";

interface Ingredient {
  englishName: string;
  koreanName: string;
  amount: number;
}

export default function CustomCocktail({
  initialIngredients,
}: {
  initialIngredients: { [key: string]: string }[];
}) {
  // initialIngredients는 [{ vodka: "보드카" }, { gin: "진" }] 형태로 들어옵니다.
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialIngredients
      .flatMap((ingredient) =>
        Object.entries(ingredient).map(([englishName, koreanName]) => ({
          englishName,
          koreanName,
          amount: 0
        }))
      )
  );

  const router = useRouter();
  const toast = useToast(); // useToast 사용

  const handleIncrement = (index: number) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) =>
        i === index
          ? { ...ingredient, amount: ingredient.amount + 30 }
          : ingredient
      )
    );
  };

  const handleDecrement = (index: number) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) =>
        i === index && ingredient.amount > 0
          ? { ...ingredient, amount: ingredient.amount - 30 }
          : ingredient
      )
    );
  };

  const handleOrder = async () => {
    const customCocktailData = {
      cocktail: "Custom Cocktail",
      name: "커스텀 칵테일",
      abv: -1,
      ingredients: ingredients.reduce(
        (acc: { [key: string]: number }, { englishName, amount }) => {
          if (amount > 0) acc[englishName] = amount; // 주문 데이터의 키는 영어로 설정
          return acc;
        },
        {}
      ),
      imageSrc: "none",
    };

    // 주문할 재료가 없으면 주문 불가
    if (Object.keys(customCocktailData.ingredients).length === 0) {
      toast({
        title: "주문 실패",
        description: "재료를 추가해야 주문할 수 있습니다.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    // 300ml 이상 주문할 수 없음
    const totalAmount = Object.values(customCocktailData.ingredients).reduce(
      (sum, amount) => sum + amount,
      0
    );
    if (totalAmount > 300) {
      toast({
        title: "주문 실패",
        description: "총 용량은 300ml를 초과할 수 없습니다.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("/api/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: customCocktailData }),
      });

      if (response.ok) {
        toast({
          title: "주문 성공",
          description: "주문이 성공적으로 큐에 추가되었습니다!",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        router.push("/queue");
      } else {
        toast({
          title: "주문 실패",
          description: "주문에 실패했습니다. 다시 시도해 주세요.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("주문 처리 중 에러 발생:", error);
      toast({
        title: "주문 에러",
        description: "주문 처리 중 에러가 발생했습니다.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
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
            name={ingredient.koreanName} // UI에 한국어로 표시
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
