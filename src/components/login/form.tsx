import { RepeatIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Stack, useUnmountEffect } from "@chakra-ui/react";
import React, { useState } from "react";
import TextInput from "../textInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useStoreActions } from "easy-peasy";

interface FormProps {
  onCancel: () => void;
  firstFieldRef: React.MutableRefObject<null>;
}

const Form = ({ firstFieldRef, onCancel }: FormProps) => {
  const [status, setStatus] = useState(0);
  const login = useStoreActions((actions: any) => actions.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!username) {
      toast.error("Adicione um nome de usuário");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("As senhas não são iguais, redigite a confirmação de senha");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_SERVERNAME}/users/register.php`, {
        username,
        password,
      })
      .then((response) => {
        toast.success("Usuário cadastrado com sucesso!");
        setStatus(0);
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar usuário, por favor tente novamente!");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      });
  };

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_SERVERNAME}/users/login.php`, {
        username,
        password,
      })
      .then((response) => {
        const user = response.data.user;
        const formattedUser = {
          username: user.username,
          token: user.token,
          role: user.role,
        };
        login(formattedUser);
        toast.success("Login realizado com sucesso!");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        onCancel();
      });
  };

  const handleFormLabel = (condition: boolean) =>
    condition ? "Registre-se" : "Login";
  return (
    <Stack spacing={4}>
      <TextInput
        label="Nome de usuári0o"
        id="username"
        ref={firstFieldRef}
        isRequired
        placeholder="nome de usuário"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextInput
        label="Senha"
        id="password"
        placeholder="senha"
        isRequired
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {status === 1 && (
        <TextInput
          label="Confirmar senha"
          id="confirmpassword"
          placeholder="confirmar senha"
          type="password"
          isRequired
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      )}
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button
          variant="outline"
          onClick={() => {
            setStatus(status === 1 ? 0 : 1);
          }}
          colorScheme="whatsapp"
          rightIcon={<RepeatIcon />}
        >
          {handleFormLabel(status === 0)}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          colorScheme="teal"
          onClick={status == 0 ? handleLogin : handleRegister}
        >
          {handleFormLabel(status === 1)}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Form;
