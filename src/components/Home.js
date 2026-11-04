//Imports
import FormCustomerDetail from './home/FormCustomerDetail';
import FormRepairDetail from './home/FormRepairDetail';
import FormCourtesyPhone from './home/FormCourtesyPhone';
import FormCost from './home/FormCost';
import FormButtons from './home/FormButtons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './supabaseClient';

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


    const [submitting, setSubmitting] = useState(false); //State to track form submission status

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
        repairTime: "",
        warrantyCheck: false,
        imei: "",
        phoneManufacturer: "",
        phoneModel: "",
        faultCategory: "",
        faultDescription: ""
    });

    //Pass courtesy phone details from FormCourtesyPhone to Home component
    const [courtesyPhoneDetails, setCourtesyPhoneDetails] = useState({
        phoneBorrow: "none",
        chargerBorrow: "none",
    });

    const [costDetails, setCostDetails] = useState({
        bond: 0,
        serviceFee: 0,
        totalCost: 0,
        gst: 0,
        totalAndGst: 0
    });
    //Data
    const navigate = useNavigate();
    
    //Functions and Methods
    const onSubmit = async (event) => {
        event.preventDefault();
        if (submitting) return; // Prevent multiple submissions
        setSubmitting(true);

        try {
            // Build bookingData object
            const bookingData = {
                customer_type: sharedCustomerType ? "customer" : "business",
                title: customerDetails.title,
                first_name: customerDetails.firstName,
                last_name: customerDetails.lastName,
                street: customerDetails.street,
                suburb: customerDetails.suburb || null,
                city: customerDetails.city,
                postcode: customerDetails.postCode || null,
                phone_number: customerDetails.phoneNumber,
                email: customerDetails.email,
                purchase_date: repairDetails.purchaseDate,
                repair_date: new Date(
                    `${repairDetails.repairDate}T${repairDetails.repairTime}`
                ).toISOString(),
                warranty: repairDetails.warrantyCheck,
                imei: repairDetails.imei,
                make: repairDetails.phoneMake,
                model: repairDetails.phoneModel || null,
                fault_category: repairDetails.faultCategory,
                fault_description: repairDetails.faultDescription,
                phone: courtesyPhoneDetails.phoneBorrow || null,
                charger: courtesyPhoneDetails.chargerBorrow || null,
                cost_bond: costDetails.bond,
                cost_service_fee: costDetails.serviceFee,
                cost_total: costDetails.totalCost,
                cost_gst: costDetails.gst,
                cost_total_and_gst: costDetails.totalAndGst

            };
            console.log("Booking Data: ", bookingData); //logs the booking data to the console

            const { error } = await supabase.from('bookings').insert([bookingData]);
            if (error) throw error;
            alert("Booking submitted successfully!");
            navigate('/bookings');
        } catch (error) {
            alert("Error submitting booking");
            console.error("Error submitting booking:", error);
        } finally {
            setSubmitting(false);
        }
    }

    //UI Render
    return (
        <>
            <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>
                {/*Customer Detail */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                    <FormCustomerDetail passDataToParent={updateCustomerType}
                    sendCustomerDetails={setCustomerDetails} />
                </div>
                {/*Repair Detail */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5f5e3' }}>
                    <FormRepairDetail  passDataToParent={UpdateWarranty}
                     sendRepairDetails={setRepairDetails} />
                </div>
                {/*Courtesy Phone and Cost*/}
                <div className="col-12 col-lg-4 p-0 m-0">
                    {/*Courtesy Phone*/}
                    <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874a6' }}>
                        <FormCourtesyPhone passDataToParent={updateSharedState} sendCourtesyPhoneDetails={setCourtesyPhoneDetails} />
                    </div>
                    {/*Cost*/}
                    <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#edbb99' }}>
                        <FormCost sharedPropBond={sharedBond}  sharedPropWarranty={sharedWarranty} sharedPropCustomerType={sharedCustomerType} 
                        sendCostDetails={setCostDetails} />
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