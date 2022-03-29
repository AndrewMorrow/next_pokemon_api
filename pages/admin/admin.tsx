import React from "react";

const Hello = () => {
  return <div>Hello Admin</div>;
};

Hello.auth = {
  restricted: true,
  role: "admin",
  checkAdmin: true,
};

export default Hello;
