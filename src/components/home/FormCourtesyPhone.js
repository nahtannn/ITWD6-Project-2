//Import
import { useState, useEffect } from 'react';

//Function Component
function FormCourtesyPhone( { passDataToParent, sendCourtesyPhoneDetails } ) {

    // "passDataToParent" is a callback function: function passDataToParent(value)
    //The callback function is to change a piece of the state that is a part of the parent component

    //Assume there is a list of courtesy items as below
    const courtesyList = [
        { id: 0, type: 'none', name: 'none', bond: 0 },
        { id: 1, type: 'phone', name: 'iPhone', bond: 275 },
        { id: 2, type: 'phone', name: 'Samsung Galaxy', bond: 100 },
        { id: 3, type: 'phone', name: 'Nokia', bond: 100 },
        { id: 4, type: 'charger', name: 'iPhone Charger', bond: 30 },
        { id: 5, type: 'charger', name: 'Samsung Charger', bond: 30 },
        { id: 6, type: 'charger', name: 'Nokia Charger', bond: 30 },
        { id: 7, type: 'phone', name: 'Xiaomi', bond: 200 },
        { id: 8, type: 'charger', name: 'Xiaomi Charger', bond: 30 },
        { id: 9, type: 'phone', name: 'OnePlus', bond: 250 },
        { id: 10, type: 'charger', name: 'OnePlus Charger', bond: 30 }
    ];

    //Declare "state"
    const [phoneBorrow, setPhoneBorrow] = useState(0); // 0 = 'none'
    const [chargerBorrow, setChargerBorrow] = useState(0); // 0 = 'none'

    const phone = courtesyList.find(item => item.id === Number(phoneBorrow));
    const charger = courtesyList.find(item => item.id === Number(chargerBorrow));

    //Hande "onChange" event
    let addPhone = (selectedOption) => {
        const phoneId = selectedOption === 'none' ? 0 : Number(selectedOption);
        setPhoneBorrow(phoneId);

        const phone = courtesyList.find(item => item.id === phoneId);
        const charger = courtesyList.find(item => item.id === Number(chargerBorrow));

        passDataToParent(phone.bond + charger.bond);

        sendCourtesyPhoneDetails({
            phoneBorrow: phone.name,
            chargerBorrow: charger.name
        });
    };
    let addCharger = (selectedOption) => {
        const chargerId = selectedOption === 'none' ? 0 : Number(selectedOption);
        setChargerBorrow(chargerId);

        const phone = courtesyList.find(item => item.id === Number(phoneBorrow));
        const charger = courtesyList.find(item => item.id === chargerId);

        passDataToParent(phone.bond + charger.bond);

        sendCourtesyPhoneDetails({
            phoneBorrow: phone.name,
            chargerBorrow: charger.name
        });
}   ;

    //Filter courtesyList into phone and charger options for dropdown
    let phoneOptions = courtesyList.filter(item => item.type === 'phone');

    let chargerOptions = courtesyList.filter(item => item.type === 'charger');
    
    useEffect(() => {
        passDataToParent(phone.bond + charger.bond);
        sendCourtesyPhoneDetails({
            phoneBorrow: phone.name,
            chargerBorrow: charger.name
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneBorrow, chargerBorrow, sendCourtesyPhoneDetails]);
    //Component UI: HTML Rendering
    return(
        <>
            {/*Courtesy Phone Section*/}
            <h2>Courtesy Phone</h2>
            {/*Phone item types*/}
            <h4 className='ms-4 mt-2'>Choose a phone</h4>
            <div className="row mt-2 ms-3 me-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type </label>
                {/*Phone selection dropdown using courtesyList data */}
                <select className="col-12 col-md-12 col-lg-7"
                 onChange={(selected) => addPhone(selected.target.value)}>
                    <option value="none" defaultValue>None</option>
                    {phoneOptions.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            {/*Charger item types*/}
            <h4 className='ms-4 mt-2'>Choose a charger</h4>
            <div className="row mt-2 ms-3 me-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type </label>
                <select className="col-12 col-md-12 col-lg-7" 
                 onChange={(selected) => addCharger(selected.target.value)}>
                    <option value="none" defaultValue>None</option>
                    {chargerOptions.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            {/*Table of added Courtesy items*/}
            <h4 className='ms-4 mt-2'>Borrow items</h4>
            <div className="row mt-2 ms-3 me-3 bg-white">
                <table className="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item</td>
                            <td>Cost</td>
                        </tr>

                        {/* Display all items in the state in the table */}
                        {phoneBorrow === 0 ? null : (
                            <tr>
                                <td>{courtesyList.filter(item => {return item.id === phoneBorrow})[0].name}</td>
                                <td>{courtesyList.filter(item => {return item.id === phoneBorrow})[0].bond}</td>
                            </tr>
                        )}
                        {chargerBorrow === 0 ? null : (
                            <tr>
                                <td>{courtesyList.filter(item => {return item.id === chargerBorrow})[0].name}</td>
                                <td>{courtesyList.filter(item => {return item.id === chargerBorrow})[0].bond}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;