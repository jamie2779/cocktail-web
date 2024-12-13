import { Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import OverlayContainer from "./OverlayContainer";

export default function CompleteOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push("/queue");
  };

  return (
    <OverlayContainer>
      <VStack flex="1" spacing="16px" align="stretch">
        <Text
          color="#30336B"
          fontFamily="Pretendard"
          fontSize="18px"
          fontWeight="600"
          lineHeight="21.48px"
          textAlign="center"
        >
          주문을 접수했어요. <br />
          순서에 맞추어 만들어드릴게요.
        </Text>

        <Button
          width="100%"
          height="50px"
          variant="outline"
          color="#2A2A2A"
          onClick={handleClose}
        >
          닫기
        </Button>
      </VStack>
    </OverlayContainer>
  );
}
