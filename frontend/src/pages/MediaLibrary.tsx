import React from 'react';
import { Upload } from 'lucide-react';

const MediaLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Media Library</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <Upload className="text-blue-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Media</h3>
          <p className="text-gray-500 mt-2">Drag and drop files here, or click to browse</p>
          <p className="text-xs text-gray-400 mt-4">Supports JPG, PNG, MP4 up to 50MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
