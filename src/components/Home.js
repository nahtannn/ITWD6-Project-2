//Imports
import FormCustomerDetail from './home/FormCustomerDetail';
import FormRepairDetail from './home/FormRepairDetail';
import FormCourtesyPhone from './home/FormCourtesyPhone';
import FormCost from './home/FormCost';
import FormButtons from './home/FormButtons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//Component Function
function Home() {
    //States

    //Parent Component: Home
    const updateSharedState = (value) => setsharedBond(value); //Child1(FormCourtesyPhone) pass data to Child 2
    const [sharedBond, setsharedBond] = useState(0); //Child2(FormCost) will receive this data from Child1(FormCourtesyPhone)

    const UpdateWarranty = (value) => setsharedWarranty(value); //Child1 pass data to parent
    const [sharedWarranty, setsharedWarranty] = useState(false); //Child2 will receive this data from Child1

    const updateCustomerType = (value) => setsharedCustomerType(value);
    const [sharedCustomerType, setsharedCustomerType] = useState('customer');

    //Pass customerDetails from FormCustomerDetail to Home component
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
        email: ""});

    //Pass repair details from FormRepairDetail to Home component
    const [repairDetails, setRepairDetails] = useState({
        purchaseDate: "",
        repairDate: "",
        warranty: false,
        imei: "",
        phoneManufacturer: "Apple",
        phoneModel: "",
        faultCategory: "Battery",
        faultDescription: ""
    });

    //Pass courtesy phone details from FormCourtesyPhone to Home component
    const [courtesyPhoneDetails, setCourtesyPhoneDetails] = useState({
        phoneBorrow: "none",
        chargerBorrow: "none",
        phoneCost: "",
        chargerCost: ""
    });
    //Data
    const navigate = useNavigate();
    
    //Functions and Methods
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const attachedData = {
                sharedBond,
                sharedCustomerType,
                customerDetails
            };
            navigate('/bookings');
        }
        catch (e) {
            alert('ERROR')
        }
    }
    //UI Render
    return (
        <>
            <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>
                {/*Customer Detail */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                    <FormCustomerDetail passDataToParent={updateCustomerType}
                    sendCustomerDetails={(value) => setCustomerDetails(value)} />
                </div>
                {/*Repair Detail */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5f5e3' }}>
                    <FormRepairDetail  passDataToParent={UpdateWarranty} />
                </div>
                {/*Courtesy Phone and Cost*/}
                <div className="col-12 col-lg-4 p-0 m-0">
                    {/*Courtesy Phone*/}
                    <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874a6' }}>
                        <FormCourtesyPhone passDataToParent={updateSharedState} />
                    </div>
                    {/*Cost*/}
                    <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#edbb99' }}>
                        <FormCost sharedPropBond={sharedBond}  sharedPropWarranty={sharedWarranty} sharedPropCustomerType={sharedCustomerType} />
                        {/*Child 2 (FormCost) */}
                    </div>
                </div>

                {/*Button Area*/}
                <div className="p-4 text-center" style={{ minHeight: '20vh', backgroundColor: '#edbb99' }}>
                    <FormButtons />
                </div>
            </form>
        </>
    );
}

//Export
export default Home;