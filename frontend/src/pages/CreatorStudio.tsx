import React, { useState, useEffect } from 'react';
import { createPost, fetchPosts } from '../api';
import { Post } from '../types';
import { Send, Calendar as CalendarIcon, Loader2 } from 'lucide-react';

const CreatorStudio: React.FC = () => {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, [refreshKey]);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = async () => {
    if (!content) return;
    setLoading(true);
    await createPost({
      content,
      platforms,
      status: 'published' // Simplification for MVP
    });
    setLoading(false);
    setContent('');
    setPlatforms([]);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Editor Column */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destinations</label>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram'].map(p => (
                <button
                  key={p}
                  onClick={() => togglePlatform(p.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    platforms.includes(p.toLowerCase())
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <CalendarIcon size={18} />
              <span className="text-sm">Schedule</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !content}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              Post Now
            </button>
          </div>
        </div>
      </div>

      {/* Recent Posts Column */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-800 mb-3">{post.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex gap-2">
                  {post.platforms.map(p => (
                    <span key={p} className="bg-gray-100 px-2 py-1 rounded uppercase tracking-wider text-[10px]">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    post.status === 'published' ? 'bg-green-500' :
                    post.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <span className="capitalize">{post.status}</span>
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No posts found. Create your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorStudio;
