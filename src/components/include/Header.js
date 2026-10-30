//Import
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
//Component Function
function Header() {
  //States

  //Data: Have our custom styles
  const headerStyle = {
    minHeight: '15vh',
    backgroundColor: '#2C3E50'
  };
  
  const taglineStyle = {
    minHeight: '15vh',
    fontSize: '2em'
  };
  //Functions and Methods

  //Function to display page content based on the current route
  const pageContent = {
    '/': {
      pageTitle: 'Phone Fix Booking System',
      title: 'Phone Fix Booking System'
    },
    '/advanced-js': {
      pageTitle: 'Extension',
      title: 'Extension'
    },
    '/faq': {
      pageTitle: 'FAQ',
      title: 'FAQ'
    },
    '/bookings': {
      pageTitle: 'Booking',
      title: 'Booking'
    }
  };
  //Get the current location and determine the current page content based on the route
  const location = useLocation();
  const currentPage = pageContent[location.pathname] || {
    pageTitle: 'Phone Fix Booking System',
    title: 'Phone Fix Booking System'
  };

  useEffect(() => {
    document.title = currentPage.title;
  }, [currentPage.title]);
  //UI Render
  return (
    <>
        <header className="row" style={headerStyle}>
            <div className="col-12 col-lg-8 text-center text-white d-flex 
            justify-content-center align-items-center" style={taglineStyle}>{currentPage.pageTitle}</div>
            <div className="col-12 col-lg-4">
                <div className="row">
                    <Link to="/" className="col-12 col-md-4 p-1 m-0 border border-dark text-white text-center" style={{backgroundColor: '#8FB569'}}>Home</Link>
                    <Link to="/advanced-js" className="col-12 col-md-4 p-1 m-0 border border-dark text-white text-center" style={{backgroundColor: '#3498DB'}}>Extension</Link>
                    <Link to="/bookings" className="col-12 col-md-4 p-1 m-0 border border-dark text-white text-center" style={{backgroundColor: '#E67E22'}}>Bookings</Link>
                </div>
            </div>
        </header>
    </>
  );
}
//Export
export default Header;