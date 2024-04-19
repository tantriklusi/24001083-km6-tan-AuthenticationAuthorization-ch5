import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrendingTV from "./challenge-4/TrendingTV";
import HomePage from "./challenge-4/HomePage";
import DetailTV from "./challenge-4/DetailTV";
import OnAirTv from "./challenge-4/OnAirTv";
import TVDiscoveri from "./challenge-4/TVDiscoveri";
import PeopleList from "./challenge-4/PeopleList";
import GenresTV from "./challenge-4/GenresTV";
import LoginPage from "./Login";
import Register from "./Register";
import Detailhome from "./Detailhome";
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/trendingTV",
      element: <TrendingTV />,
    },
    {
      path: "/people",
      element: <PeopleList />,
    },
    {
      path: "/detailTV",
      element: <DetailTV />,
    },
    {
      path: "/onair",
      element: <OnAirTv />,
    },
    {
      path: "/discover",
      element: <TVDiscoveri />,
    },
    {
      path: "/genre",
      element: <GenresTV />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/goglelogin",
      element: <GoogleLogin />,
    },
    {
      path: "/detailhome",
      element: <Detailhome />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="84044146809-m6pbfrvvslqisrs927au7q8oa7l8a2th.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
