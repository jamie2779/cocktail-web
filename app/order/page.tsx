"use client";

import { Box, VStack, Spinner, Button } from "@chakra-ui/react";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList from "@/components/MenuList";
import Back from "@/components/Back";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, number | boolean | string>;
  imageSrc: string;
}

interface MenuSectionProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const MenuSection = ({ title, subtitle, items }: MenuSectionProps) => {
  if (items.length === 0) return null;
  return (
    <>
      <Title category={title} title={subtitle} />
      <MenuList menuItems={items} />
    </>
  );
};

export default function Order() {
  const router = useRouter();

  const [vodkaItems, setVodkaItems] = useState<MenuItem[]>([]);
  const [rumItems, setRumItems] = useState<MenuItem[]>([]);
  const [ginItems, setGinItems] = useState<MenuItem[]>([]);
  const [mixItems, setMixItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const data = await response.json();
        setVodkaItems(data.vodkaItems || []);
        setRumItems(data.rumItems || []);
        setGinItems(data.ginItems || []);
        setMixItems(data.mixItems || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
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
        <MenuSection
          title="보드카 베이스"
          subtitle="깔끔하고 시원한 칵테일이에요"
          items={vodkaItems}
        />
        <MenuSection
          title="럼 베이스"
          subtitle="달콤하고 풍부한 향의 칵테일"
          items={rumItems}
        />
        <MenuSection
          title="진 베이스"
          subtitle="클래시컬하고 드라이한 칵테일"
          items={ginItems}
        />
        <MenuSection
          title="혼합 베이스"
          subtitle="특별한 시간을 위한 칵테일"
          items={mixItems}
        />
        <Title category="커스텀 칵테일" title="내가 원하는대로 만드는 칵테일" />
        <Box display="flex" justifyContent="center" alignItems="center" pb={20}>
          <Button
            width="100%"
            maxWidth="360px"
            height="48px"
            backgroundColor="#30336B"
            color="white"
            borderRadius="24px"
            _hover={{ backgroundColor: "#2C2C69" }}
            _active={{ backgroundColor: "#1E1E54" }}
            onClick={() => router.push("/custom")} // /custom 경로로 이동
          >
            제작하기
          </Button>
        </Box>
      </VStack>
      <Nav />
    </Box>
  );
}
