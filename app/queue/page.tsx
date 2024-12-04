"use client";

import { Box, VStack } from "@chakra-ui/react";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList, { MenuItem } from "@/components/MenuList";
import Back from "@/components/Back";
import { useEffect, useState } from "react";

function Making({ item }: { item: MenuItem }) {
  return (
    <VStack flex="1" overflowY="scroll" spacing="16px" align="stretch">
      <Title category="현재 제조 중" title="금방 맛있는 칵테일이 만들어져요" />
      <MenuList menuItems={[item]} background="#dadbe6" isClickable={false} />
    </VStack>
  );
}

export default function Queue() {
  const [queue, setQueue] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await fetch("/api/queue");
        if (!response.ok) {
          throw new Error("Failed to fetch queue");
        }
        const data = await response.json();
        setQueue(data);
      } catch (error) {
        console.error("Failed to fetch queue data:", error);
        setQueue([]); // 빈 상태로 처리
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  if (loading) {
    return <Box>로딩 중...</Box>;
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
        {queue.length > 0 ? (
          <>
            <Making item={queue[0]} />
            {queue.length > 1 && (
              <>
                <Title category="현재 대기 중" title="잠시 기다려 주세요" />
                <MenuList menuItems={queue.slice(1)} isClickable={false} />
              </>
            )}
          </>
        ) : (
          <Title
            category="대기 없음"
            title="현재 대기 중인 칵테일이 없습니다."
          />
        )}
      </VStack>
      <Nav />
    </Box>
  );
}
