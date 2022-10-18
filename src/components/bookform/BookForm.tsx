import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const BookForm = ({ isOpen, onClose, fetchBooks }: any) => {
  const [bookName, setBookName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef(null);
  const changeFileHandler = (event: any) => {
    if (event?.target.files[0]?.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF");
      (inputRef!.current! as any).value = null;
      return;
    }
    setSelectedFile(event?.target.files[0]);
  };
  const handleBookSubmission = () => {
    const formData = new FormData();
    formData.append("name", bookName!);
    formData.append("book", selectedFile!);
    axios
      .post(`${process.env.REACT_APP_SERVERNAME}/saveBooks.php`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        setBookName("");
        setSelectedFile(undefined);
        onClose();
        toast.success("Livro cadastrado com sucesso!");
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(
          "Erro ao cadastrar esse livro, tente novamente mais tarde."
        );
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de livro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Titulo do livro</FormLabel>
            <Input
              placeholder="Titulo do livro"
              name="name"
              value={bookName}
              isRequired
              onChange={(event: any) => {
                setBookName(event.target.value);
              }}
            />
            <FormLabel>Arquivo</FormLabel>
            <Input
              placeholder="Arquivo"
              type="file"
              name="file"
              ref={inputRef}
              onChange={changeFileHandler}
              isRequired
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleBookSubmission}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookForm;
