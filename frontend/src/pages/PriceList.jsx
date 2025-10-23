import React, { useState, useEffect } from 'react';
import {ArrowRightIcon, Search,Ellipsis, Plus, Printer, MoreVertical, MenuIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { usePricelistStore } from '../stores/priceListStores';
import { useContentStore } from '../stores/contentStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import "../styles/PriceList.css";
import EditableCell from '../components/EditableCell';

const PriceList = () => {
  const { products, loading, fetchProducts } = usePricelistStore();
  
  const { language, setLanguage } = useContentStore();
  const [screenSize, setScreenSize] = useState('desktop');


  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [columnSelectorOpen, setColumnSelectorOpen] = useState(false);
  const [activeRow,setActiveRow] = useState(0)
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null });
  const [visibleColumns, setVisibleColumns] = useState({
    article_no: true,
    'product/service': true,
    in_price: true,
    price: true,
    unit: true,
    in_stock: true,
    description: true
  });

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
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  const getSortedProducts = () => {
    if (!sortConfig?.field) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const aVal = a?.[sortConfig.field];
      const bVal = b?.[sortConfig.field];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  };


  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
      (p) =>
        p?.article_no?.toString().includes(searchArticle) &&
        p?.["product/service"]
          ?.toLowerCase()
          .includes(searchProduct.toLowerCase())
    )
    : [];

  const sortedProducts = getSortedProducts();

  const columnLabels = {
    article_no: 'Article No.',
    'product/service': 'Product/Service',
    in_price: 'In Price',
    price: 'Price',
    unit: 'Unit',
    in_stock: 'In Stock',
    description: 'Description'
  };

  const editableColumns = {
    article_no: { editable: true, type: 'text' },
    'product/service': { editable: true, type: 'text' },
    in_price: { editable: true, type: 'number' },
    price: { editable: true, type: 'number' },
    unit: { editable: true, type: 'text' },
    in_stock: { editable: true, type: 'number' },
    description: { editable: true, type: 'text' }
  };

  const SortIcon = ({ field }) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={16} />
      : <ChevronDown size={16} />;
  };

  const getResponsiveColumns = () => {
    const allColumns = ['article_no', 'product/service', 'in_price', 'price', 'unit', 'in_stock', 'description'];
    
    if (screenSize === 'desktop') {
      return allColumns.filter(col => visibleColumns[col]);
    } else if (screenSize === 'tablet') {
      return allColumns.filter(col => {
        if(col === 'product/service' || col === 'price'|| col==='article_no' || col==='in_stock' || col ==='unit') return visibleColumns[col]
      });
    } else {
      return allColumns.filter(col =>{
        if(col === 'product/service' || col === 'price') return visibleColumns[col]
      });
    }
  };
  
  useEffect(() => {
    fetchProducts();

  }, []);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const responsiveColumns = getResponsiveColumns();

  return (
    <div>
      <div className="pricelist-container">
        <div className="pl-header">
          <div className="pl-user-info">
            <button className="pl-hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <MenuIcon size={24} />
            </button>
            <div className="pl-avatar">JA</div>
            <div className="pl-user-details">
              <h3>John André</h3>
              <p>Storfjord AS</p>
            </div>
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

        <div className={`pl-sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="pl-menu-title">Menu</div>
          <div className="pl-menu-item">📄 Invoices</div>
          <div className="pl-menu-item">👤 Customers</div>
          <div className="pl-menu-item">⚙️ My Business</div>
          <div className="pl-menu-item">📊 Invoice Journal</div>
          <div className="pl-menu-item ">🏷️ Price List</div>
          <div className="pl-menu-item">📋 Multiple Invoicing</div>
          <div className="pl-menu-item">💳 Unpaid Invoices</div>
          <div className="pl-menu-item">🎁 Offer</div>
          <div className="pl-menu-item">📦 Inventory Control</div>
          <div className="pl-menu-item">👥 Member Invoicing</div>
          <div className="pl-menu-item">☁️ Import/Export</div>
          <div className="pl-menu-item">🚪 Log out</div>
        </div>

        <div className="pl-main-content">
          <div className='flex'>


            <div className="pl-search-bar">
              <div className="pl-search-input-wrapper">
                <input
                  type="text"
                  className="pl-search-input"
                  placeholder="Search Article No ..."
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                />
                <Search className="pl-search-icon" size={20} />
              </div>
              <div className="pl-search-input-wrapper">
                <input
                  type="text"
                  className="pl-search-input"
                  placeholder="Search Product ..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <Search className="pl-search-icon" size={20} />
              </div>
            </div>

            <div className="pl-toolbar">
              <button className="pl-btn pl-btn-secondary">
                <span className='pl-btn-text'>
                  New Product 
                </span>
               <Plus style={{maxWidth:'20px'}} size={18} /> 
              </button>
              <button className="pl-btn pl-btn-secondary">
                <span className='pl-btn-text'>
                  Print List
                </span>
                
                <Printer size={18} /> 
              </button>
              <button className="pl-btn pl-btn-secondary" onClick={() => setColumnSelectorOpen(false)}>
                <span className='pl-btn-text'>
                  Advanced mode
                </span>
                <MoreVertical size={18} /> 
              </button>
            </div>
          </div>
          {loading ? (
            <div className="pl-loading">Loading products...</div>
          ) : (
            <div className="pl-table-container">
              <table className="pl-table">
                <thead>
                  <tr>
                    {responsiveColumns.map((col) =>
                      visibleColumns[col] ? (
                        <th key={col}>
                          <span
                            className="pl-sortable-header"
                            onClick={() => handleSort(col)}
                          >
                            {columnLabels[col]}
                            <SortIcon field={col} />
                          </span>
                        </th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                    {sortedProducts?.map((product,index) => (
                      <tr onClick={()=>setActiveRow(index)} key={product.id}>
                      {responsiveColumns.map((col) =>
                        visibleColumns[col] ? (
                          <td key={col}>
                            { activeRow ===index && <div className='pl-active-row'
                            key={product.id}> <ArrowRightIcon size={18}/></div>}
                            {editableColumns[col]?.editable ? (
                              <EditableCell
                                productId={product.id}
                                field={col}
                                value={product[col]}
                                type={editableColumns[col].type}
                              />
                            ) : (
                              product[col]
                            )}
                          </td>
                        ) : null
                      )}
                        <div
  className="pr-ellipsis"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor:"pointer",
    marginTop:"0.4rem",
    width: "auto", lineHeight: 0 ,height:'auto'
  }}
>
  <Ellipsis position={'center'} size={18} />
</div>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {columnSelectorOpen && (
          <>
            <div className="pl-overlay" onClick={() => setColumnSelectorOpen(false)}></div>
            <div className="pl-column-selector">
              <h3>Select Columns</h3>
              {Object.keys(visibleColumns).map(col => (
                <div key={col}>
                  <input
                    type="checkbox"
                    id={col}
                    checked={visibleColumns[col]}
                    onChange={() => toggleColumn(col)}
                  />
                  <label htmlFor={col}>{columnLabels[col]}</label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PriceList
