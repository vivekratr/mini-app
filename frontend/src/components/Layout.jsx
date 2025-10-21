import Navbar from "./Navbar";
import "../styles/Layout.css"


export default function Layout({ children }) {
        

  
    return (
        <div className="">
      
         

            <main className="main-content">
                {children}
            </main>

         
        </div>
    );
  }