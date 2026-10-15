import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthTokenBridge from './components/auth/AuthTokenBridge'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/app/DashboardPage'
import WriteArticlePage from './pages/app/WriteArticlePage'
import BlogTitlesPage from './pages/app/BlogTitlesPage'
import GenerateImagePage from './pages/app/GenerateImagePage'
import RemoveBackgroundPage from './pages/app/RemoveBackgroundPage'
import RemoveObjectPage from './pages/app/RemoveObjectPage'
import ReviewResumePage from './pages/app/ReviewResumePage'
import CommunityPage from './pages/app/CommunityPage'

export default function App() {
  return (
    <>
      <AuthTokenBridge />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Layout route with no path: it only adds the sign-in check around everything inside. */}
        <Route element={<ProtectedRoute />}>
          {/* Everything inside the app shell lives under /app/... */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="write-article" element={<WriteArticlePage />} />
            <Route path="blog-titles" element={<BlogTitlesPage />} />
            <Route path="generate-image" element={<GenerateImagePage />} />
            <Route path="remove-background" element={<RemoveBackgroundPage />} />
            <Route path="remove-object" element={<RemoveObjectPage />} />
            <Route path="review-resume" element={<ReviewResumePage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
