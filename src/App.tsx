import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
  useNumberInput,
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreState } from "easy-peasy";
import BookForm from "./components/bookform/BookForm";
import Header from "./components/Header";

interface Book {
  id: string;
  name: string;
  filename: string;
  approved: boolean;
}

function App() {
  const auth = useStoreState((state: any) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>([]);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
  console.log(auth);
  const handlePages = useCallback(() => {
    const position = (page - 1) * 21;
    const updatedInfo: Book[] = [...books];
    const newBooks = updatedInfo.splice(position, 21);
    setFilteredBooks(newBooks);
  }, [page, books]);

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

  const handleBookStatus = (approved: boolean, id: string) => {
    axios
      .post(`${process.env.REACT_APP_SERVERNAME}/approveBook.php`, {
        approved: +approved,
        id,
      })
      .then(() => {
        const updatedBooks = [...filteredBooks];
        const bookIndex = updatedBooks.findIndex((each) => each.id === id);
        updatedBooks[bookIndex] = {
          ...updatedBooks[bookIndex],
          approved: approved,
        };
        setFilteredBooks(updatedBooks);
        toast.success("Livro atualizado com sucesso!");
      });
  };

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <main className="content">
        <BookForm isOpen={isOpen} onClose={onClose} fetchBooks={fetchBooks} />
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
            <div key={each.id} className="book">
              <p>{each.name}</p>
              <div className="book__icons">
                <div>
                  <Tooltip
                    label={
                      each.approved
                        ? "Livro aprovado por um revisor"
                        : "Livro ainda não revisado"
                    }
                    fontSize="md"
                  >
                    <CheckCircleIcon
                      onClick={() => {
                        if (auth.role === 1) {
                          handleBookStatus(!each.approved, each.id);
                        }
                      }}
                      width={6}
                      height={7}
                      _hover={
                        auth.role === 1
                          ? {
                              color: each.approved ? "black" : "green",
                              cursor: "pointer",
                            }
                          : {}
                      }
                      color={each.approved ? "green" : "black"}
                    />
                  </Tooltip>
                </div>
                <a
                  href={`${process.env.REACT_APP_BOOKS}/${each.filename}`}
                  target="_blank"
                >
                  <ExternalLinkIcon color="#858585" height={30} width={30} />
                </a>
              </div>
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
