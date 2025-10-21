import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import "../styles/Navbar.css"
import { NavLink } from 'react-router-dom'
import { useContentStore } from '../stores/contentStore'
import { useEffect } from 'react';

const Navbar = () => {
    const { language, setLanguage, fetchContent, content } = useContentStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchContent("navbar");
    }, [language])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const styles = {
        menuItems: {
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 'calc(-20%)',
            background: 'white',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '100%',
            overflow: 'hidden',
        },
        menuItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            borderBottom: '1px solid #f0f0f0',
            color: 'black',
        },
        menuItemFocus: {
            background: '#f8f9fa',
            color: 'black',
        },
    };

    return (
        <>
            <nav className='navbar-container'>
                <div className="navbar-left">
                    <button
                        className="navbar-mobile-toggle-desktop"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <div className={`navbar-hamburger ${mobileMenuOpen ? 'navbar-hamburger-active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                    <img className="navbar-logo-desktop" style={{ width: "56px", height: "auto", objectFit: 'cover' }} src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" />
                </div>

                <div className="navbar-right">
                    <div className="navbar-links">
                        <NavLink
                            to="/"
                            className="white-text"
                        >
                            <p>{content?.navbar?.home || 'Home'}</p>
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                        >
                            {content?.navbar?.order || 'Order'}
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                        >
                            {content?.navbar?.["our-customers"] || 'Our Customers'}
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                        >
                            {content?.navbar?.['about-us'] || 'About us'}
                        </NavLink>
                        <NavLink
                            to="/terms"
                            className="white-text"
                        >
                            {content?.navbar?.terms || 'Terms'}
                        </NavLink>
                    </div>

                    <Menu as="div" className="menuWrapper">
                        <MenuButton className="menuButton">
                            {language === 'en' ? (
                                <div className='navbar-lang'>
                                    <p className='white-text'>English</p>
                                    <img
                                        src="https://storage.123fakturere.no/public/flags/GB.png"
                                        alt="English"
                                        className='flag-icon'
                                    />
                                </div>
                            ) : (
                                <div className='navbar-lang'>
                                    <p className='white-text'>Svenska</p>
                                    <img
                                        src="https://storage.123fakturere.no/public/flags/SE.png"
                                        alt="Svenska"
                                        className='flag-icon'
                                    />
                                </div>
                            )}
                        </MenuButton>

                        <MenuItems style={styles.menuItems}>
                            <MenuItem>
                                {({ focus }) => (
                                    <div
                                        onClick={() => setLanguage('en')}
                                        style={{
                                            ...styles.menuItem,
                                            ...(focus ? styles.menuItemFocus : {}),
                                        }}
                                    >
                                        <p style={{ color: "black" }} className='navbar-lang'>English</p>
                                        <img
                                            className='flag-icon'
                                            src="https://storage.123fakturere.no/public/flags/GB.png"
                                            alt="English"
                                        />
                                    </div>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <div
                                        onClick={() => setLanguage('sv')}
                                        style={{
                                            ...styles.menuItem,
                                            ...(focus ? styles.menuItemFocus : {}),
                                        }}
                                    >
                                        <p style={{ color: "black" }} className='navbar-lang'>Svenska</p>
                                        <img
                                            className='flag-icon'
                                            src="https://storage.123fakturere.no/public/flags/SE.png"
                                            alt="Svenska"
                                        />
                                    </div>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </nav>

            {/* mobile menu  */}
            <div className={`navbar-mobile-dropdown ${mobileMenuOpen ? 'navbar-mobile-dropdown-active' : ''}`}>
                <div className="navbar-mobile-links">
                    <NavLink
                        to="/"
                        className="navbar-mobile-link"
                        onClick={closeMobileMenu}
                    >
                        {content?.navbar?.home || 'Hem'}
                    </NavLink>
                    <NavLink
                        to="/"
                        className="navbar-mobile-link"
                        onClick={closeMobileMenu}
                    >
                        {content?.navbar?.order || 'Beställ'}
                    </NavLink>
                    <NavLink
                        to="/"
                        className="navbar-mobile-link"
                        onClick={closeMobileMenu}
                    >
                        {content?.navbar?.["our-customers"] || 'Våra Kunder'}
                    </NavLink>
                    <NavLink
                        to="/"
                        className="navbar-mobile-link"
                        onClick={closeMobileMenu}
                    >
                        {content?.navbar?.['about-us'] || 'Om oss'}
                    </NavLink>
                    <NavLink
                        to="/term"
                        className="navbar-mobile-link"
                        onClick={closeMobileMenu}
                    >
                        {content?.navbar?.terms || 'Terms'}
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar