"use client";

import { Box, VStack, Spinner } from "@chakra-ui/react";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList from "@/components/MenuList";
import Back from "@/components/Back";
import { useEffect, useState } from "react";

interface MenuItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, number | boolean | string>;
  imageSrc: string;
}

export default function Order() {
  const [vodkaItems, setVodkaItems] = useState<MenuItem[]>([]);
  const [rumItems, setRumItems] = useState<MenuItem[]>([]);
  const [mixItems, setMixItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // 디버깅용 출력
        setVodkaItems(data.vodkaItems || []);
        setRumItems(data.rumItems || []);
        setMixItems(data.mixItems || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <Box
        width="402px"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#f9f9f9"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      width="402px"
      height="100vh"
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
