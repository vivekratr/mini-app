import Navbar from "./Navbar";
import "../styles/Layout.css"


export default function Layout({ children }) {
        

    const handleLogout = () => {
    };

    return (
        <div className="">
      
            <Navbar handleLogout={handleLogout} />
         

            <main className="main-content">
                {children}
            </main>

         
        </div>
    );
  }