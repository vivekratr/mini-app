import Navbar from "./Navbar";

export default function Layout({ children }) {

    const handleLogout = () => {
    };

    return (
        <div className="">
      
            <Navbar handleLogout={handleLogout} />
         

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <p>&copy; Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>
            </footer>
        </div>
    );
  }