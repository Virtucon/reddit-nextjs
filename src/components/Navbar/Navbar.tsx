import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" height="30px" alt="logo" />
        <Image src="/images/redditText.svg" height="46px" alt="logoText" display={{ base: "none", md: "unset" }} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
