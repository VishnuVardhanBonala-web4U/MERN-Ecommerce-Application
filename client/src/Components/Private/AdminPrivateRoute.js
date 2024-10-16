import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const AdminPrivateRoute = () => {
  const [ok, Setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin-private`);

      if (res.data.ok) {
        Setok(true);
      } else {
        Setok(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminPrivateRoute;
