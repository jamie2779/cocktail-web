import { Box } from "@chakra-ui/react";
import Image from "next/image";


export default function Back(){
    return(
        <Box margin={5}>
            <Image
                src={"/Back.png"}
                alt = {"back"}
                width={32}
                height={30}
            />
        </Box>
    );
};