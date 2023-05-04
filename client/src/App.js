import { Header, Footer, Alert } from "./components";
import { JobSearchPage, ClientLoginPage, ErrorPage, Dashboard, CandidateLoginPage, IntroPage, AdminLoginPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Alert />
        <Header />
        <Routes>
          <Route path="/" element={<JobSearchPage />} />
          <Route path="/login" element={<CandidateLoginPage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/why-jobber" element={<IntroPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
        <Routes>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
