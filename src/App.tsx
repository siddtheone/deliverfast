import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/login";
import CssBaseline from "@mui/material/CssBaseline";
import User from "components/user";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { Suspense } from "react";
import { useLogout } from "hooks";
const Biker = React.lazy(() => import("pages/biker"));
const Sender = React.lazy(() => import("pages/sender"));

function App() {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <Router>
        <CssBaseline />
        <Providers>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<User />}>
              <Route path="/biker" element={<Biker />} />
              <Route path="/sender" element={<Sender />} />
              <Route path="/*" element={<div>Not found</div>} />
            </Route>
          </Routes>
        </Providers>
      </Router>
    </Suspense>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const onError = useLogout();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError,
        }),
      })
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LocalizationProvider>
  );
};

export default App;
