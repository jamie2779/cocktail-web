import { Box } from "@chakra-ui/react";
import Menu from "./Menu";
import SelectMenu from "@/components/overlay/SelectMenu";
import CompleteOverlay from "@/components/overlay/CompleteOverlay";
import { useState } from "react";

export interface MenuItem {
  cocktail: string;
  name: string;
  abv: number;
  ingredients: Record<string, string | number | boolean>;
  imageSrc: string;
}

interface MenuListProps {
  menuItems: MenuItem[];
  background?: string;
  isClickable?: boolean; // 클릭 가능 여부를 제어하는 속성 추가
}

const MenuList = ({
  menuItems,
  background: color = "#fff",
  isClickable = true, // 기본값: 클릭 가능
}: MenuListProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null); // 선택된 메뉴
  const [orderComplete, setOrderComplete] = useState(false); // 주문 완료 상태
  const [overlayVisible, setOverlayVisible] = useState(false); // 오버레이 표시 상태

  const handleMenuClick = (item: MenuItem) => {
    if (isClickable) {
      setSelectedMenu(item);
      setOverlayVisible(true); // 메뉴 클릭 시 오버레이 표시
    }
  };

  const handleOrder = () => {
    setOrderComplete(true); // 주문 완료 상태로 설정
    setOverlayVisible(false); // 기존 SelectMenu 오버레이 닫기
  };

  const handleClose = () => {
    setOverlayVisible(false); // 기존 SelectMenu 오버레이만 닫기
  };

  const closeOverlay = () => {
    setSelectedMenu(null); // 선택된 메뉴 초기화
    setOverlayVisible(false); // 오버레이 닫기
  };

  return (
    <Box
      backgroundColor={color}
      borderRadius="16px"
      marginBottom="50px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.08)"
    >
      {menuItems.map((item: MenuItem, index: number) => {
        // `imageSrc`가 none 또는 빈 값일 경우 기본 이미지 경로 설정
        const validImageSrc =
          item.imageSrc && item.imageSrc !== "none"
            ? item.imageSrc
            : "/Cocktail.png";

        return (
          <Box
            key={index}
            onClick={() => handleMenuClick(item)} // 클릭 여부 조건 반영
            cursor={isClickable ? "pointer" : "default"} // 클릭 가능 여부에 따라 커서 변경
          >
            <Menu
              key={index}
              imageSrc={validImageSrc}
              name={item.name}
              description={item.cocktail}
              abv={item.abv}
            />
          </Box>
        );
      })}

      {/* SelectMenu 오버레이 */}
      {isClickable && selectedMenu && overlayVisible && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
          onClick={closeOverlay}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <SelectMenu
              menuItem={selectedMenu}
              onOrderClick={handleOrder}
              onCloseClick={handleClose}
            />
          </Box>
        </Box>
      )}

      {/* CompleteOverlay 오버레이 */}
      {orderComplete && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
        >
          <CompleteOverlay onClose={() => setOrderComplete(false)} />
        </Box>
      )}
    </Box>
  );
};

export default MenuList;
