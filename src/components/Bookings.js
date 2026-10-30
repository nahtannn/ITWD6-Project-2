//Import
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';


//Function Component
function Bookings() {

    //States
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    // Use useEffect to fetch bookings on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    //Component UI
    return (
        <>
            <div className="row" style={{ minHeight: "60vh" }}>

            
            {/*Booking form */}

            {/*Retrieve data from bookings table on supabase */}
            <hr />
            <h2 style={{ margin: "10px" }}>Bookings</h2>
            {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : (
                bookings.map((booking) => (
                <div key={booking.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card" style={{ border: "1px solid gray", backgroundColor: "#bdddff", padding: "0px", margin: "10px", borderRadius: "5px" }}>    
                        <div className="card-header">
                            <h4 className="card-title">{"Booking #" + booking.id}</h4>
                        </div>
                        <div className="card-body">
                            <p className="card-text mb-1"><i>{"Invoice Date: " + new Date(booking.created_at).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short"
                            })}</i></p>
                            <h5 className="card-title">Customer Details</h5>
                            <p className="card-text mb-1">{booking.title + " " + booking.first_name + " " + booking.last_name}
                                <br />
                                {booking.phone_number + " • " + booking.email}
                                <br />
                                {booking.street + ", " + (booking.suburb ? booking.suburb + ", " : "") + booking.city + " " + (booking.postcode ? booking.postcode : "")}
                            </p>

                        </div>
                        <hr />
                        <div className="card-body">
                            <h5 className="card-title">Booking Details</h5>
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
                            </p>
                            
                        </div>
                        <hr />
                        <div className="card-body">
                            <h5 className="card-title">Courtesy Items</h5>
                            <p className="card-text"></p>
                            
                        </div>
                        <hr />
                        <div className="card-body">
                            <h5 className="card-title">Payment Details</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            
                        </div>
                        <hr />
                        <div className="card-body">
                            <p className="card-title"><strong>Fixit Repairs Ltd</strong></p>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
                ))
                )
            }
            </div>
        </>
    );
}

                    //<p>{booking.title + ": " + booking.first_name + " " + booking.last_name}</p>
                    //<p>{"Bond: " + booking.cost_bond}</p>
                    //<p>{"Service fee: " + booking.cost_service_fee}</p>
                    //<p>{"Total: " + booking.cost_total}</p>
                    //<p>{"GST: " + booking.cost_gst}</p>
                    //<p>{"Total and GST: " + booking.cost_total_and_gst}</p>
//Export
export default Bookings;