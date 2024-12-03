import { Box, Text, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface SettingProps {
  name: string;
  onNameChange?: (newName: string) => void; // 이름 변경 핸들러
}

export default function Setting({ name, onNameChange }: SettingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onNameChange) {
      onNameChange(inputValue.trim() !== "" ? inputValue.trim() : ""); // 빈 문자열 허용
    }
  };

  return (
    <Box
      display="flex"
      padding="16px"
      backgroundColor={name === "" ? "#E0E0E0" : "#FFFEFA"}
      justifyContent="space-between"
      borderRadius="16px"
      alignItems="center"
      borderWidth={1}
      cursor="pointer" // 클릭 가능
      onClick={() => setIsEditing(true)} // 클릭하면 항상 편집 모드
    >
      {isEditing ? (
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Enter a new name"
          autoFocus
        />
      ) : (
        <Text
          fontSize="18px"
          fontWeight="semibold"
          lineHeight="1.2"
          color={name === "" ? "#999" : "#000"}
        >
          {name === "" ? "비활성화된 음료" : name}
        </Text>
      )}
      <Image src={"/Revise.png"} alt={"revise"} width={40} height={40} />
    </Box>
  );
}
