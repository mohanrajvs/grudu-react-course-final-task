import React, { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TweetsPage from "./pages/tweets/Tweets";
import SignupPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TweetsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("user");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
