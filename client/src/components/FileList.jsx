import FileCard from "./FileCard";

const FileList = ({ files }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Uploaded Files</h2>
    {files.length === 0 ? (
      <p className="text-gray-500">No files uploaded yet.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    )}
  </div>
);

export default FileList;