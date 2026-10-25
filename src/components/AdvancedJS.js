//Import

//Function Component
function AdvancedJS() {
    //States

    //Data
    
    //Functions and Methods

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
                             style={{backgroundColor: '#5B9BD5'}}>
                                Demo 1
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 2 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                             style={{backgroundColor: '#5B9BD5'}}>
                                Demo 2
                            </button>
                        </h2>
                        {/* Toggle Button for Demo 3 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                             style={{backgroundColor: '#5B9BD5'}}>
                                Demo 3
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 4 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"
                             style={{backgroundColor: '#5B9BD5'}}>
                                Demo 4
                            </button>
                        </h2>

                        {/* Toggle Button for Demo 5 */}
                        <h2 className="accordion-header col-6 col-lg-12">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                             data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"
                             style={{backgroundColor: '#5B9BD5'}}>
                                Demo 5
                            </button>
                        </h2>
                    </div>
                    {/* Content for each demo goes here */}
                    <div className="row col-12 col-lg-9">
                        {/* Demo 1 Area */}
                        <div className="accordion-item">
                            <div id="collapseOne" className="accordion-collapse collapse show" 
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 1 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 2 Area */}
                        <div className="accordion-item">
                            <div id="collapseTwo" className="accordion-collapse collapse" 
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 2 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 3 Area */}
                        <div className="accordion-item">
                            <div id="collapseThree" className="accordion-collapse collapse" 
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 3 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 4 Area */}
                        <div className="accordion-item">
                            <div id="collapseFour" className="accordion-collapse collapse" 
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 4 goes here.
                                </div>
                            </div>
                        </div>
                        {/* Demo 5 Area */}
                        <div className="accordion-item">
                            <div id="collapseFive" className="accordion-collapse collapse" 
                            data-bs-parent="#accordionExample">
                                <div className="accordion-body" style={{minHeight: "50vh"}}>
                                    Content for Demo 5 goes here.
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