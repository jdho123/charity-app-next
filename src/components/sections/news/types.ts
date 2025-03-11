// Basic news item for listings
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  readTime?: number;
}

// Content types for detailed news page
export interface ContentTag {
  type: string;
  id: string;
}

export interface TextTag extends ContentTag {
  type: 'text';
  content: string;
}

export interface TitleTag extends ContentTag {
  type: 'title';
  content: string;
}

export interface ImageTag extends ContentTag {
  type: 'image';
  src: string;
  alt?: string;
}

export interface RowTag extends ContentTag {
  type: 'row';
  content: (TextTag | TitleTag | ImageTag | ColumnTag)[];
}

export interface ColumnTag extends ContentTag {
  type: 'column';
  content: (TextTag | TitleTag | ImageTag)[];
}

// Union type for all content tags
export type NewsContentTag = TextTag | TitleTag | ImageTag | RowTag | ColumnTag;

// Full news article with content
export interface NewsArticle extends NewsItem {
  content: NewsContentTag[];
}
