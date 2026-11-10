import { useState, useEffect } from 'react';


const repairTimes = [];
for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
        const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const label = `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
        repairTimes.push({ value, label });
    }
}
//Function Component
function FormRepairDetail( { passDataToParent, sendRepairDetails } ) 
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
    
    //Repair details
    const [repairDetails, setRepairDetails] = useState({
        purchaseDate: "",
        repairDate: "",
        repairTime: "",
        warrantyCheck: false,
        imei: "",
        phoneMake: "Apple",
        phoneModel: "",
        faultCategory: "Battery",
        faultDescription: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRepairDetails(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };
    //useEffect() hook "SYNCHRONIZE" a component with another component (or external system)
    //useEffect hook syntax: useEffect(() => {}, [dependencies]);
    useEffect( () => {
        //Callback function
        sendRepairDetails(repairDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repairDetails]);

    const oneDay = 24 * 60 * 60 * 1000; //Defines how long one day is in milliseconds so it can be used to add or subtract one day from a date
    //Component UI: HTML Rendering
    return(
        <>
            <h2>Repair Details</h2>
            {/*Purchase Date*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4 ">Purchase Date*</label>
                <input className="col-12 col-md-12 col-lg-7" type="date" name="purchaseDate" id="purchaseDate" 
                    max={/* Ensure the purchase date has to be before today*/
                        new Date(Date.now() - oneDay).toISOString().split("T")[0]
                    }
                    value={repairDetails.purchaseDate || ""}
                    onChange={(e) => { handleWarrantyChange(e); handleChange(e); }}
                required/>
            </div>
            {/*Repair Date*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
                <input className="col-12 col-md-12 col-lg-7" type="date" 
                    min={/* Ensure the repair date is at least one day after today */
                        new Date(Date.now() + oneDay).toISOString().split("T")[0]
                    }
                    name="repairDate"
                    value={repairDetails.repairDate || ""}
                    onChange={handleChange}
                required/>
            </div>
            {/*Time of Repair (in AM/PM format)*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Time *</label>
                <select className="col-12 col-md-12 col-lg-7" name="repairTime" required defaultValue="" onChange={handleChange}>
                    <option value="" disabled hidden>Select Time</option>
                    {repairTimes.map((t) => (
                        <option key={t.value} 
                            value={t.value}>{t.label}
                        </option>
                    ))}
                </select>
            </div>
            {/*Under Warranty*/}
            <div className="row mt-2 ms-1 me-1">
                <fieldset className="border border-black col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                        <input type="checkbox" id="warrantyCheck" name="warrantyCheck"
                            checked={repairDetails.warrantyCheck}
                            disabled={true}
                            onChange={(e) => { updateWarranty(e.target.checked); handleChange(e); }} 
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
                title="IMEI must be 15 digits" name="imei"
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 15); // Limits to 15 numbers only
                    handleChange(e);
                }}
                required />
            </div>
            {/*Phone Manufacturers*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Make *</label>
                <select className="col-12 col-md-12 col-lg-7" name="phoneMake" onChange={handleChange}>
                    <option value="Apple" defaultValue>Apple</option>
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
                <input className="col-12 col-md-12 col-lg-7" type="text" name="phoneModel" onChange={handleChange} />
            </div>
            {/*Fault Category*/}
            <div className="row mt-2 ms-1 me-1">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select className="col-12 col-md-12 col-lg-7" name="faultCategory" onChange={handleChange}>
                    <option value="Battery" defaultValue>Battery</option>
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
                <textarea className="col-12 col-md-12 col-lg-7" name="faultDescription" rows="5" required style={{resize: 'none'}} onChange={handleChange} />
            </div>
        </>
    );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;