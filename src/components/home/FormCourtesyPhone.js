//Import
import { useState, useEffect } from 'react';

//Function Component
function FormCourtesyPhone( { passDataToParent, sendCourtesyPhoneDetails } ) {

    // "passDataToParent" is a callback function: function passDataToParent(value)
    //The callback function is to change a piece of the state that is a part of the parent component

    //Assume there is a list of courtesy items as below
    const leftList = [
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

    const rightList = [];

    //Declare "state"
    const [leftItems, setLeftItems] = useState(leftList);
    const [rightItems, setRightItems] = useState(rightList);
    const [totalBond, setTotalBond] = useState(0);

    //Sending the selected phone and charger details to the parent component
    useEffect(() => {
        const phone = rightItems.find(item => item.type === 'phone');
        const charger = rightItems.find(item => item.type === 'charger');

        passDataToParent(totalBond);
        sendCourtesyPhoneDetails({
            phoneBorrow: phone ? phone.name : 'none',
            chargerBorrow: charger ? charger.name : 'none'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rightItems, totalBond, sendCourtesyPhoneDetails]);

    //Handle drag and drop events
    //Handle drag start event
    const handleDragStart = (e, item, source) => {
        e.dataTransfer.setData("application/json", JSON.stringify({ item, source }));
    };

    //Handle drop event
    const handleDrop = (e, target) => {
        //Prevent default behavior
        e.preventDefault();

        //Get the dragged item and its source from the dataTransfer object
        const { item, source } = JSON.parse(e.dataTransfer.getData("application/json"));

        //Prevent dropping into the same zone
        if (source === target) return;

        //Move the item from the source list to the target zone
        if (source === "left") {
            //Only allow one item per type in the right zone
            const existingItem = rightItems.find((i) => i.type === item.type);
            if (existingItem) {alert("You can only select one unit per item."); return};
            // Remove item from leftItems and add to rightItems
            setLeftItems((prev) => prev.filter((i) => i.id !== item.id));
            // Add item to rightItems
            setRightItems((prev) => [...prev, item]);
            // Update total bond
            setTotalBond((prev) => prev + item.bond);
        } else {
            // Remove item from rightItems and add to leftItems
            setRightItems((prev) => prev.filter((i) => i.id !== item.id));
            // Add item to leftItems
            setLeftItems((prev) => [...prev, item]);
            // Update total bond
            setTotalBond((prev) => prev - item.bond);
        }
    };

    //Handle drag over event
    const allowDrop = (e) => {
        //Prevent default behavior to allow drop
        e.preventDefault();
    };

    //Styles for container
    const styles = {
        dragDropContainer: {
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            padding: "0"
        }
    };


    //Component UI: HTML Rendering
    return(
        <>
            <div>
                {/*Courtesy Phone Section*/}
                <h2>Courtesy Phone</h2>
                {/*Phone item types*/}
                <h4 className='mt-2'>Choose a Phone and Charger</h4>
            </div>

            <div style={styles.dragDropContainer}>
                {/*Drop Zones Left*/}
                <DropZone
                    title="Available Items"
                    items={leftItems}
                    zone="left"
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                    onDragStart={handleDragStart}
                />
                {/*Drop Zones Right*/}
                <DropZone
                    title="Selected Items"
                    items={rightItems}
                    zone="right"
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                    onDragStart={handleDragStart}
                />
            </div>
        </>
    );
}

//DropZone Component
function DropZone( {title, items, zone, onDrop, onDragOver, onDragStart} ) {
    //styles for the drop zone and items
    const styles = {
        dropZone: {
            flex: 1,
            minHeight: "70px",
            border: "1px solid #888",
            borderRadius: "8px",
            padding: "8px",
            background: "#f8f9fa",
        },
        item: {
            padding: "10px",
            marginBottom: "8px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "grab",
        }
    }
    //Component UI: HTML Rendering
    return (
    <div style={styles.dropZone} onDrop={(e) => onDrop(e, zone)} onDragOver={onDragOver} >
        <h3>{title}</h3>
        {items.map((item) => (
            <div key={item.id} draggable onDragStart={(e) => onDragStart(e, item, zone)} style={styles.item}
> 
                {item.name} - ${item.bond}
            </div> ) )
        }
        </div>
    );
};
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;