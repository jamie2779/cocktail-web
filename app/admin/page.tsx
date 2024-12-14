"use client";

import {
    Box,
    VStack,
    Heading,
    Button,
    Select,
    useToast,
} from "@chakra-ui/react";
import Back from "@/components/Back";
import { useState, useEffect } from "react";

export default function Admin() {
    const [availableDrinks, setAvailableDrinks] = useState<string[]>([]);
    const [allDrinks, setAllDrinks] = useState<string[]>([]); // 드롭다운에 표시될 전체 음료 리스트
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast(); // toast 훅 사용

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch("/api/admin");
                if (!response.ok) {
                    throw new Error("Failed to fetch drinks.");
                }
                const data = await response.json();
                setAvailableDrinks(data.availableDrinks || []);
                setAllDrinks([
                    "vodka",
                    "white_rum",
                    "triple_sec",
                    "lime_juice",
                    "cranberry_juice",
                    "simple_syrup",
                    "gin",
                    "dry_vermouth",
                ]);
            } catch (error) {
                console.error("Error fetching drinks:", error);
                toast({
                    title: "에러 발생",
                    description: "음료 정보를 불러오는 데 실패했습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchDrinks();
    }, [toast]);

    // 하드웨어 상태 체크 함수
    const checkHardwareStatus = async (): Promise<string> => {
        const getResponse = await fetch("/api/hardware", {
            method: "GET",
        });

        if (!getResponse.ok) {
            throw new Error("Failed to check hardware status.");
        }

        const status = await getResponse.json();
        return status;
    };

    // 음료 설정 저장 함수
    const handleSaveChanges = async () => {
        try {
            // 하드웨어 상태 체크
            const status = await checkHardwareStatus();
            if (status === "disconnect") {
                toast({
                    title: "하드웨어 연결 오류",
                    description: "하드웨어가 연결되지 않았습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            } else if (status === "working") {
                toast({
                    title: "이미 작동 중입니다",
                    description:
                        "현재 하드웨어가 작동 중이므로 설정을 변경할 수 없습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const response = await fetch("/api/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ availableDrinks }),
            });

            if (!response.ok) {
                throw new Error("Failed to save changes.");
            }

            await fetch("/api/queue", {
                method: "DELETE"
            });

            toast({
                title: "변경 사항 저장 성공",
                description: "음료 설정이 성공적으로 저장되었습니다.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error saving changes:", error);
            toast({
                title: "저장 실패",
                description:
                    "변경 사항 저장에 실패했습니다. 다시 시도해 주세요.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDrinkChange = (index: number, newDrink: string) => {
        setAvailableDrinks((prev) => {
            const updated = [...prev];
            updated[index] = newDrink;
            return updated;
        });
    };

    const sendMoveCommand = async (moveNumber: number) => {
        try {
            // 하드웨어 상태 체크
            const status = await checkHardwareStatus();

            if (status === "disconnect") {
                // 상태가 'disconnect'이면 하드웨어 연결 문제로 간주
                toast({
                    title: "하드웨어 연결 오류",
                    description: "하드웨어가 연결되지 않았습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return; // 함수 종료
            }

            if (status === "working") {
                // 상태가 'working'이면 이미 작동 중
                toast({
                    title: "이미 작동 중입니다",
                    description:
                        "현재 하드웨어가 작동 중이므로 명령을 보낼 수 없습니다.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
                return; // 함수 종료
            }

            // 상태가 정상적이면 명령 전송
            const postResponse = await fetch("/api/hardware", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(moveNumber),
            });

            if (!postResponse.ok) {
                throw new Error(`Failed to send move command ${moveNumber}.`);
            }

            toast({
                title: "이동 성공",
                description: `명령이 성공적으로 전송되었습니다.`,
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        } catch (error) {
            console.error(`Error sending move command ${moveNumber}:`, error);
            toast({
                title: "이동 실패",
                description: `명령 전송에 실패했습니다.`,
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    };

    if (isLoading) {
        return (
            <Box width="402px" margin="0 auto" textAlign="center">
                Loading...
            </Box>
        );
    }

    return (
        <Box
            width="402px"
            margin="0 auto"
            backgroundColor="#f9f9f9"
            display="flex"
            flexDirection="column"
        >
            <Back />
            <Box ml="10px" mb="10px">
                <Heading
                    as="h2"
                    fontSize="24px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {"관리자 페이지"}
                </Heading>
            </Box>
            <Box
                borderRadius="16px"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.08)"
                borderWidth={1}
                margin={5}
            >
                <VStack
                    flex="1"
                    overflowY="scroll"
                    margin="24px"
                    spacing="16px"
                    align="stretch"
                >
                    <Box ml="10px" mb="10px">
                        <Heading
                            as="h2"
                            fontSize="16px"
                            fontWeight="bold"
                            textAlign="left"
                        >
                            {"음료 설정"}
                        </Heading>
                        <Box color="red" fontSize="14px">
                            대기 중인 음료는 취소됩니다
                        </Box>
                    </Box>

                    {availableDrinks.map((drink, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            padding="8px"
                        >
                            <Select
                                value={drink}
                                onChange={(e) =>
                                    handleDrinkChange(index, e.target.value)
                                }
                                placeholder="음료 선택"
                                backgroundColor="#FFFEFA"
                                borderRadius="8px"
                            >
                                {allDrinks.map((option, i) => (
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    ))}
                </VStack>
            </Box>
            <Button
                margin="16px"
                colorScheme="blue"
                onClick={handleSaveChanges}
            >
                Save Changes
            </Button>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="16px"
            >
                {/* 첫 번째 줄: 초기위치, 누르기 */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    marginBottom="8px"
                >
                    {[
                        { label: "초기위치", command: 0 },
                        { label: "누르기", command: 7 },
                    ].map(({ label, command }) => (
                        <Button
                            key={command}
                            colorScheme="teal"
                            onClick={() => sendMoveCommand(command)}
                            flex="1"
                            marginX="4px"
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {/* 두 번째 줄: 이동 1, 이동 2, 이동 3 */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    marginBottom="8px"
                >
                    {[1, 2, 3].map((number) => (
                        <Button
                            key={number}
                            colorScheme="teal"
                            onClick={() => sendMoveCommand(number)}
                            flex="1"
                            marginX="4px"
                        >
                            {`이동 ${number}`}
                        </Button>
                    ))}
                </Box>

                {/* 세 번째 줄: 이동 4, 이동 5, 이동 6 */}
                <Box display="flex" justifyContent="space-between" width="100%">
                    {[4, 5, 6].map((number) => (
                        <Button
                            key={number}
                            colorScheme="teal"
                            onClick={() => sendMoveCommand(number)}
                            flex="1"
                            marginX="4px"
                        >
                            {`이동 ${number}`}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
