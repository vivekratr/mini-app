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

            <footer novalidate aria-autocomplete="off" className="footer">
                <div className="footer-section" style={{ borderBottom: '1px solid white'}}>
                    <p> 123 Fakturera</p>
                    
                    <ul>
                        <li>Home</li>
                        <li>Order</li>
                        <li>Contact us</li>
                        
                    </ul>

                </div>
                <p>&copy; Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>

            </footer>
        </div>
    );
  }