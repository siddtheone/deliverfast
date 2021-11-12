import { Container } from "@mui/material";

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 2 }}>
      {children}
    </Container>
  );
}

export default AppContainer;
