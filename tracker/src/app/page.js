"use client";

import Login from "@/components/Login";
import { useAuth } from "@/components/utils/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <>
        <Login />
      </>
    </div>
  );
};

export default Home;
