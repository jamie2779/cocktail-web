"use client";

import { Box, VStack } from "@chakra-ui/react";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList from "@/components/MenuList";
import Back from "@/components/Back";

export default function Home() {
  const vodkaItems = [
    {
      imageSrc: "/Cosmopolitan.png",
      name: "코스모폴리탄",
      description: "시티 라이프의 감각적인 매력",
      abv: 22.9,
    },
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

  const rumItems = [
    {
      imageSrc: "/Daiquiri.png",
      name: "다이키리",
      description: "고전 속에 숨은 상큼한 달콤함",
      abv: 22.9,
    },
    {
      imageSrc: "/Rum_Gimlet.png",
      name: "럼 김렛",
      description: "부드러운 향과 산뜻한 균형",
      abv: 26.7,
    },
    {
      imageSrc: "/Rum_Sour.png",
      name: "럼 사워",
      description: "풍부한 과일 향과 상큼한 산미의 조화",
      abv: 20.0,
    },
    {
      imageSrc: "/Cranberry_Daiquiri.png",
      name: "크랜베리 다이키리",
      description: "과일 향과 함께 어우러진 산뜻한 한 잔",
      abv: 17.1,
    },
  ];

  const mixItems = [
    {
      imageSrc: "/Kamikaze.png",
      name: "카미카제",
      description: "강렬한 첫인상을 남기는 한 잔",
      abv: 26.7,
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
      <Back />
      <VStack
        flex="1"
        overflowY="scroll"
        margin="24px"
        spacing="16px"
        align="stretch"
      >
        <Title category="보드카 베이스" title="깔끔하고 시원한 칵테일이에요" />
        <MenuList menuItems={vodkaItems} />
        <Title category="럼 베이스" title="달콤하고 풍부한 향의 칵테일" />
        <MenuList menuItems={rumItems} />
        <Title category="혼합 베이스" title="특별한 시간을 위한 칵테일" />
        <MenuList menuItems={mixItems} />
      </VStack>
      <Nav />
    </Box>
  );
}
