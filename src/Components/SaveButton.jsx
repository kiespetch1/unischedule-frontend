import React from 'react';

const SaveButton = ({isEditing, saveButtonPosition, onSave}) => {
    if (!isEditing) {
        return null;
    }

    return (
        <div className="day-save-button"
             style={{
                 top: `${saveButtonPosition.top}px`,
                 left: `${saveButtonPosition.left}px`
             }}
             onClick={onSave}>
            Сохранить
        </div>
    );
};

export default SaveButton;
