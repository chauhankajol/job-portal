import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home1 from "./components/Home1";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import Companycreate from "./components/admin/Companycreate";
import Companysetup from "./components/admin/Companysetup";
import Adminjobs from "./components/admin/Adminjobs";
import Postjob from "./components/admin/Postjob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home1 />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  ///admmin k  lie  yaha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies />,</ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <Companycreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <Companysetup />,
  },
  {
    path: "/admin/jobs",
    element: <Adminjobs />,
  },
  {
    path:"/admin/jobs/create",
    element:<Postjob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
