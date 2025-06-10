"use client";
import React,{useState,useEffect} from "react";
import Dashboard from "@/components/dashboard";
import Header from "@/main-component/main-header";
// import {getAllUsers} from "../../lib/api/userApi"

export default function Home() {

  //      const [users, setUsers] = useState([]);
  //   const [error, setError] = useState('');
  
  //     useEffect(() => {
  //     const fetchUsers = async () => {
  //       const result = await getAllUsers();
  
  //       if (result.success) {
  //         setUsers(result.data);
  //       } else {
  //         setError(result.error);
  //       }
  //     };
  
  //     fetchUsers();
  //   }, []);
  
  //   console.log("users",users);
  // console.log("getAllUsers");
  // console.log("getAllUsers",getAllUsers());
  
  return (
  <div>
    <Header/>
    <Dashboard/>
  </div>
  );
}
