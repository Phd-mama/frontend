export interface News {
  id: number;
  name: string; 
}

export interface Award {
  id: number;
  name: string; 
}

export interface Expertise {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Publication {
  id: number;
  name: string;
}

export interface Profile {
  user: number;
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
  profile_picture: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  status: string;
  google_scholar: string;
  orchid: string;
  the_conversation: string;
  [key: string]: any; 
}
