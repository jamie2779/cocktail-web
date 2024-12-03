"use client";

import { Box, VStack, Heading, Button } from "@chakra-ui/react";
import Back from "@/components/Back";
import Setting from "@/components/Setting";
import { useState, useEffect } from "react";

export default function Admin() {
  const [availableDrinks, setAvailableDrinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the current data from the JSON file
  useEffect(() => {
    const fetchAvailableDrinks = async () => {
      try {
        const response = await fetch("/api/admin");
        if (!response.ok) {
          throw new Error("Failed to fetch available drinks.");
        }
        const data = await response.json();
        setAvailableDrinks(data.availableDrinks || []);
      } catch (error) {
        console.error("Error fetching available drinks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableDrinks();
  }, []);

  // Update a drink name
  const updateDrinkName = (index: number, newName: string) => {
    setAvailableDrinks((prev) =>
      prev.map((drink, i) => (i === index ? newName : drink))
    );
  };

  // Save the updated data to the JSON file
  const saveChanges = async () => {
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
              {"베이스 설정"}
            </Heading>
          </Box>
          {availableDrinks.map((drink, index) => (
            <Setting
              key={index}
              name={drink}
              onNameChange={(newName) => updateDrinkName(index, newName)}
            />
          ))}
        </VStack>
      </Box>
      <Button margin="16px" colorScheme="blue" onClick={saveChanges}>
        Save Changes
      </Button>
    </Box>
  );
}
