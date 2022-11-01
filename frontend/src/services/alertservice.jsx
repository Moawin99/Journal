import { Alert, AlertIcon, Fade } from "@chakra-ui/react";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

export const AlertServiceContext = createContext({
  message: null,
  setMessage: () => {},
});

export const AlertServiceProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [message]);

  return (
    <AlertServiceContext.Provider value={{ message, setMessage }}>
      {show && message && (
        <Fade in={show}>
          <Alert
            shadow={"md"}
            status={message.type}
            borderRadius="5px"
            position={"absolute"}
            width="25%"
            left={0}
            right={0}
            bottom={"25px"}
            ml={"auto"}
            mr={"auto"}
          >
            <AlertIcon />
            {message.data}
          </Alert>
        </Fade>
      )}
      {children}
    </AlertServiceContext.Provider>
  );
};

export const useAlert = () => {
  const { message, setMessage } = useContext(AlertServiceContext);

  return { message, setMessage };
};