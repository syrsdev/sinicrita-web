import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./pages/post/Post.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./route/ProtectedRoute.tsx";
import GuestRoute from "./route/GuestRoute.tsx";
import AddPost from "./pages/post/AddPost.tsx";
import "react-tooltip/dist/react-tooltip.css";
import DetailPost from "./pages/post/DetailPost.tsx";
import Chat from "./pages/chat/Chat.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";
import Dashboard from "./dashboard/pages/Dashboard/Dashboard.tsx";
import AppLayout from "./dashboard/layout/AppLayout.tsx";
import { ThemeProvider } from "./dashboard/context/ThemeContext.tsx";
import AdminRoute from "./route/AdminRoute.tsx";
import Users from "./dashboard/pages/Dashboard/Users.tsx";
import NotFound from "./pages/404.tsx";
import Profile from "./pages/profile/Profile.tsx";

// Di bagian atas file, setelah import
console.log("🔍 Environment Variables:");
console.log("VITE_REVERB_APP_KEY:", import.meta.env.VITE_REVERB_APP_KEY);
console.log("VITE_REVERB_HOST:", import.meta.env.VITE_REVERB_HOST);
console.log("VITE_REVERB_PORT:", import.meta.env.VITE_REVERB_PORT);
console.log("VITE_REVERB_SCHEME:", import.meta.env.VITE_REVERB_SCHEME);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: (
      <GuestRoute>
        <Post />
      </GuestRoute>
    ),
  },
  {
    path: "/login",
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
    path: "/dashboard",
    element: (
      <AdminRoute>
        <AppLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
    ],
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
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/detail/:slug",
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
  {
    path: "/chat/:id?",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
