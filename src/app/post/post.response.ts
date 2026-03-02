export interface PostResponse {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface PostListResponse {
  posts: PostResponse[];
}