const FileUploader = ({ onFileChange, onUpload, uploading, uploadProgress, error }) => (
  <div className="mb-5 p-4 bg-white rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-4 text-gray-800">File Upload to AWS S3</h1>
    <div className="flex flex-col sm:flex-row gap-3">
      <input 
        type="file" 
        onChange={onFileChange} 
        className="px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button 
        onClick={onUpload} 
        disabled={uploading}
        className={`px-4 py-2 rounded-md text-sm font-medium text-white ${uploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {uploading ? `Uploading... ${uploadProgress}%` : 'Upload'}
      </button>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default FileUploader;