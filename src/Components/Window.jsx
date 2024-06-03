import React, {useEffect} from "react";
import "../index.css";
import {ReactComponent as DeleteIcon} from "../assets/delete.svg";


const Window = ({isEditing, isActive, onClick, onActiveChange, dayData, order}) => {

    const deleteRequestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    let dayId = order != null ? dayData.classes[order - 1].id : null; //todo тут наверное неправильно и нужно сделать как в class

    useEffect(() => {
        if (!isEditing) {
            onActiveChange(false);
        }
    }, [isEditing, onActiveChange]);

    const handleClassDelete = () => {
        //todo добавить удаление для не отправленных на сервер пар
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
            <button className="delete-button" onClick={handleClassDelete}>
                <DeleteIcon/>
            </button> : null}

    </div>)
}

export default Window;
