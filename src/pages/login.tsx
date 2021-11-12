import { Box, Button, TextField } from "@mui/material";
import { useHomePageRedirect } from "hooks";
import { useState } from "react";
import { http } from "utils/http";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export function LoginPage() {
  useHomePageRedirect();
  const [_, setIsLoggedIn] = useState(false);
  const onSubmit = (e: React.FormEvent<LoginFormElements>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements;
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if (usernameValue === "" || passwordValue === "") {
      return;
    }

    http
      .post("login", {
        username: usernameValue,
        password: passwordValue,
      })
      .then(() => {
        setIsLoggedIn(true);
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="username"
            label="Username"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginPage;
