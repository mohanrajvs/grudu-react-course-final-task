import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TweetsPage from "./pages/tweets/Tweets";
import SignupPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TweetsPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
