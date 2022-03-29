import React from "react";

const Hello = (props: any) => {
  console.log(props);
  return <div>Hello</div>;
};

Hello.auth = {
  restricted: true,
};
export default Hello;
