import { BiUserCircle } from "react-icons/bi";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; 

interface ExpertProfile {
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
}

export default async function ExpertProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(`api/experts/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <div>Profile not found</div>;
  }

  const profile: ExpertProfile = await res.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
            {profile.photo_url ? (
              <img 
                src={profile.photo_url} 
                alt={profile.name} 
                className="w-48 h-48 rounded-full object-cover mb-4 md:mb-0"
              />
            ) : (
              <BiUserCircle className="w-48 h-48 text-gray-400 mb-4 md:mb-0" />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-lg text-gray-600">{profile.position} at {profile.institution}</p>
              <p className="mt-2 text-gray-700">{profile.short_bio}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {profile.expertise.split(',').map((tag) => (
                  <span key={tag} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Selected Works</h2>
            <p className="text-gray-700 mt-2">{profile.selected_projects}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
            <ul className="text-gray-700 mt-2 space-y-2">
              <li><strong>Email:</strong> {profile.contact_info}</li>
              <li><strong>Location:</strong> {profile.location || 'Not specified'}</li>
              <li>
                <strong>Google Scholar:</strong> 
                <a href={profile.google_scholar_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1">Link</a>
              </li>
              <li>
                <strong>ORCID:</strong> 
                <a href={profile.orcid_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1">Link</a>
              </li>
              <li>
                <strong>Website:</strong> 
                <a href={profile.personal_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1">Link</a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
