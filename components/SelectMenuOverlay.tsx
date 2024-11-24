import { Box,Text, Button,VStack,HStack,Stack} from "@chakra-ui/react";
import OverlayMenu from "@/components/OverlayMenu"
export default function SelectMenu() {
  const examItem = 
    {
      imageSrc: "/Cosmopolitan.png",
      name: "코스모폴리탄",
      description: "시티 라이프의 감각적인 매력",
      abv: 22.9,
    };


  return (
    <Box
      width="410px"
      margin="0 auto"
      backgroundColor="#ffffff"
      borderWidth="1px"
      padding="20px"
      borderTopRadius={30}
    >
      <VStack
        flex="1"
        overflowY="scroll"
        spacing="42px"
        align="stretch"
        
      
      >
      
        <OverlayMenu
          imageSrc={examItem.imageSrc}
          name={examItem.name}
          description={examItem.description}
          abv={examItem.abv}
        />
  <Stack
  >
  <Text
  color="#000000"
  fontFamily= "Pretendard"
  fontSize= "18px"
  fontWeight= "600"
  lineHeight="21.48px"
  textAlign= "left"
  sx={{
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }}


  >
    재료

  </Text>
  <Text
  color="#8E8E8E"
  fontFamily= "ABeeZee"
  fontSize= "13px"
  fontWeight= "400"
  lineHeight="15.37px"
  textAlign= "left"
  sx={{
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }}

  
  >
    보드카 45ml <br/>
    트리플 섹 15ml <br/>
    라임 주스 15ml <br/>
    크랜베리 주스 30ml <br/>
    얼음 

  </Text>
  </Stack>
  <Stack>
  <Text
  color="#000000"
  fontFamily= "Pretendard"
  fontSize= "18px"
  fontWeight= "600"
  lineHeight="21.48px"
  sx={{
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }}


  >
    레시피

  </Text>
  <Text
  color="#8E8E8E"
  fontFamily= "ABeeZee"
  fontSize= "13px"
  fontWeight= "400"
  lineHeight="15.37px"
  sx={{
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }}

  
  >1. 쉐이커에 얼음을 넣습니다.<br/>
   2. 모든 재료를 쉐이커에 넣고 잘 흔들어 섞습니다.<br/>
   3. 칵테일 글라스에 걸러서 따릅니다. <br/>

  </Text>
  </Stack>
<HStack>
<Button
width= "175px"
height="50px"
color = "#30336B"
textColor={"white"}
>

  
      주문하기</Button>
      <Button
width= "175px"
height="50px"
variant="outline"
color = "#2A2A2A"
>
      닫기</Button>
      </HStack>
      </VStack>
    </Box>


  );
}
