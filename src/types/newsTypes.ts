// Basic news item for listings (matching your existing NewsItem)
export interface StoryListing {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
}

// Base interface for all content sections (matching your ContentTag)
export interface ContentSection {
  type: string;
  id: string;
}

// Content section type definitions (matching your existing tags)
export interface TextSection extends ContentSection {
  type: 'text';
  content: string;
}

export interface TitleSection extends ContentSection {
  type: 'title';
  content: string;
}

export interface ImageSection extends ContentSection {
  type: 'image';
  src: string;
  alt?: string;
}

export interface ColumnSection extends ContentSection {
  type: 'column';
  content: (TextSection | TitleSection | ImageSection)[];
}

export interface RowSection extends ContentSection {
  type: 'row';
  content: (TextSection | TitleSection | ImageSection | ColumnSection)[];
}

// Union type for all possible content section types (like your NewsContentTag)
export type StoryContentSection =
  | TextSection
  | TitleSection
  | ImageSection
  | RowSection
  | ColumnSection;

// Complete story with all details (like your NewsArticle)
export interface StoryDetail extends StoryListing {
  content: StoryContentSection[];
}

// Type for the lookup object of story details
export interface StoryDetailsMap {
  [key: string]: StoryDetail;
}
