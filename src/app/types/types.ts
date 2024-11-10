export interface News {
  id: number;
  content: string;
}

export interface Award {
  id: number;
  content: string;
}
export interface Expertise {
    id: number;
    name: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
  }
  
  export interface Publication {
    id: number;
    title: string;
    description: string;
  }
  
  export interface Profile {
    id: number;
    name: string;
    short_bio: string;
    expertise: Expertise[]; // bisa lebih dari satu
    selected_projects: Project[]; // bisa lebih dari satu
    selected_publications: Publication[]; // bisa lebih dari satu
    news: News[]; // bisa lebih dari satu
    awards: Award[]; // bisa lebih dari satu
    contact_info: string;
    institution: string;
    position: string;
    education_background: string;
    location: string;
    personal_website: string;
    photo_url?: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  }
  
  