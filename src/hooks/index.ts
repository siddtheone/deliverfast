import React from "react";

import { useNavigate } from "react-router";

import jwt from "jwt-decode";
import { User } from "types";
import { COOKIE_NAME } from "config/constants";
import { getCookie } from "utils/utils";

export const useReadUser = () => {
  let decoded;
  try {
    decoded = jwt(getCookie(COOKIE_NAME)) as User;
  } catch (e) {
    return undefined;
  }
  return decoded.user;
};

export function useHomePageRedirect() {
  let decoded = useReadUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (decoded) {
      const { type } = decoded;
      navigate(type);
    }
  });
}

export function useRestrictAccess() {
  let decoded = useReadUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (decoded === undefined) {
      navigate("/");
    }
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`;
    navigate("/");
  };

  return handleLogout;
}
