"use client"

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withAuth from '../utils/withAuth';

const AdminPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Admin Dashboard</h1>
            <Footer />
        </div>
    );
};

export default withAuth(AdminPage, ['admin']);
