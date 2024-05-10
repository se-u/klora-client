// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/app/Home";
import RootLayout from "./layouts/RootLayout";
import LandingPages from "./pages/LandingPage/LandingPages";
import Calculator from "./pages/app/Calculator";
import Shopping from "./pages/app/Shopping";
import MyProfile from "./pages/app/MyProfile";
import { FourOhFourOhFour } from "./components/landingpage/index";
import Volunteer from "./components/app/Volunteer/Volunteer";
import AppLayout from "./layouts/AppLayout";
import { useTonConnect } from "./hooks/useTonConnect";

export default function App() {
  const { connected } = useTonConnect();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <LandingPages connected={connected} />,
        },
        {
          path: "*",
          element: <FourOhFourOhFour />,
        },
      ],
    },

    {
      path: "/app",
      element: <AppLayout connected={connected} />,
      children: [
        {
          path: "/app",
          element: <Home />,
        },
        {
          path: "/app/volunteer",
          element: <Volunteer />,
        },
        {
          path: "/app/calculator",
          element: <Calculator />,
        },
        {
          path: "/app/shop",
          element: <Shopping />,
        },
        {
          path: "/app/profile",
          element: <MyProfile />,
        },
        {
          path: "*",
          element: <FourOhFourOhFour />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
