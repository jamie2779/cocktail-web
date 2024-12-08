import { Box, VStack,Heading } from "@chakra-ui/react";
import Back from "@/components/Back";
import Setting from "@/components/Setting";


export default function Admin() {
 
  const examSettings:string[] = [
    "보드카",
    "화이트럼",
    "트리플 섹",
    "라임 주스",
    "크랜베리 주스",
    "설탕 시럽",
  ]

  return (
    <Box
      width="402px"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <Back/>
      <Box ml="10px" mb="10px">
      <Heading as="h2" fontSize="24px" fontWeight="bold" textAlign="center">
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
      <Heading as="h2" fontSize="16px" fontWeight="bold" textAlign="left">
        {"베이스 설정"}
      </Heading>
      </Box>

        {examSettings.map((name) => (
        <Setting key={name} name={name} />
      ))}



      
      </VStack>
      </Box>
    </Box>
  );
}
