import { Box, Text, Button, VStack, HStack, Stack } from "@chakra-ui/react";
import OverlayMenu from "@/components/overlay/OverlayMenu";
import { MenuItem } from "@/components/MenuList";

export default function SelectMenu({
  menuItem,
  onOrderClick,
  onCloseClick,
}: {
  menuItem: MenuItem;
  onOrderClick?: () => void; // 주문하기 클릭 핸들러
  onCloseClick?: () => void; // 닫기 클릭 핸들러
}) {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="50%"
      transform="translateX(-50%)" // 가로 중앙 정렬
      width="100%"
      maxWidth="420px"
      backgroundColor="#ffffff"
      borderTopRadius="16px"
      boxShadow="0 -4px 6px rgba(0, 0, 0, 0.1)"
      zIndex="1000"
      padding="20px"
      overflowY="auto"
    >
      <VStack flex="1" spacing="24px" align="stretch">
        {/* 칵테일 정보 */}
        <OverlayMenu
          imageSrc={menuItem.imageSrc}
          name={menuItem.name}
          description={menuItem.cocktail}
          abv={menuItem.abv}
        />

        {/* 재료 섹션 */}
        <Stack spacing="12px">
          <Text
            color="#000000"
            fontFamily="Pretendard"
            fontSize="18px"
            fontWeight="600"
            lineHeight="21.48px"
          >
            재료
          </Text>
          <Text
            color="#8E8E8E"
            fontFamily="ABeeZee"
            fontSize="13px"
            fontWeight="400"
            lineHeight="15.37px"
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

        {/* 레시피 섹션 */}
        <Stack spacing="12px">
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

        {/* 버튼 영역 */}
        <HStack spacing="12px">
          <Button
            flex="1"
            height="50px"
            backgroundColor="#30336B"
            color="white"
            onClick={onOrderClick}
            _hover={{ backgroundColor: "#2C2C69" }}
          >
            주문하기
          </Button>
          <Button
            flex="1"
            height="50px"
            variant="outline"
            borderColor="#2A2A2A"
            color="#2A2A2A"
            onClick={onCloseClick}
          >
            닫기
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
