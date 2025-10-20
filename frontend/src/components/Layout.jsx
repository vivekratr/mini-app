import Navbar from "./Navbar";
import "../styles/Layout.css"
import { useContentStore } from "../stores/contentStore";
import { useEffect } from "react";

export default function Layout({ children }) {
          const { language, fetchContent, content } = useContentStore();
    useEffect(() => {
        fetchContent('footer');
    }, [language]);

    const handleLogout = () => {
    };

    return (
        <div className="">
      
            <Navbar handleLogout={handleLogout} />
         

            <main className="main-content">
                {children}
            </main>

            <footer novalidate aria-autocomplete="off" className="footer">
                <div className="footer-section" style={{ borderBottom: '1px solid white'}}>
                    <p> 123 Fakturera</p>
                    
                    <ul>
                        <li>{content?.footer?.home || 'Home'}</li>
                        <li>{content?.footer?.order || 'Order'}</li>
                        <li>{content?.footer?.contact || 'Contact us'}</li>
                        
                    </ul>

                </div>
                <p>&copy; Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>

            </footer>
        </div>
    );
  }