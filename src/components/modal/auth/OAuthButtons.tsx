import { Flex, Button, Image, Text } from "@chakra-ui/react";
import error from "next/error";
import { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

interface OAuthButtonsProps {}

const OAuthButtons: FC<OAuthButtonsProps> = ({}) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex
      direction="column"
      mb={4}
      width="100%"
    >
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image
          src="/images/googlelogo.png"
          height="20px"
          mr={4}
          alt="google-login"
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Some other Provider</Button>
      {error && <Text color="red.500">{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
