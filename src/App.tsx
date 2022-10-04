import React, { useState, useEffect, useCallback, useRef } from "react";
import { Logo } from "./assets/logo";
import "./App.css";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useNumberInput,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Book {
  name: string;
  filename: string;
}

function App() {
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookName, setBookName] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedFile, setSelectedFile] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);
  const {
    value,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: Math.ceil(books.length / 21),
    precision: 0,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handlePages = useCallback(() => {
    const position = (page - 1) * 21;
    const updatedInfo: Book[] = [...books];
    const newBooks = updatedInfo.splice(position, 21);
    setFilteredBooks(newBooks);
  }, [page, books]);

  const changeFileHandler = (event: any) => {
    if (event?.target.files[0]?.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF");
      (inputRef!.current! as any).value = null;
      return;
    }
    setSelectedFile(event?.target.files[0]);
  };

  const fetchBooks = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERNAME}/getBooks.php`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(({ data }) => {
        setBooks(data);
      });
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    handlePages();
  }, [page, handlePages]);

  useEffect(() => {
    setPage(+value);
  }, [value]);

  const handleSearch = (event: any) => {
    if (event.target.value === "") {
      handlePages();
    } else {
      const updatedInfo = [...books];
      const updatedBooks = updatedInfo.filter((book) =>
        book.name.includes(event.target.value)
      ) as Book[];
      setFilteredBooks(updatedBooks);
    }
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
    <div className="App">
      <header className="header">
        <section className="header__logo">
          <Logo />
        </section>
      </header>
      <main className="content">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ToastContainer />
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
        <section className="actions">
          <div>
            <Button
              rightIcon={<AddIcon />}
              colorScheme="blue"
              fontSize={20}
              onClick={onOpen}
            >
              Cadastrar
            </Button>
          </div>
          <div>
            <InputGroup borderColor="#858585" width="450px">
              <Input onChange={handleSearch} />
              <InputRightElement
                children={
                  <SearchIcon color="gray.500" height={26} width={26} />
                }
              />
            </InputGroup>
          </div>
        </section>
        <section className="books">
          {filteredBooks?.map((each) => (
            <div key={Math.random()} className="book">
              <p>{each.name}</p>
              <a
                href={`${process.env.REACT_APP_BOOKS}/${each.filename}`}
                target="_blank"
              >
                <ExternalLinkIcon color="#858585" height={30} width={30} />
              </a>
            </div>
          ))}
        </section>
        {Math.ceil(books.length / 21) > 1 && (
          <section className="pagination__section">
            <HStack>
              <Button {...dec}>-</Button>
              <Input {...input} />
              <Button {...inc}>+</Button>
            </HStack>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
