import { Box, VStack,Image,Text } from "@chakra-ui/react";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList from "@/components/MenuList";

function Card(){
  
  const rumItems = [
    {
      imageSrc: "/Cosmopolitan.png",
      name: "코스모폴리탄",
      description: "시티 라이프의 감각적인 매력",
      abv: 22.9,
      
    },
  ];
  
  return (
      <VStack
        flex="1"
        overflowY="scroll"
        pt="50px"
        spacing="16px"
        align="stretch"
        
      >
        
        <Title category="현재 제조 중" title="금방 맛있는 칵테일이 만들어져요" />
        <MenuList menuItems={rumItems} background="#dadbe6"/>
        
      </VStack>

  );
}


export default function Home() {
  
  const vodkaItems = [

    {
      imageSrc: "/Cape_Codder.png",
      name: "케이프 코더",
      description: "시원한 바닷바람을 담은 보드카 칵테일",
      abv: 7.5,
    },
    {
      imageSrc: "/Vodka_Gimlet.png",
      name: "보드카 김렛",
      description: "진한 여운을 남기는 상쾌함",
      abv: 26.7,
    },
    {
      imageSrc: "/Vodka_Sour.png",
      name: "보드카 사워",
      description: "산미가 돋보이는 보드카의 매력",
      abv: 20.0,
    },
  ];



  return (
    <Box
      width="402px"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <VStack
        flex="1"
        overflowY="scroll"
        margin="24px"
        pt="50px"
        spacing="16px"
        align="stretch"
      >
        <Card/>
        <Title category="대기열" title="잠시 기다려 주세요" />
        <MenuList menuItems={vodkaItems} />
        
      </VStack>
      
      <Nav />
    </Box>
  );
}





