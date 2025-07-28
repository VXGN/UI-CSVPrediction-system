import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FilePreview from './components/Filepreview/FilePreview';
import Footer from './components/Footer';
import { useFileUpload } from './hooks/useFileUpload';
import Body from './components/Body';
import Hero from './components/Hero';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { ThemeProvider } from './components/theme-provider';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-900 to-black animate-fade-in">
      <Header />
      <main className="pt-40 min-h-screen flex flex-col items-center justify-center px-16 py-22 ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const {
    dragActive,
    uploadedFile,
    error,
    handleDrag,
    handleDrop,
    handleFileInput,
    removeFile,
    formatFileSize
  } = useFileUpload();

  if (location.pathname === "/auth") {
    return <AuthPage />;
  }
  return (
    <MainLayout>
      <div className="w-90">
        <Hero />
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          <div className="flex flex-col items-center space-y-20 flex-1">
            <FileUpload
              dragActive={dragActive}
              uploadedFile={uploadedFile}
              error={error}
              onDrag={handleDrag}
              onDrop={handleDrop}
              onFileInput={handleFileInput}
              onRemoveFile={removeFile}
              formatFileSize={formatFileSize}
            />
            {uploadedFile && (
              <FilePreview
                uploadedFile={uploadedFile}
                formatFileSize={formatFileSize}
              />
            )}

            {<Body />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <Router>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}