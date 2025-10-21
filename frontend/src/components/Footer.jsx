import { useContentStore } from "../stores/contentStore";
import { useEffect } from "react";
import "../styles/Layout.css"


const Footer = () => {
    const { language, fetchContent, content } = useContentStore();
    useEffect(() => {
        fetchContent('footer');
    }, [language]);
  return (
    <div>
          <footer className="footer">
              <div className="footer-section" style={{ borderBottom: '1px solid white' }}>
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
  )
}

export default Footer
