import { Post, CreatePostPayload } from './types';

// Environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Mock Data Store
let mockPosts: Post[] = [
  {
    id: 1,
    content: "Welcome to PostMaster! This is a mock post because the backend is disconnected.",
    platforms: ["twitter"],
    status: "published",
    scheduled_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    content: "Scheduling this for next week.",
    platforms: ["linkedin"],
    status: "scheduled",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date().toISOString()
  }
];

// Helper to simulate delay in mock mode
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const checkHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/health`);
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const fetchPosts = async (): Promise<{ data: Post[], isMock: boolean }> => {
  try {
    const res = await fetch(`${API_URL}/posts/`);
    if (!res.ok) throw new Error("Backend failed");
    const data = await res.json();
    return { data, isMock: false };
  } catch (error) {
    console.warn("API unavailable, using mock data");
    await delay(500);
    return { data: mockPosts, isMock: true };
  }
};

export const createPost = async (payload: CreatePostPayload): Promise<{ data: Post, isMock: boolean }> => {
  try {
    const res = await fetch(`${API_URL}/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Backend failed");
    const data = await res.json();
    return { data, isMock: false };
  } catch (error) {
    console.warn("API unavailable, creating mock post");
    await delay(500);
    const newPost: Post = {
      id: mockPosts.length + 1,
      ...payload,
      status: payload.status as any || 'draft',
      scheduled_at: payload.scheduled_at || null,
      created_at: new Date().toISOString()
    };
    mockPosts = [newPost, ...mockPosts];
    return { data: newPost, isMock: true };
  }
};
