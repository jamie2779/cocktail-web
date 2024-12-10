"use client";

import { Box, VStack, Heading, Button, Select } from "@chakra-ui/react";
import Back from "@/components/Back";
import { useState, useEffect } from "react";

export default function Admin() {
  const [availableDrinks, setAvailableDrinks] = useState<string[]>([]);
  const [allDrinks, setAllDrinks] = useState<string[]>([]); // 드롭다운에 표시될 전체 음료 리스트
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("/api/admin");
        if (!response.ok) {
          throw new Error("Failed to fetch drinks.");
        }
        const data = await response.json();
        setAvailableDrinks(data.availableDrinks || []);
        setAllDrinks([
          "vodka",
          "white_rum",
          "triple_sec",
          "lime_juice",
          "cranberry_juice",
          "simple_syrup",
          "gin",
          "dry_vermouth",
        ]);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availableDrinks }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes.");
      }

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  const handleDrinkChange = (index: number, newDrink: string) => {
    setAvailableDrinks((prev) => {
      const updated = [...prev];
      updated[index] = newDrink;
      return updated;
    });
  };

  if (isLoading) {
    return (
      <Box width="402px" margin="0 auto" textAlign="center">
        Loading...
      </Box>
    );
  }

  return (
    <Box
      width="402px"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <Back />
      <Box ml="10px" mb="10px">
        <Heading as="h2" fontSize="24px" fontWeight="bold" textAlign="center">
          {"관리자 페이지"}
        </Heading>
      </Box>
      <Box
        borderRadius="16px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.08)"
        borderWidth={1}
        margin={5}
      >
        <VStack
          flex="1"
          overflowY="scroll"
          margin="24px"
          spacing="16px"
          align="stretch"
        >
          <Box ml="10px" mb="10px">
            <Heading as="h2" fontSize="16px" fontWeight="bold" textAlign="left">
              {"음료 설정"}
            </Heading>
          </Box>
          {availableDrinks.map((drink, index) => (
            <Box key={index} display="flex" alignItems="center" padding="8px">
              <Select
                value={drink}
                onChange={(e) => handleDrinkChange(index, e.target.value)}
                placeholder="음료 선택"
                backgroundColor="#FFFEFA"
                borderRadius="8px"
              >
                {allDrinks.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Box>
          ))}
        </VStack>
      </Box>
      <Button margin="16px" colorScheme="blue" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Box>
  );
}
