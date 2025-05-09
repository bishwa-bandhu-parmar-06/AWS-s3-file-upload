

const FileCard = ({ file }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    {file.type.startsWith('image/') ? (
      <img 
        src={file.url} 
        alt={file.name} 
        className="w-full h-48 object-contain bg-gray-100"
      />
    ) : (
      <div className="h-48 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">[{file.type}]</p>
      </div>
    )}
    <div className="p-4">
      <p className="text-sm mb-1"><span className="font-semibold">Name:</span> {file.name}</p>
      <p className="text-sm mb-1"><span className="font-semibold">Type:</span> {file.type}</p>
      <p className="text-sm mb-1"><span className="font-semibold">Size:</span> {(file.size / 1024).toFixed(2)} KB</p>
      <p className="text-sm mb-3"><span className="font-semibold">Uploaded:</span> {new Date(file.createdAt).toLocaleString()}</p>
      <a 
        href={file.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        View Full Size
      </a>
    </div>
  </div>
);

export default FileCard;