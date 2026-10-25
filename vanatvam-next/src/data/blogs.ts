import blogsRaw from '@/data/blogsData.json';

export interface ContentBlock {
  type: 'p' | 'h3' | 'h4' | 'quote' | 'img';
  text?: string;
  src?: string;
  alt?: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  date: string;
  author: string;
  img: string;
  category: string;
  excerpt: string;
  contentBlocks: ContentBlock[];
}

export const blogsData: BlogPostItem[] = blogsRaw as BlogPostItem[];

export function getBlogById(id: string): BlogPostItem | undefined {
  return blogsData.find((b) => b.id === id);
}

export function getAllBlogIds(): string[] {
  return blogsData.map((b) => b.id);
}
