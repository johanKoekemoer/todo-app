// Import the useState hook and Firebase functions
import React, { useState } from 'react';
import { db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore';

// CreateTodo functional component
function CreateTodo() {

    // Declare state variables
    const [Subject, setSubject] = useState("");

    // HandleSubmit function that adds a new todo when `add-todo` is clicked, then clears the input field
    async function handleSubmit (event) {
        event.preventDefault(); // Prevents the default page refresh caused by the submit event
        if (Subject !== "") { // Function only continues if Subject is not empty
            await addDoc(collection(db, "todos"), {
                Subject,
                completed: false,
            });
            setSubject("");
        }
    }

    // JSX structure for CreateTodo
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <input 
                    className = "input"
                    type="text"
                    placeholder='Enter Todo here...'
                    value={Subject}
                    onChange={(event) => setSubject(event.target.value)}
                />
            </div>
            <div className="btn-container">
                <button className="add-btn">Add-Todo</button>
            </div>
        </form>
    );
}
export default CreateTodo