import React from "react";
import {
  Button,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import { User } from "../../assets/user";
import Form from "./form";
import { useStoreActions, useStoreState } from "easy-peasy";

const LoginPopover = () => {
  const auth = useStoreState((state: any) => state.auth);
  const logout = useStoreActions((actions: any) => actions.logout);
  const {
    onOpen: onOpenPopover,
    onClose: onClosePopover,
    isOpen: isOpenPopover,
  } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  return (
    <Popover
      isOpen={isOpenPopover}
      initialFocusRef={firstFieldRef}
      onOpen={onOpenPopover}
      onClose={onClosePopover}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="login"
          icon={<Icon as={User} />}
          backgroundColor="#FFFFFF"
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          {auth.token ? (
            <Stack>
              <Text>nome: {auth.username}</Text>
              <Text>
                tipo de usuário: {auth.role === 0 ? "normal" : "admin"}
              </Text>
              <Button colorScheme="red" onClick={logout} variant="outline">
                Logout
              </Button>
            </Stack>
          ) : (
            <Form firstFieldRef={firstFieldRef} onCancel={onClosePopover} />
          )}
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default LoginPopover;
