//Import all dependencies, other components
import { useState, useEffect } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

//Function Component
function FormCustomerDetail( { passDataToParent, sendCustomerDetails } ) {

    // const updateCustomerType = (value) => {
    //     passDataToParent(value);
    // };

    //customer type state
    const [type, setType] = useState({ customer: "checked", business: "" });
    //update customer type
    const updateCustomerType = (e) => {
        if (e.target.value === "customer") {
            passDataToParent(true);
            setType({ customer: "checked", business: "" });
        } else {
            passDataToParent(false);
            setType({ customer: "", business: "checked" });
        }
    };
    //Customer details
    const [customerDetails, setCustomerDetails] = useState({
        type: "customer",
        title: "Mr",
        firstName: "",
        lastName: "",
        street: "",
        suburb: "",
        city: "",
        postCode: "",
        phone: "",
        email: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails( {...customerDetails, ...{[name]: value} } );
    };

    //useEffect() hook "SYNCHRONIZE" a component with another component (or external system)
    //useEffect hook syntax: useEffect(() => {}, [dependencies]);
    useEffect( () => {
        //Callback function
        sendCustomerDetails(customerDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerDetails]);

    //token for mapbox
    const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
    
    //Component UI: HTML Rendering
    return(
        <>
            <div className="p-2">
                <h2>Customer Details</h2>
                {/*Customer type*/}
                <div className="row">
                    <fieldset className="border border-black col-12 col-lg-11 ms-2 me-4">
                        <legend className="col-11 float-none w-auto">Customer type *</legend>
                        <div>
                            <label className="col-12 col-md-12 col-lg-4">Customer</label>
                            <input type="radio" name="customerType" value="customer" defaultChecked={type.customer}
                             onChange={(e) => updateCustomerType(e)} required />
                        </div>
                        <div>
                            <label className="col-12 col-md-12 col-lg-4">Business</label>
                            <input type="radio" name="customerType" value="business" defaultChecked={type.business}
                            onChange={(e) => updateCustomerType(e)} required/>
                        </div>
                    </fieldset>
                </div>
                {/*Details*/}

                {/*Title*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Title *</label>
                    <select className="col-12 col-md-12 col-lg-7" name="title" defaultValue="Mr" onChange={handleChange}>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                    </select>
                </div>
                {/*First Name*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">First Name(s) *</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="firstName"
                        pattern="[A-Za-z\s\-\u2013]+" title="First Name should only contain letters, spaces, hypens, and en-dashes" 
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^A-Za-z\s\-\u2013]/g, ''))}
                        onChange={handleChange}
                        required/>
                </div>
                {/*Last Name*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="lastName" onChange={handleChange}
                        pattern="[A-Za-z\s\-\u2013]+" title="Last Name should only contain letters, spaces, hypens, and en-dashes" 
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^A-Za-z\s\-\u2013]/g, ''))}
                        required/>
                </div>
                {/*Street*/}
                <div className="row mt-2 ms-1 me-1">
                    <AddressAutofill accessToken={mapboxToken}>
                        <label className="col-12 col-md-12 col-lg-4">Street *</label>
                        <input className="col-12 col-md-12 col-lg-7" type="text" name="street" autoComplete="address-line1" onChange={handleChange} required />
                    </AddressAutofill>
                </div>
                {/*Suburb*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Suburb</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="suburb" autoComplete="address-level3" onChange={handleChange} />
                </div>
                {/*City*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">City *</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="city" autoComplete="address-level2" onChange={handleChange} required/>
                </div>
                {/*Postcode*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Postcode</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="postCode" autoComplete="postal-code" onChange={handleChange}
                        inputMode="numeric" pattern="[0-9]{4}" maxLength={4}
                        title="Postcode must be 4 digits"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        }}
                    />
                </div>
                {/*Phone Number*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
                    <input className="col-12 col-md-12 col-lg-7" type="tel"
                        inputMode="tel" pattern= "[0-9\s\(\)\-+]+"
                        title="Only numbers, spaces, and ( ) - + symbols are allowed"
                        value={customerDetails.phoneNumber || ''}
                        name="phoneNumber" onChange={handleChange}
                    required/>
                </div>
                {/*Email*/}
                <div className="row mt-2 ms-1 me-1">
                    <label className="col-12 col-md-12 col-lg-4">Email *</label>
                    <input className="col-12 col-md-12 col-lg-7" type="text" name="email" onChange={handleChange} required/>
                </div>
            </div>
        </>
    );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail;