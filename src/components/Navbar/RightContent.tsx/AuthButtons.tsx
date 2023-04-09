import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface AuthButtonsProps {}

const AuthButtons: FC<AuthButtonsProps> = ({}) => {
  return (
    <>
      <Button>Log In</Button>
      <Button>Sign Up</Button>
    </>
  );
};

export default AuthButtons;
