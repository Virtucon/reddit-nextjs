import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./rightContent/RightContent";
import SearchInput from "./SearchInput";
import { auth } from "../../firebase/clientApp";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
      >
        <Image
          src="/images/redditFace.svg"
          height="30px"
          alt="text"
        />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
          alt="text"
        />
      </Flex>
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
