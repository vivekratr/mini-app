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
        <nav className='navbar-container'>
            <div className="navbar-left">
                <img style={{ width: "56px", height: "auto", objectFit: 'cover' }} src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" />
            </div>

            <div className="navbar-right-controls">
                <button
                    className="navbar-mobile-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <div className={`navbar-hamburger ${mobileMenuOpen ? 'navbar-hamburger-active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                <div className={`navbar-right ${mobileMenuOpen ? 'navbar-right-active' : ''}`}>
                    <div className="navbar-links">
                        <NavLink
                            to="/"
                            className="white-text"
                            onClick={closeMobileMenu}
                        >
                            <p>{content?.navbar?.home || 'Home'}</p>
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                            onClick={closeMobileMenu}
                        >
                            {content?.navbar?.order || 'Order'}
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                            onClick={closeMobileMenu}
                        >
                            {content?.navbar?.["our-customers"] || 'Our Customers'}
                        </NavLink>
                        <NavLink
                            to="/"
                            className="white-text"
                            onClick={closeMobileMenu}
                        >
                            {content?.navbar?.['about-us'] || 'About us'}
                        </NavLink>
                        <NavLink
                            to="/term"
                            className="white-text"
                            onClick={closeMobileMenu}
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
                                        onClick={() => {
                                            setLanguage('en');
                                            closeMobileMenu();
                                        }}
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
                                        onClick={() => {
                                            setLanguage('sv');
                                            closeMobileMenu();
                                        }}
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
            </div>
        </nav>
    )
}

export default Navbar