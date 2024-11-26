import { Box, Text, Button, VStack, HStack, Stack } from "@chakra-ui/react";
import OverlayMenu from "@/components/OverlayMenu";

export interface MenuItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, string | number | boolean>;
  imageSrc: string;
}

export default function SelectMenu({ menuItem }: { menuItem: MenuItem }) {
  return (
    <Box
      width="410px"
      margin="0 auto"
      backgroundColor="#ffffff"
      borderWidth="1px"
      padding="20px"
      borderTopRadius={30}
    >
      <VStack flex="1" overflowY="scroll" spacing="42px" align="stretch">
        <OverlayMenu
          imageSrc={menuItem.imageSrc}
          name={menuItem.name}
          description={menuItem.cocktail}
          abv={menuItem.abv}
        />
        <Stack>
          <Text
            color="#000000"
            fontFamily="Pretendard"
            fontSize="18px"
            fontWeight="600"
            lineHeight="21.48px"
            textAlign="left"
          >
            재료
          </Text>
          <Text
            color="#8E8E8E"
            fontFamily="ABeeZee"
            fontSize="13px"
            fontWeight="400"
            lineHeight="15.37px"
            textAlign="left"
          >
            {Object.entries(menuItem.ingredients).map(([key, value], idx) => {
              const label = key.replace(/_/g, " ").toUpperCase();
              if (typeof value === "boolean") {
                return (
                  <span key={idx}>
                    {label}: {value ? "있음" : "없음"}
                    <br />
                  </span>
                );
              }
              return (
                <span key={idx}>
                  {label}: {value}
                  {typeof value === "number" ? "ml" : ""}
                  <br />
                </span>
              );
            })}
          </Text>
        </Stack>
        <Stack>
          <Text
            color="#000000"
            fontFamily="Pretendard"
            fontSize="18px"
            fontWeight="600"
            lineHeight="21.48px"
          >
            레시피
          </Text>
          <Text
            color="#8E8E8E"
            fontFamily="ABeeZee"
            fontSize="13px"
            fontWeight="400"
            lineHeight="15.37px"
          >
            1. 재료를 준비합니다.
            <br />
            2. 필요한 경우 쉐이커를 사용해 혼합합니다.
            <br />
            3. 글라스에 따라냅니다.
            <br />
            4.{" "}
            {menuItem.ingredients.garnish
              ? `가니쉬: ${menuItem.ingredients.garnish}`
              : "가니쉬 없음"}
          </Text>
        </Stack>
        <HStack>
          <Button
            width="175px"
            height="50px"
            color="#30336B"
            textColor={"white"}
          >
            주문하기
          </Button>
          <Button width="175px" height="50px" variant="outline" color="#2A2A2A">
            닫기
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
