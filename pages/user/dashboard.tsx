import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  if (!session) return <h1>You are not logged in</h1>;
  const { user } = session;
  return (
    <div>Welcome to {user?.name ? user?.name : user?.email}`s Dashboard</div>
  );
};

Dashboard.auth = {
  restricted: true,
};

export default Dashboard;
