//Function Component
function FormCost ( props ) {
    const bond = props.sharedPropCustomerType === "customer"
        ? Number(props.sharedPropBond)
        : 0;
    
    const totalCost = bond + (props.sharedPropWarranty ? 0 : 85);
    const gst = totalCost * 0.15;
    const totalAndGst = totalCost + gst;
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
            <input className="col-12 col-md-12 col-lg-7" type="number" value={(props.sharedPropWarranty ? 0: 85).toFixed(2)} readOnly/>
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