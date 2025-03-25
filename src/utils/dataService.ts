
import { Statement, statementsData as initialStatementsData } from './statementsData';
import { Article } from '@/pages/Articles';

// Types for our data
export interface Video {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  youtubeId: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  category: string;
  description?: string;
  date: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
}

// Default data
const defaultVideos: Video[] = [
  {
    id: 1,
    title: "خطبة الجمعة: التوكل على الله",
    date: "10/05/2023",
    description: "خطبة جمعة عن أهمية التوكل على الله تعالى في حياة المسلم",
    category: "خطب الجمعة",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "ندوة: القضية الفلسطينية",
    date: "15/06/2023",
    description: "ندوة حول تطورات القضية الفلسطينية وأبعادها",
    category: "ندوات",
    youtubeId: "9bZkp7q19f0"
  },
  {
    id: 3,
    title: "لقاء خاص حول أحداث غزة",
    date: "22/07/2023",
    description: "لقاء خاص يتناول آخر التطورات في غزة والموقف الإسلامي منها",
    category: "لقاءات",
    youtubeId: "XqZsoesa55w"
  }
];

const defaultLinks: Link[] = [
  {
    id: 1,
    title: "موقع الشيخ الرسمي",
    url: "https://example.com",
    category: "المواقع الرسمية",
    description: "الموقع الرسمي للشيخ وفيه جميع المقالات والخطب",
    date: "10/03/2023"
  },
  {
    id: 2,
    title: "قناة يوتيوب",
    url: "https://youtube.com/channel/example",
    category: "قنوات التواصل",
    description: "قناة الشيخ الرسمية على يوتيوب",
    date: "15/04/2023"
  },
  {
    id: 3,
    title: "بودكاست الشيخ",
    url: "https://podcast.example.com",
    category: "وسائط متعددة",
    description: "بودكاست الشيخ لمتابعة الدروس والخطب",
    date: "22/05/2023"
  }
];

const defaultSettings: SiteSettings = {
  siteName: "موقع الشيخ علي بن حاج",
  siteDescription: "الموقع الرسمي للشيخ علي بن حاج",
  email: "contact@example.com",
  phone: "+213 123 456 789",
  address: "الجزائر العاصمة، الجزائر",
  facebookUrl: "https://facebook.com/example",
  twitterUrl: "https://twitter.com/example",
  youtubeUrl: "https://youtube.com/channel/example",
  instagramUrl: "https://instagram.com/example"
};

// Helper functions to get and set data in localStorage
const getLocalData = <T>(key: string, defaultData: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
};

const setLocalData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Main data functions
export const getStatements = (): Statement[] => {
  return getLocalData('statements', initialStatementsData);
};

export const saveStatement = (statement: Statement): void => {
  const statements = getStatements();
  const existingIndex = statements.findIndex(s => s.id === statement.id);
  
  if (existingIndex >= 0) {
    statements[existingIndex] = statement;
  } else {
    // For new statements, generate a unique ID
    const newId = String(Math.max(0, ...statements.map(s => Number(s.id))) + 1);
    statements.push({ ...statement, id: newId });
  }
  
  setLocalData('statements', statements);
};

export const deleteStatement = (id: string): void => {
  const statements = getStatements().filter(s => s.id !== id);
  setLocalData('statements', statements);
};

export const getArticles = (): Article[] => {
  // Getting articles from imported articlesData
  // In a real app, you would fetch this from localStorage as well
  return getLocalData('articles', []);
};

export const saveArticle = (article: Article): void => {
  const articles = getArticles();
  const existingIndex = articles.findIndex(a => a.id === article.id);
  
  if (existingIndex >= 0) {
    articles[existingIndex] = article;
  } else {
    // For new articles, generate a unique ID
    const newId = Math.max(0, ...articles.map(a => Number(a.id))) + 1;
    articles.push({ ...article, id: newId });
  }
  
  setLocalData('articles', articles);
};

export const deleteArticle = (id: number): void => {
  const articles = getArticles().filter(a => a.id !== id);
  setLocalData('articles', articles);
};

export const getVideos = (): Video[] => {
  return getLocalData('videos', defaultVideos);
};

export const saveVideo = (video: Video): void => {
  const videos = getVideos();
  const existingIndex = videos.findIndex(v => v.id === video.id);
  
  if (existingIndex >= 0) {
    videos[existingIndex] = video;
  } else {
    // For new videos, generate a unique ID
    const newId = Math.max(0, ...videos.map(v => v.id)) + 1;
    videos.push({ ...video, id: newId });
  }
  
  setLocalData('videos', videos);
};

export const deleteVideo = (id: number): void => {
  const videos = getVideos().filter(v => v.id !== id);
  setLocalData('videos', videos);
};

export const getLinks = (): Link[] => {
  return getLocalData('links', defaultLinks);
};

export const saveLink = (link: Link): void => {
  const links = getLinks();
  const existingIndex = links.findIndex(l => l.id === link.id);
  
  if (existingIndex >= 0) {
    links[existingIndex] = link;
  } else {
    // For new links, generate a unique ID
    const newId = Math.max(0, ...links.map(l => l.id)) + 1;
    links.push({ ...link, id: newId });
  }
  
  setLocalData('links', links);
};

export const deleteLink = (id: number): void => {
  const links = getLinks().filter(l => l.id !== id);
  setLocalData('links', links);
};

export const getSettings = (): SiteSettings => {
  return getLocalData('settings', defaultSettings);
};

export const saveSettings = (settings: SiteSettings): void => {
  setLocalData('settings', settings);
};

// Initialize default data if not already present
export const initializeData = (): void => {
  if (!localStorage.getItem('statements')) {
    setLocalData('statements', initialStatementsData);
  }
  
  if (!localStorage.getItem('videos')) {
    setLocalData('videos', defaultVideos);
  }
  
  if (!localStorage.getItem('links')) {
    setLocalData('links', defaultLinks);
  }
  
  if (!localStorage.getItem('settings')) {
    setLocalData('settings', defaultSettings);
  }
};
