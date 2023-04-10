import { Flex, Button, Image, Text } from "@chakra-ui/react";
import error from "next/error";
import { FC } from "react";

interface OAuthButtonsProps {}

const OAuthButtons: FC<OAuthButtonsProps> = ({}) => {
  return (
    <Flex
      direction="column"
      mb={4}
      width="100%"
    >
      <Button variant="oauth" mb={2}>
        <Image
          src="/images/googlelogo.png"
          height="20px"
          mr={4}
          alt="google-login"
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Some other Provider</Button>
    </Flex>
  );
};

export default OAuthButtons;
