//Import
import { useEffect } from "react";
import { warrantyChart } from "./charts/warrantyChart";
import { phoneMakeChart } from "./charts/phoneMakeChart";
import { faultChart } from "./charts/faultChart";

//Function Component
function AdvancedJS() {
    //States

    //Data
    
    //Functions and Methods
    useEffect(() => {
        warrantyChart.renderUI("warrantyChart");
        phoneMakeChart.renderUI("phoneMakeChart");
        faultChart.renderUI("faultChart");

        return () => {
            warrantyChart.destroy();
            phoneMakeChart.destroy();
            faultChart.destroy();
        };
    }, []);

    //Component UI
    return (
        <>
            <div style={{minHeight: '60vh'}}>
                <div className="accordion row align-items-start p-2" id="advancedJSAccordion">
                    {/* Accordion buttons go here */}
                    <div className="row col-12 col-lg-3">
                        {/* Toggle Button for Demo 1 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Drag and Drop
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 2 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Address Autofill
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 3 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Upload Image
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 4 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"
                             style={{backgroundColor: '#92abc4', border: '1px dashed #707070' }}>
                                Bookings Filtering
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 5 */}
                        <h2 className="accordion-header col-6 col-lg-12">
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
                                    Content for Demo 1 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 2 Area */}
                        <div className="accordion-item">
                            <div id="collapseTwo" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 2 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 3 Area */}
                        <div className="accordion-item">
                            <div id="collapseThree" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 3 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 4 Area */}
                        <div className="accordion-item">
                            <div id="collapseFour" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 4 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 5 Area */}
                        <div className="accordion-item">
                            <div id="collapseFive" className="accordion-collapse collapse" 
                            data-bs-parent="#advancedJSAccordion">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    <h1>Booking Charts</h1>
                                    <div className="container">
                                        <div className="row">
                                            {/*Chart 1*/}
                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="card shadow">
                                                    <div className="card-body">
                                                        {/* Pie Chart: Warranty Status */}
                                                        <canvas id="warrantyChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 2*/}
                                            <div className="col-12 col-md-6, col-lg-4">
                                                <div className="card shadow">
                                                    <div className="card-body">
                                                        <canvas id="phoneMakeChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Chart 3*/}
                                            <div className="col-12 col-md-6 col-lg-4">
                                                <div className="card shadow">
                                                    <div className="card-body">
                                                        <canvas id="faultChart"></canvas>
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