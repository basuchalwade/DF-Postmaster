export interface Post {
  id: number;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduled_at: string | null;
  created_at: string;
}

export interface CreatePostPayload {
  content: string;
  platforms: string[];
  scheduled_at?: string | null;
  status?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  isMock: boolean;
}
