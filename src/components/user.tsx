import { useReadUser, useRestrictAccess } from "hooks";
import { Outlet } from "react-router";
import AppHeader from "./app-header";

export function User() {
  useRestrictAccess();
  const user = useReadUser();
  if (!user) {
    return null;
  }

  return (
    <>
      <AppHeader title={`Welcome ${user.username}`} />
      <Outlet />
    </>
  );
}

export default User;
