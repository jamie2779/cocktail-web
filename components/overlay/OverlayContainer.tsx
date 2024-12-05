import { Box } from "@chakra-ui/react";

export default function OverlayContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      position="fixed"
      bottom="0"
      width="402px"
      backgroundColor="#ffffff"
      borderTopRadius="16px"
      boxShadow="0 -4px 6px rgba(0, 0, 0, 0.1)"
      zIndex="1000"
      padding="20px"
    >
      {children}
    </Box>
  );
}
