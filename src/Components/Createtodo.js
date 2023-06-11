import React, { useState } from 'react';
import { db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore';

function CreateTodo(props) {
    const [Subject, setSubject] = useState("");
    async function handleSubmit (event) {
        event.preventDefault();
        if (Subject !== "") {
            await addDoc(collection(db, "todos"), {
                Subject,
                completed: false,
            });
            setSubject("");
        }
    }
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