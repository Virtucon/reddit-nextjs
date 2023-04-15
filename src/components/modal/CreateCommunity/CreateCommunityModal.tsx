import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Checkbox,
  Flex,
  Icon,
  Input,
  Stack,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

interface CreateCommunityModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateCommunityModal: FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be at least 3 characters long and can only contain letters, numbers, and underscores"
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        throw new Error(
          `Sorry, r/${communityName} already exists. Try another.`
        );
      }

      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error: ", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={handleClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box
            pl={3}
            pr={3}
          >
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection="column"
              padding="10px 0px"
            >
              <Text
                fontWeight={600}
                fontSize={15}
              >
                Name
              </Text>
              <Text
                fontSize={11}
                color="gray.500"
              >
                Community names including capitalization cannot be changed
              </Text>
              <Text
                color="gray.400"
                position="relative"
                top="28px"
                left="10px"
                width="20px"
              >
                r/
              </Text>
              <Input
                value={communityName}
                position="relative"
                name="name"
                pl="22px"
                type={""}
                size="sm"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
                pt={2}
                ml={1}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text
                fontSize="9pt"
                color="red"
                pt={1}
              >
                {error}
              </Text>
              <Box
                mt={4}
                mb={4}
              >
                <Text
                  fontWeight={600}
                  fontSize={15}
                >
                  Community Type
                </Text>
                <Stack
                  spacing={2}
                  pt={1}
                >
                  <Checkbox
                    colorScheme="blue"
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon
                        as={BsFillPersonFill}
                        mr={2}
                        color="gray.500"
                      />
                      <Text
                        fontSize="10pt"
                        mr={1}
                      >
                        Public
                      </Text>
                      <Text
                        fontSize="8pt"
                        color="gray.500"
                        pt={1}
                      >
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    colorScheme="blue"
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon
                        as={BsFillEyeFill}
                        color="gray.500"
                        mr={2}
                      />
                      <Text
                        fontSize="10pt"
                        mr={1}
                      >
                        Restricted
                      </Text>
                      <Text
                        fontSize="8pt"
                        color="gray.500"
                        pt={1}
                      >
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    colorScheme="blue"
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon
                        as={HiLockClosed}
                        color="gray.500"
                        mr={2}
                      />
                      <Text
                        fontSize="10pt"
                        mr={1}
                      >
                        Private
                      </Text>
                      <Text
                        fontSize="8pt"
                        color="gray.500"
                        pt={1}
                      >
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter
            bg="gray.100"
            borderRadius="0px 0px 10px 10px"
          >
            <Button
              variant="outline"
              height="30px"
              mr={2}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
