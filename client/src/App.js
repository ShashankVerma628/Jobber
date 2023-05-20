import { Header, Footer, AllJobs, AddJob, Profile, ClientStats, EditJob, AllCandidateJobs, SavedJobs, CandidateProfile } from "./components";
import { JobSearchPage, ClientLoginPage, ErrorPage, CandidateLoginPage, IntroPage, ClientSharedLayout, JobDetailsPage, CandidateSharedLayout } from "./pages";

import ProtectedClientRoute from "./utils/ProtectedClientRoute";
import ProtectedCandidateRoute from "./utils/ProtectedCandidateRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<JobSearchPage />} />
          <Route path="/login" element={<CandidateLoginPage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          <Route path="/why-jobber" element={<IntroPage />} />
          <Route path="/dashboard/" element={
            <ProtectedCandidateRoute>
              <CandidateSharedLayout />
            </ProtectedCandidateRoute>
          }>
            <Route index element={<AllCandidateJobs />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="profile" element={<CandidateProfile />} />
          </Route>
          <Route path="/client/dashboard/" element={
            <ProtectedClientRoute>
              <ClientSharedLayout />
            </ProtectedClientRoute>
          }>
            <Route index element={<ClientStats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-job/:jobId" element={<EditJob />} />
          </Route>
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
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
