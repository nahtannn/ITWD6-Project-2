//Function Component
function FormRepairDetail( { passDataToParent } ) 
{
    const updateWarranty = (value) => {
        passDataToParent(value);
    };
    //States

    //Data

    //Methods and Functions
    const handleWarrantyChange = (e) => {
        // Handle warranty change logic here
        let purchaseDate = new Date(document.getElementById('purchaseDate').value);
        let currentDate = new Date();//Today
        let difftime = Math.abs(currentDate - purchaseDate);
        let diffMonths = Math.ceil(difftime / (1000 * 60 * 60 * 24 * 30));
        if (diffMonths > 24) {
            document.getElementById('warrantyCheck').disabled = true;
        } else {
            document.getElementById('warrantyCheck').disabled = false;
        }
    };
    
    const oneDay = 24 * 60 * 60 * 1000; //Defines how long one day is in milliseconds so it can be used to add or subtract one day from a date
    //Component UI: HTML Rendering
    return(
        <>
            <h2>Repair Details</h2>
            {/*Purchase Date*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4 ">Purchase Date*</label>
                <input className="col-12 col-md-12 col-lg-7" type="date" id="purchaseDate" 
                    max={/* Ensure the purchase date has to be before today*/
                        new Date(Date.now() - oneDay).toISOString().split("T")[0]
                    }
                    onChange={handleWarrantyChange}
                required/>
            </div>
            {/*Repair Date*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
                <input className="col-12 col-md-12 col-lg-7" type="date" 
                    min={/* Ensure the repair date is at least one day after today */
                        new Date(Date.now() + oneDay).toISOString().split("T")[0]
                    }
                required/>
            </div>
            {/*Under Warranty*/}
            <div className="row mt-2 ms-1 me-1">
                <fieldset className="border border-black col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                        <input type="checkbox" id="warrantyCheck"
                            /* Checkbox disabled if purchase date is greater than 24 months ago*/
                            disabled={true} 
                            onChange={(event) => updateWarranty(event.target.checked)} 
                        />
                    </div>
                </fieldset>
            </div>
            {/*Other details*/}

            {/*IMEI number*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" 
                inputMode="numeric" pattern="[0-9]{15}" maxLength={15}
                title="IMEI must be 15 digits"
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 15); // Limits to 15 numbers only
                }}
                required />
            </div>
            {/*Phone Manufacturers*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Make *</label>
                <select className="col-12 col-md-12 col-lg-7">
                    <option value="Apple" selected>Apple</option>
                    <option value="LG">LG</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            {/*Phone Model*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Model Number</label>
                <input className="col-12 col-md-12 col-lg-7" type="number" />
            </div>
            {/*Fault Category*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select className="col-12 col-md-12 col-lg-7">
                    <option value="Battery" selected>Battery</option>
                    <option value="Charging">Charging</option>
                    <option value="Screen">Screen</option>
                    <option value="SD-storage">SD-storage</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            {/*Fault Description*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Description *</label>
                <textarea className="col-12 col-md-12 col-lg-7" rows="5" required style={{resize: 'none'}} />
            </div>
        </>
    );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;