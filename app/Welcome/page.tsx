import { Box, VStack,Heading,Text,Flex,Button } from "@chakra-ui/react";
import Image from "next/image";

export default function Welcome() {
 

  return (
    <Box
      width="402px"
      margin="0 auto"
      backgroundColor="#f9f9f9"
      display="flex"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" margin={30}>
      <Image
        src={"/User.png"}
        alt = {"user"}
        width={40}
        height={50}
        
      />
      </Flex>
      <VStack
        flex="1"
        overflowY="scroll"
        margin="24px"
        spacing="16px"
        align="stretch"
      >
        <Box ml="10px" mb="10px">
      <Heading as="h2" fontSize="24px" fontWeight="bold" textAlign="center">
        {"환영합니다!"}
      </Heading>
      <Text fontSize="16px" opacity={0.5} textAlign="center">
        {"원하는 칵테일을 제조해 드리는 ‘칵테일 제조기’ 입니다."}
      </Text>



      <Button
      width={340}
      height={254}
      backgroundColor="#4C51BF"
      marginTop = {85}
      marginBottom={120}
      >
        <VStack>
        <Image
        src={"/Cocktail.png"}
        alt = {"cocktail"}
        width={200}
        height={200}
        />
       <Text fontSize={20} fontFamily="ABeeZee" opacity={0.75} >주문하기</Text>
        



        </VStack>
        </Button>
    </Box>



      </VStack>
      
    </Box>
  );
}
