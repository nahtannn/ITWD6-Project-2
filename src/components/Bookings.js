//Import
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';


//Function Component
function Bookings() {

    //States
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //Filtering States
    const [enteredKeywords, setEnteredKeywords] = useState('');
    const [warrantyFilter, setWarrantyFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sort, setSort] = useState('');

    //Fetch bookings from Supabase
    const fetchBookings = async () => {
        try {
            //Set loading state
            setLoading(true);
            //Fetch data from Supabase
            const { data, error } = await supabase.from('bookings').select('*');
            console.log('Fetched bookings:', data);
            //Handle error
            if (error) throw error;
            //update state with fetched data
            setBookings(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };
    
    //Filter bookings based on entered keywords
    const filteredBookings = bookings.filter((booking) => {
        //Combines the different fields into a string that can be searched
        const searchable = [
            booking.id,
            booking.title,
            booking.first_name,
            booking.last_name,
            booking.email,
            booking.phone_number,
            booking.street,
            booking.suburb,
            booking.city,
            booking.postcode,
            booking.make,
            booking.model,
            booking.imei,
            booking.fault_category,
            booking.fault_description
        ].join(' ').toLowerCase();

        const matchesKeywords = searchable.includes(enteredKeywords.toLowerCase());
        // Apply filter
        const matchesWarranty =
            warrantyFilter === '' ||
            (warrantyFilter === 'True'  && booking.warranty === true) ||
            (warrantyFilter === 'False' && booking.warranty === false);
        const matchesType =
            typeFilter === '' ||
            booking.customer_type?.toLowerCase() === typeFilter.toLowerCase();

        return matchesKeywords && matchesWarranty && matchesType;
    })
    .sort((a, b) => {
        switch (sort) {
            case 'repairDateAsc':     return new Date(a.repair_date) - new Date(b.repair_date);
            case 'repairDateDesc':    return new Date(b.repair_date) - new Date(a.repair_date);
            case 'customerNameAsc':   return (a.first_name || '').localeCompare(b.first_name || '');
            case 'customerNameDesc':  return (b.first_name || '').localeCompare(a.first_name || '');
            case 'repairCostAsc':     return a.cost_total_and_gst - b.cost_total_and_gst;
            case 'repairCostDesc':    return b.cost_total_and_gst - a.cost_total_and_gst;
            case 'bookingDesc':       return b.id - a.id;
            default:                  return a.id - b.id;
        }
    });
    // Use useEffect to fetch bookings on component mount
    useEffect(() => {
        fetchBookings();
    }, []);


    //Component UI
    return (
        <>
            <div className="container-fluid" style={{ minHeight: "60vh", padding: "4rem" }}>

                {/*Retrieve data from bookings table on supabase */}
                <hr />
                <h1 style={{ textAlign: "center", margin: "20px 0" }}><u>Bookings</u></h1>

                {/*Search, Filter, and Sort */}

                <div className="row" style={{ border: "1px solid gray", borderRadius: "5px", padding: "10px", margin: "10px" }}>
                    {/*Search*/}
                    <input className="col-12 col-md-5 m-2"
                        type="text" 
                        value={enteredKeywords}
                        onChange={(e) => setEnteredKeywords(e.target.value)} 
                        placeholder="Search bookings" 
                    />
                    {/*Filter*/}
                    <select className="col-12 col-md-2 m-2" 
                        value={warrantyFilter}
                        onChange={(e) => setWarrantyFilter(e.target.value)}>
                        {/* Filter options */}
                        <option value="">All</option>
                        <option value="True">Under Warranty</option>
                        <option value="False">Out of Warranty</option>
                    </select>

                    <select className="col-12 col-md-2 m-2" 
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}>
                        {/* Filter options */}
                        <option value="">All</option>
                        <option value="Customer">Customer</option>
                        <option value="Business">Business</option>
                    </select>

                    {/*Sort */}
                    <select className="col-12 col-md-2 m-2" 
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}>
                        {/* Sort options */}
                        <option value="">Sort By BookingID (asc)</option>
                        <option value="bookingDesc">Sort By BookingID (desc)</option>
                        <option value="repairDateAsc">Sort By Repair Date (asc)</option>
                        <option value="repairDateDesc">Sort By Repair Date (desc)</option>
                        <option value="customerNameAsc">Sort By Customer Name (A-Z)</option>
                        <option value="customerNameDesc">Sort By Customer Name (Z-A)</option>
                        <option value="repairCostAsc">Sort By Repair Cost (asc)</option>
                        <option value="repairCostDesc">Sort By Repair Cost (desc)</option>
                    </select>
                </div>

                <div className="row">
                    {/*Booking form */}
                    {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : (
                        filteredBookings.length === 0 ? (<p>No bookings found.</p>) :
                        filteredBookings.map((booking) => (
                        <div key={booking.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card" style={{ border: "1px solid gray", backgroundColor: "#bdddff", padding: "0px", margin: "10px", borderRadius: "5px"}}>    
                                {/*Booking header section*/}
                                <div className="card-header">
                                    <h4 className="card-title">{"Booking #" + booking.id}</h4>
                                </div>
                                {/*Customer details section*/}
                                <div className="card-body">
                                    <h5 className="card-title"><u>Customer Details</u></h5>
                                    {/*Display customer name, type, and contact information*/}
                                    <p className="card-text mb-1">{booking.title + " " + booking.first_name + " " + booking.last_name + " • Type: " + booking.customer_type}
                                        <br />
                                        {booking.phone_number + " • " + booking.email}
                                        <br />
                                        {booking.street + ", " + (booking.suburb ? booking.suburb + ", " : "") + booking.city + " " + (booking.postcode ? booking.postcode : "")}
                                    </p>

                                </div>
                                <hr style={{ margin: "0" }}/>
                                {/*Booking details section*/}
                                <div className="card-body" style={{ minHeight: "250px" }}>
                                    <h5 className="card-title"><u>Booking Details</u></h5>
                                    {/*Display repair date, phone, IMEI, fault, and warranty status*/}
                                    <p className="card-text"><strong>Repair Date: </strong>{new Date(booking.repair_date).toLocaleString(undefined, {
                                        dateStyle: "medium",
                                        timeStyle: "short"
                                    })}
                                        <br />
                                        <strong>Phone: </strong>{booking.make + " " + booking.model + " | Purchased on: " + booking.purchase_date}
                                        {/*Is the item under warranty? */}
                                        <br />
                                        <strong>IMEI: </strong>{booking.imei}
                                        <br />
                                        <strong>Fault: </strong>{booking.fault_category}
                                        <br />
                                        <i>{booking.fault_description}</i>
                                        <br />
                                        <strong>Warranty Status: </strong>{booking.warranty ? "Under Warranty" : "No Warranty"}
                                        {/*Display uploaded image if available */}
                                        {booking.image_url && (
                                            <div>
                                                <img src={booking.image_url} alt="Fault" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                            </div>
                                        )}
                                    </p>
                                    
                                </div>
                                <hr style={{ margin: "0" }}/>
                                {/*Courtesy items section*/}
                                <div className="card-body">
                                    <h5 className="card-title"><u>Courtesy Items</u></h5>
                                    <p className="card-text"><strong>Phone: </strong>{booking.phone}
                                        <br />
                                        <strong>Charger: </strong>{booking.charger}
                                    </p>
                                    
                                </div>
                                <hr style={{ margin: "0" }}/>
                                {/*Payment details section*/}
                                <div className="card-body">
                                    <h5 className="card-title"><u>Payment Details</u></h5>
                                    <p className="card-text"><strong>Bond: </strong>{"$" + booking.cost_bond.toFixed(2)}
                                        <br />
                                        <strong>Service Fee: </strong>{"$" + booking.cost_service_fee.toFixed(2)}
                                        <br />
                                        <strong>Total: </strong>{"$" + booking.cost_total.toFixed(2)}
                                        <br />
                                        <strong>GST: </strong>{"$" + booking.cost_gst.toFixed(2)}
                                        <br />
                                        <strong>Total and GST: </strong>{"$" + booking.cost_total_and_gst.toFixed(2)}
                                    </p>
                                    
                                </div>
                                <hr style={{ margin: "0" }}/>
                                {/*Company details section*/}
                                <div className="card-body">
                                    <p className="card-title mb-0"><strong>Nathan's Phone Repairs Ltd</strong></p>
                                    <p className="card-text" style={{ fontSize: "0.8rem", color: "#696969" }}><i>501 Gloucester Street, Napier 4112
                                        <br />
                                        021 741 2391 • contact@nathansphonerepairs.co.nz
                                        <br />
                                        Open Mon-Fri 9am - 5pm
                                    </i></p>
                                    <hr style={{ margin: "0" }}/>
                                    <p className="card-text mb-1" style={{ fontSize: "0.8rem" }}><i>{"Invoice Date: " + new Date(booking.created_at).toLocaleString(undefined, {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                        hour12: false
                                    })}</i></p>
                                </div>
                            </div>
                        </div>
                        ))
                    )
                }
                </div>
            </div>
        </>
    );
}

//Export
export default Bookings;