'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard";
import Header from "@/main-component/main-header";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if token not found
    } else {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) return <p>Checking authentication...</p>;

  return (
    <div>
      {isLoggedIn && (
        <>
          <Header />
          <Dashboard />
        </>
      )}
    </div>
  );
}
