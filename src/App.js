import Home from "./pages/Home";
import Single from "./pages/Single";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box, Container, ThemeProvider } from "@mui/material";
import { myTheme } from "./styledTheme/themeStyles";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },

      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Box>
        <Container maxWidth="xl">
          <RouterProvider router={router} />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
