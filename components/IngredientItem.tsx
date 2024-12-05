"use client";

import { HStack, Text, Input, IconButton, VStack } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface IngredientItemProps {
  name: string;
  amount: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function IngredientItem({
  name,
  amount,
  onIncrement,
  onDecrement,
}: IngredientItemProps) {
  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      padding="8px"
      borderRadius="8px"
      backgroundColor="#F7F7F7"
    >
      <Text fontWeight="semibold">{name}</Text>
      <HStack>
        <Input
          value={`${amount} ml`}
          readOnly
          width="80px"
          textAlign="center"
          border="none"
          background="transparent"
          fontWeight="semibold"
        />
        <VStack spacing="0">
          <IconButton
            aria-label="Increase amount"
            icon={<ChevronUpIcon />}
            size="sm"
            onClick={onIncrement}
          />
          <IconButton
            aria-label="Decrease amount"
            icon={<ChevronDownIcon />}
            size="sm"
            onClick={onDecrement}
          />
        </VStack>
      </HStack>
    </HStack>
  );
}
