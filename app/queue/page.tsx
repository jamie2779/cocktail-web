"use client";

import { Box, VStack, Button, useToast } from "@chakra-ui/react"; // useToast, Text 추가
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import MenuList, { MenuItem } from "@/components/MenuList";
import Back from "@/components/Back";
import { useEffect, useRef, useState } from "react";

function Making({ item }: { item: MenuItem }) {
    return (
        <VStack align="stretch" spacing="16px">
            <Title
                category="현재 제조 중"
                title="금방 맛있는 칵테일이 만들어져요"
            />
            <MenuList
                menuItems={[item]}
                background="#dadbe6"
                isClickable={false}
            />
        </VStack>
    );
}

export default function Queue() {
    const [queue, setQueue] = useState<MenuItem[]>([]);
    const [next, setNext] = useState<MenuItem | Partial<MenuItem>>({}); // 타입 변경
    const [loading, setLoading] = useState(true);
    const toast = useToast(); // Toast 훅 추가
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // 인터벌 참조

    // 큐 데이터 가져오기
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
        }
    };

    // 현재 제조 중인 음료 가져오기
    const fetchNext = async () => {
        try {
            const response = await fetch("/api/next");
            if (!response.ok) {
                throw new Error("Failed to fetch next drink");
            }
            const data = await response.json();
            setNext(data);
        } catch (error) {
            console.error("Failed to fetch next drink data:", error);
            setNext({}); // next 데이터 초기화 (빈 객체로 설정)
        }
    };

    // 초기 데이터를 가져옴
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchQueue(), fetchNext()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    // 제조 중일 때만 주기적으로 /api/next를 호출
    useEffect(() => {
        if (Object.keys(next).length > 0) {
            // 기존 인터벌 클리어
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            // 새로운 인터벌 시작
            intervalRef.current = setInterval(() => {
                fetchNext();
            }, 5000); // 5초마다 next 데이터 갱신
        } else {
            // next가 비어 있을 때 인터벌 해제
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // 클린업 함수로 인터벌 정리
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [next]);

    // 다음 음료 제조 시작
    const handleStartNextDrink = async () => {
        try {
            const response = await fetch("/api/make", { method: "GET" });

            if (response.status === 400) {
                toast({
                    title: "오류 발생",
                    description: "음료 제조를 시작할 수 없습니다.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
                return; // 400 에러의 경우 함수 종료
            }

            if (!response.ok) {
                throw new Error("Failed to start next drink");
            }

            await fetchNext();
            await fetchQueue();
        } catch (error) {
            const err = error as Error; // 명시적인 단언 추가

            console.error("Failed to start next drink:", err.message);

            if (err.message.includes("400")) {
                toast({
                    title: "오류 발생",
                    description: "음료 제조를 시작할 수 없습니다.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "오류 발생",
                    description:
                        "음료 제조 중 예기치 않은 오류가 발생했습니다.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            }
        }
    };

    // 대기열 초기화
    const handleClearQueue = async () => {
        try {
            const response = await fetch("/api/queue", { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Failed to clear queue");
            }

            setQueue([]); // queue를 빈 배열로 설정
            toast({
                title: "성공",
                description: "대기열이 초기화되었습니다.",
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Failed to clear queue:", error);
            toast({
                title: "오류 발생",
                description: "대기열 초기화에 실패했습니다.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    };

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
                overflowY="auto"
                margin="24px"
                align="stretch"
                spacing="16px"
            >
                {Object.keys(next).length > 0 ? (
                    <>
                        {/* 제조중 부분 */}
                        <Making item={next as MenuItem} />
                        {queue.length > 0 && (
                            <>
                                <Title
                                    category="현재 대기 중"
                                    title="잠시 기다려 주세요"
                                />
                                <Button
                                    variant="link"
                                    colorScheme="red"
                                    mt="8px"
                                    alignSelf="flex-end"
                                    onClick={handleClearQueue}
                                    size="sm"
                                >
                                    대기열 초기화
                                </Button>
                                <Box
                                    maxHeight="calc(100vh - 300px)"
                                    overflowY="auto"
                                    mt="8px"
                                >
                                    <MenuList
                                        menuItems={queue}
                                        isClickable={false}
                                    />
                                </Box>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Title
                            category="준비 완료"
                            title="현재 제조 중인 칵테일이 없습니다."
                        />
                        {Object.keys(next).length === 0 && queue.length > 0 && (
                            <>
                                <Button
                                    colorScheme="blue"
                                    onClick={handleStartNextDrink}
                                    mt="8px"
                                    mb="16px"
                                >
                                    다음 음료 제조
                                </Button>
                                <Title
                                    category="현재 대기 중"
                                    title="잠시 기다려 주세요"
                                />
                                <Button
                                    variant="link"
                                    colorScheme="red"
                                    alignSelf="flex-end"
                                    onClick={handleClearQueue}
                                    size="sm"
                                >
                                    대기열 초기화
                                </Button>
                                <Box
                                    maxHeight="calc(100vh - 300px)"
                                    overflowY="auto"
                                >
                                    <MenuList
                                        menuItems={queue}
                                        isClickable={false}
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
            </VStack>
            <Nav />
        </Box>
    );
}
