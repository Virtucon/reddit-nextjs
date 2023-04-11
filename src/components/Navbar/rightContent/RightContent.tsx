import AuthModal from "@/components/modal/auth/AuthModal";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { FC } from "react";
import AuthButtons from "./AuthButtons";
import { auth } from "@/firebase/clientApp";

interface RightContentProps {
  user: any;
}

const RightContent: FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex
        justify="center"
        align="center"
      >
        {user ? (
          <Button onClick={() => signOut(auth)}>Log out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
