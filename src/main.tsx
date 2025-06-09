import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import Post from "./pages/post/Post.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./route/ProtectedRoute.tsx";
import GuestRoute from "./route/GuestRoute.tsx";
import AddPost from "./pages/post/AddPost.tsx";
import "react-tooltip/dist/react-tooltip.css";
import DetailPost from "./pages/post/DetailPost.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "/",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/post",
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/:slug",
    element: (
      <ProtectedRoute>
        <DetailPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/add",
    element: (
      <ProtectedRoute>
        <AddPost />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
