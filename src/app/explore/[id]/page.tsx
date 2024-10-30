import { BiUserCircle } from "react-icons/bi";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; 
import { Profile } from "../../types/types"; 
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default async function ExpertProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
    }

    const profile: Profile = await res.json();

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

                {/* Expertise badges */}
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {profile.expertise.map((exp) => (
                    <span 
                      key={exp.id} 
                      className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md mb-2"
                    >
                      {exp.name}
                    </span>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-6">
                  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} className="text-gray-600 hover:text-red-500" />
                  </a>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} className="text-gray-600 hover:text-blue-700" />
                  </a>
                  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} className="text-gray-600 hover:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Selected Works */}
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-red-600">Selected Works</h2>
              {profile.selected_projects.length > 0 ? (
                profile.selected_projects.map((project) => (
                  <div key={project.id} className="mt-4">
                    <h3 className="text-xl font-bold text-gray-700">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">No projects available</p>
              )}
            </div>

            {/* Selected Publications */}
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-red-600">Selected Publications</h2>
              {profile.selected_publications.length > 0 ? (
                profile.selected_publications.map((publication) => (
                  <div key={publication.id} className="mt-4">
                    <h3 className="text-xl font-bold text-gray-700">{publication.title}</h3>
                    <p className="text-gray-600">{publication.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">No publications available</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-red-600">Personal Information</h2>
              <ul className="text-gray-700 mt-2 space-y-2">
                <li><strong>Email:</strong> {profile.contact_info}</li>
                <li><strong>Location:</strong> {profile.location || 'Not specified'}</li>
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
  } catch (error) {
    console.error('Error fetching profile:', error);

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-red-600">Profile not found</h1>
            <p className="text-gray-700 mt-4">We couldn’t retrieve the profile. Please try again later or contact support if the issue persists.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
