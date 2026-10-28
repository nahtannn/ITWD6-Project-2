import { useEffect } from "react";
//Function Component
function FormCost ( { 
    sharedPropCustomerType,
    sharedPropBond,
    sharedPropWarranty,
    sendCostDetails,
} ) {
    const bond = sharedPropCustomerType === "customer"
        ? Number(sharedPropBond)
        : 0;
    
    const serviceFee = sharedPropWarranty ? 0 : 85;
    const totalCost = bond + serviceFee;
    const gst = totalCost * 0.15;
    const totalAndGst = totalCost + gst;

    useEffect(() => {
        sendCostDetails( {bond, serviceFee, totalCost, gst, totalAndGst} );
    }, [bond, serviceFee, totalCost, gst, totalAndGst, sendCostDetails]);
    //Component UI: HTML Rendering
    return(
    <>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3 me-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={bond.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3 me-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={(serviceFee).toFixed(2)} readOnly/>
        </div>
        <div className="row mt-1 ms-3 me-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalCost.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3 me-3">
            <label className="col-12 col-md-12 col-lg-4">GST</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={gst.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3 me-3">
            <label className="col-12 col-md-12 col-lg-4">Total(+GST)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalAndGst.toFixed(2)} readOnly />
        </div>
    </>
    );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;