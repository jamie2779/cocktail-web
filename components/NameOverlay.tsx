import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
export default function Name() {
  return (
    <Box
      width="410px"
      margin="0 auto"
      backgroundColor="#ffffff"
      borderWidth="1px"
      padding="20px"
      borderTopRadius={30}
    >
      <VStack flex="1" overflowY="scroll" spacing="27px" align="stretch">
        <Text
          color="#000000"
          fontFamily="Pretendard"
          fontSize="18px"
          fontWeight="600"
          lineHeight="21.48px"
          textAlign="center"
          sx={{
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          이름변경
        </Text>
        <Box
          width={357}
          height={76}
          borderRadius={16}
          borderWidth={1}
          background="#F8F8FD"
          boxShadow="lg"
        ></Box>
        <HStack>
          <Button
            width="175px"
            height="50px"
            color="#30336B"
            textColor={"white"}
          >
            확인
          </Button>
          <Button width="175px" height="50px" variant="outline" color="#2A2A2A">
            닫기
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
