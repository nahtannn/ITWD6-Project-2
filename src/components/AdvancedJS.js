//Import
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { warrantyChart } from "./charts/warrantyChart";
import { phoneMakeChart } from "./charts/phoneMakeChart";
import { faultChart } from "./charts/faultChart";
import { costChart } from "./charts/costChart";
import { courtesyPhoneChart } from "./charts/courtesyPhoneChart";
import DragDrop from "../Images/DragDrop.png";
import AddressAutofill from "../Images/AddressAutofill.png";
import ImageUpload from "../Images/ImageUpload.png";
import Filtering from "../Images/Filtering.png";

//Function Component
function AdvancedJS() {
    //States

    //Data
    
    //Functions and Methods

    // useEffect hook to render and cleanup charts
    useEffect(() => {
        // Render all charts when the component mounts
        warrantyChart.renderUI("warrantyChart");
        phoneMakeChart.renderUI("phoneMakeChart");
        faultChart.renderUI("faultChart");
        costChart.renderUI("costChart");
        courtesyPhoneChart.renderUI("courtesyPhoneChart");
        // Cleanup function to destroy charts when the component unmounts
        return () => {
            warrantyChart.destroy();
            phoneMakeChart.destroy();
            faultChart.destroy();
            costChart.destroy();
            courtesyPhoneChart.destroy();
        };
    }, []);

    //Component UI
    return (
        <>
            <div style={{minHeight: '60vh'}}>
                {/*Statement Of Authenticity*/}
                <div className="p-2 m-2" style={{border: '1px solid #707070', borderRadius: '5px', background: '#cff3ca'}}>
                    <h5><strong>Statement Of Authenticity</strong></h5>
                    <p>I confirm that:</p>
                    <ul>
                        <li>This is an original assessment and is entirely my own work.</li>
                        <li>It contains no material previously published or written by another person or myself except where due acknowledgement is made in the text.</li>
                        <li>No material which to a substantial extent, has been submitted for any other academic course, is included without acknowledgement.</li>
                    </ul>
                    {/*As i used AI tools, I am disclosing their usage below*/}
                    <h6><strong>AI Disclourse</strong></h6>
                    <p>I confirm that the following AI tools were used in the assignment:</p>
                    <ul>
                        <li>Github Copilot - Assisted with code suggestions and completions, I used copilot mainly to automate repetitive coding tasks such as styling and div creation where appropriate.</li>
                        <li>Claude - Assisted with advanced javascript creation and debugging, I used Claude mainly to help troubleshoot complex logic and optimize code structure.</li>
                    </ul>
                    <p>I confirm that I reviewed and verified the contributions of the AI tools mentioned above and ensured that I understand how each feature works.</p>
                </div>
                <div className="accordion row align-items-start p-2" id="advancedJSAccordion">
                    {/* Accordion buttons go here */}
                    <div className="row col-12 col-lg-3">
                        {/* Toggle Button for Demo 1 */}
                        <h2 className="accordion-header col-12">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Drag and Drop
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 2 */}
                        <h2 className="accordion-header col-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Address Autofill
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 3 */}
                        <h2 className="accordion-header col-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Upload Image
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 4 */}
                        <h2 className="accordion-header col-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Bookings Filtering
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 5 */}
                        <h2 className="accordion-header col-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Booking Charts
                            </button>
                        </h2>
                    </div>
                    {/* Content for each demo goes here */}
                    <div className="row col-12 col-lg-9">

                        {/* Demo 1 Area */}
                        <div className="accordion-item">
                            <div id="collapseOne" className="accordion-collapse collapse show" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1 className="mb-3">Drag and Drop</h1>
                                    <Link to="/" className="p-1" style={{ background: 'lightgray', border: '1px solid #9c9c9c', borderRadius: '10px', textDecoration: 'none', color: 'black' }}>This Demo is located on the Homepage</Link>
                                    <p>The customer can choose their courtesy phone and charger (if they choose to) by dragging the items from the available options to the selection area.
                                        They are limited to selecting one of each item. This selection is then passed to formcost.js where it is used to calculate the total cost of the selected items.
                                    </p>
                                    <img src={DragDrop} alt="Drag and Drop Demo" className="img-fluid mb-3" style={{ border: '2px solid #9c9c9c', borderRadius: '20px' }}/>
                                    <p>This code is implemented in the following files:</p>
                                    <ul>
                                        <li>FormCourtesyPhone.js</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Demo 2 Area */}
                        <div className="accordion-item">
                            <div id="collapseTwo" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1 className="mb-3">Address Autofill</h1>
                                    <Link to="/" className="p-1" style={{ background: 'lightgray', border: '1px solid #9c9c9c', borderRadius: '10px', textDecoration: 'none', color: 'black' }}>This Demo is located on the Homepage</Link>
                                    <p>The customer can start typing their address and the form will automatically suggest and fill in the rest of the address based on the input.
                                        This is done using the mapbox API.
                                    </p>
                                    <img src={AddressAutofill} alt="Address Autofill Demo" className="img-fluid mb-3" style={{ border: '2px solid #9c9c9c', borderRadius: '20px' }}/>
                                    <p>This code is implemented in the following files:</p>
                                    <ul>
                                        <li>FormCustomerDetails.js</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Demo 3 Area */}
                        <div className="accordion-item">
                            <div id="collapseThree" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1 className="mb-3">Upload Image</h1>
                                    <Link to="/" className="p-1" style={{ background: 'lightgray', border: '1px solid #9c9c9c', borderRadius: '10px', textDecoration: 'none', color: 'black' }}>This Demo is located on the Homepage</Link>
                                    <p>The customer can upload an image and it will be processed in the database and will return correctly on the bookings page</p>
                                    <img src={ImageUpload} alt="Uploading Demo" className="img-fluid mb-3" style={{ border: '2px solid #9c9c9c', borderRadius: '20px' }}/>
                                    <p>This code is implemented in the following files:</p>
                                    <ul>
                                        <li>FormCustomerDetails.js</li>
                                        <li>Bookings.js</li>
                                        <li>Home.js</li>
                                        <li>It is also included in Supabase</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Demo 4 Area */}
                        <div className="accordion-item">
                            <div id="collapseFour" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1 className="mb-3">Booking Search, Filter, and Sort</h1>
                                    <Link to="/Bookings" className="p-1" style={{ background: 'lightgray', border: '1px solid #9c9c9c', borderRadius: '10px', textDecoration: 'none', color: 'black' }}>This Demo is located on the Bookings Page</Link>
                                    <p>The user can search, filter, and sort bookings based on various criteria such as date, customer name, and warranty status.</p>
                                    <img src={Filtering} alt="Filtering Demo" className="img-fluid mb-3" style={{ border: '2px solid #9c9c9c', borderRadius: '20px' }}/>
                                    <p>This code is implemented in the following files:</p>
                                    <ul>
                                        <li>Bookings.js</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Demo 5 Area */}
                        <div className="accordion-item">
                            <div id="collapseFive" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1 className="mb-3">Booking Charts</h1>
                                    <div className="container">
                                        <div className="row">
                                            {/*Chart 1*/}
                                            <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow h-100">
                                                    <div className="card-body d-flex justify-content-center align-items-center">
                                                        {/* Pie Chart: Warranty Status */}
                                                        <canvas id="warrantyChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 2*/}
                                            <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow h-100">
                                                    <div className="card-body d-flex justify-content-center align-items-center">
                                                        <canvas id="phoneMakeChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 3*/}
                                            <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow h-100">
                                                    <div className="card-body d-flex justify-content-center align-items-center">
                                                        <canvas id="faultChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 4*/}
                                            <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow h-100">
                                                    <div className="card-body d-flex justify-content-center align-items-center">
                                                        <canvas id="costChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 5*/}
                                            <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow h-100">
                                                    <div className="card-body d-flex justify-content-center align-items-center">
                                                        <canvas id="courtesyPhoneChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
//Export
export default AdvancedJS;