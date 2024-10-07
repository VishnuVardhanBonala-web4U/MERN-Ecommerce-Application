import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { base_url } from "../../config/URL";
const UserPrivateRoute = () => {
  const [ok, Setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${base_url}/user-private`);

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

export default UserPrivateRoute;
