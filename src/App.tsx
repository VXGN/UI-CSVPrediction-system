import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FilePreview from './components/Filepreview/FilePreview';
import Footer from './components/Footer';
import { useFileUpload } from './hooks/useFileUpload';
import Body from './components/Body';
import Hero from './components/Hero';

function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black animate-fade-in">
      <Header />
      {/* Main Content */}
      <main className="pt-40 min-h-screen flex flex-col items-center justify-center px-16 py-22 ">
        <div className="w-90">
          <Hero />
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
            {/* Main Content Area */}
            <div className="flex flex-col items-center space-y-20 flex-1">
              {uploadedFile && (
                <FilePreview
                  uploadedFile={uploadedFile}
                  formatFileSize={formatFileSize}
                />
              )}
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
              {<Body />}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;