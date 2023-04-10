import AuthModal from "@/components/modal/auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import AuthButtons from "./AuthButtons";

interface RightContentProps {}

const RightContent: FC<RightContentProps> = ({}) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
