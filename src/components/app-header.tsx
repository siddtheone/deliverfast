import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useLogout } from "hooks";

export interface AppHeaderProps {
  title: string;
}

export function AppHeader(props: AppHeaderProps) {
  const handleLogout = useLogout();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
