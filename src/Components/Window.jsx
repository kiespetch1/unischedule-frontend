import React, {useEffect} from "react";
import "../index.css";
import {ReactComponent as DeleteIcon} from "../assets/delete.svg";


const Window = ({isEditing, isActive, onClick, onActiveChange, dayData, order}) => {

    const deleteRequestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let dayId = dayData.classes[order - 1].id;

    useEffect(() => {
        if (!isEditing) {
            onActiveChange(false);
        }
    }, [isEditing, onActiveChange]);

    const handleClassDelete = () => {
        fetch("https://localhost:7184/api/classes/" + dayId, deleteRequestOptions)
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                }
            )
            .catch(error => {
                console.log("Ошибка при отправке данных: " + error);
            });
    }

    return (
    <div className="day-block" onClick={!isActive ? onClick : null}
         style={isEditing ? isActive ? {backgroundColor: "#E9E9E9"} : {cursor: "pointer"}
             : isActive ? {backgroundColor: "#E9E9E9"} : null}>
        <div className="empty-text">
            Окно
        </div>

        {isActive ?
            <div className="delete-button" onClick={handleClassDelete}>
                <DeleteIcon/>
            </div> : null}

    </div>)
}

export default Window;
