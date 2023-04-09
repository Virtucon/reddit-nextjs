import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import SearchInput from "./SearchInput";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px" justifyContent={{ md: "space-between" }}>
      <Flex align="center" width={{ base: "40px", md: "auto" }} mr={{ base: 0, md: 2 }} cursor="pointer">
        <Image src="/images/redditFace.svg" height="30px" alt="text" />
        <Image display={{ base: "none", md: "unset" }} src="/images/redditText.svg" height="46px" alt="text" />
      </Flex>
      <SearchInput />
    </Flex>
  );
};

export default Navbar;
