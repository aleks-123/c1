import FetchingUsers from "@/components/FetchingUsers";
import FetchsingleUser from "@/components/FetchsingleUser";
import React from "react";

// https://jsonplaceholder.typicode.com/users

export default function page() {
  return (
    <div>
      <h1>UseEffect</h1>
      <FetchingUsers />
      <FetchsingleUser />
    </div>
  );
}
