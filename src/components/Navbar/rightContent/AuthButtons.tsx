import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface AuthButtonsProps {}

const AuthButtons: FC<AuthButtonsProps> = ({}) => {
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => console.log("Log In")}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => console.log("Sign Up")}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
