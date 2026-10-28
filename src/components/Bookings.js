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
            {/*Booking form */}

            {/*Retrieve data from bookings table on supabase */}
            <hr />
            <h3>Bookings</h3>
            {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : (
                bookings.map((booking) => (
                    <div key={booking.id}
                        style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                    <p>{booking.title + ": " + booking.first_name + " " + booking.last_name}</p>
                    <p>{"Bond: " + booking.bond}</p>
                    <p>{"Service fee: " + booking.service}</p>
                </div>
            ))
            )
        }
        </>
    );
}
//Export
export default Bookings;