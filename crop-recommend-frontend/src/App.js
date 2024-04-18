import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/navbar";
import Home from "./pages";
import { AuthProvider } from "./context/";
import { useRoutes } from "react-router-dom";
import Prediction from "./pages/crop_prediction";
import Yieldprediction from "./pages/yield_prediction";
import Weather from "./pages/weather";
import Yield from "./pages/yield";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/predict",
      element: <Prediction />,
    },
    {
      path: "/yield",
      element: <Yield />,
    },
    {
      path: "/yieldpredict",
      element: <Yieldprediction />,
    },
    {
      path: "/weather",
      element: <Weather />,
    },

  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
