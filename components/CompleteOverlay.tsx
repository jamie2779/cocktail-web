import { Box,Text, Button,VStack} from "@chakra-ui/react";
import OverlayMenu from "@/components/OverlayMenu"
export default function Home() {
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

  <Text
  color="#30336B"
  fontFamily= "Pretendard"
  fontSize= "18px"
  fontWeight= "600"
  lineHeight="21.48px"
  textAlign= "center"
  sx={{
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }}


  >
    주문을 접수했어요. <br />
    순서에 맞추어 만들어드릴게요. 

  </Text>

<Button
width= "362px"
height="50px"
variant="outline"
color = "#2A2A2A"

>
      닫기</Button>
      </VStack>
    </Box>


  );
}
