import { Box, Text, Heading } from "@chakra-ui/react";

interface TitleProps {
  category: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ category, title }) => {
  return (
    <Box ml="10px" mb="10px">
      <Heading as="h2" fontSize="24px" fontWeight="bold">
        {category}
      </Heading>
      <Text fontSize="16px" opacity={0.5}>
        {title}
      </Text>
    </Box>
  );
};

export default Title;
