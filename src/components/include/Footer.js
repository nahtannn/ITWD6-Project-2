//Import

//Component Function
function Footer() {
    //States

    //Data
    let footerStyle = {
        minHeight: '10vh',
        fontSize: '1.2em',
        color: 'white',
        backgroundColor: '#2C3E50',
        /**Centralise vertically and horizontally content */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    //Functions and Methods

    //UI Render
    return (
        <>
            <footer className="m-0 p-0" style={footerStyle}>
                <p className="text-center">Created By Nathan Kinsey @2026</p>
            </footer>
        </>
    );
}
//Export
export default Footer;