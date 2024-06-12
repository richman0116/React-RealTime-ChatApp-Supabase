import { ChakraProvider, Box, theme } from "@chakra-ui/react";
// import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Chat from "./components/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./context/appContext";

function App() {
  const { username, setUsername, routeHash } = useAppContext();

  if (routeHash) {
    if (routeHash.endsWith("&type=recovery")) {
      window.location.replace(`/login/${routeHash}`);
    }
    if (routeHash.startsWith("#error_code=404"))
      return (
        <div>
          <p>This link has expired</p>
          <a href="/" style={{ cursor: "pointer" }} variant="link">
            Back to app
          </a>
        </div>
      );
  }
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Box bg="black">
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Chat />
                    <Footer />
                  </>
                }
              />
              <Route path="*" element={<p>Not found</p>} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AppContextProvider>
    </ChakraProvider>
  );
}

export default App;
