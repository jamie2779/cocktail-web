"use client";

import { Box, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <Box margin={5}>
      <IconButton
        backgroundColor={"#f9f9f9"}
        aria-label="back"
        cursor="pointer"
        onClick={() => handleNavigation("/")}
      >
        <Image
          src={"/Back.png"}
          alt={"back"}
          width={32}
          height={30}
          style={{ borderRadius: "10px" }}
        />
      </IconButton>
    </Box>
  );
}
