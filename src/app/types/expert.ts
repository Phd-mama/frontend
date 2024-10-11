export interface Expert {
  id: number;
  name: string;
  short_bio: string; 
  expertise: string;
  contact_info: string;
  institution: string;
  position: string;
  education_background: string;
  location: string;
  selected_projects: string;
  selected_publications: string;
  google_scholar_link: string;
  orcid_link: string;
  personal_website: string;
  news: string;
  awards: string;
  photo_url?: string;
  bio?: string;
  instagram?: string;
  linkedin?: string; 
  twitter?: string; 
}
