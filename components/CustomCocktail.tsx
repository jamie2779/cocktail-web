"use client";

import { useState } from "react";
import { Box, VStack, Image, Button, Alert, AlertIcon } from "@chakra-ui/react";
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

  const [orderStatus, setOrderStatus] = useState<string | null>(null); // 주문 상태 관리

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
      cocktail: "Custom Cocktail", // 커스텀 칵테일 이름
      name: "커스텀 칵테일", // 사용자 지정 칵테일 이름
      abv: -1,
      ingredients: ingredients.reduce(
        (acc: { [key: string]: number }, { name, amount }) => {
          if (amount > 0) acc[name] = amount; // 양이 0보다 큰 재료만 포함
          return acc;
        },
        {}
      ),
      imageSrc: "none",
    };

    // 주문할 재료가 없으면 주문 불가
    if (Object.keys(customCocktailData.ingredients).length === 0) {
      setOrderStatus("재료를 추가해야 주문할 수 있습니다.");
      return;
    }

    // 300ml 이상 주문할 수 없음
    const totalAmount = Object.values(customCocktailData.ingredients).reduce(
      (sum, amount) => sum + amount,
      0
    );

    if (totalAmount > 300) {
      setOrderStatus("총 용량은 300ml를 초과할 수 없습니다.");
      return;
    }

    // 큐에 주문을 보냄
    try {
      const response = await fetch("/api/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: customCocktailData }),
      });

      if (response.ok) {
        setOrderStatus("주문이 큐에 추가되었습니다!"); // 성공
      } else {
        setOrderStatus("주문 실패! 다시 시도해 주세요."); // 실패
      }
    } catch (error) {
      console.error("주문 처리 중 에러 발생:", error);
      setOrderStatus("주문 처리 중 에러가 발생했습니다."); // 오류 처리
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
        {/* 주문 상태 알림 */}
        {orderStatus && (
          <Alert
            status={
              orderStatus.includes("실패") || orderStatus.includes("에러")
                ? "error"
                : "success"
            }
          >
            <AlertIcon />
            {orderStatus}
          </Alert>
        )}

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
          onClick={handleOrder} // 주문하기 클릭 핸들러
        >
          주문하기
        </Button>
      </VStack>
    </Box>
  );
}
