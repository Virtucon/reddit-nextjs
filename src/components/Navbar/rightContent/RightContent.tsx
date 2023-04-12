import AuthModal from "@/components/modal/auth/AuthModal";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { FC } from "react";
import AuthButtons from "./AuthButtons";
import { auth } from "@/firebase/clientApp";
import Icons from "./Icons";

interface RightContentProps {
  user?: User | null;
}

const RightContent: FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex
        justify="center"
        align="center"
      >
        {user ? <Icons /> : <AuthButtons /> }
      </Flex>
    </>
  );
};

export default RightContent;
