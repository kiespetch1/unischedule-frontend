const SaveButton = ({isEditing, saveButtonPosition, onSave}) => {
    if (!isEditing) {
        return null;
    }

    return (
        <button className="day-save-button"
             style={{
                 top: `${saveButtonPosition.top}px`,
                 left: `${saveButtonPosition.left}px`
             }}
             onClick={onSave}>
            Сохранить
        </button>
    );
};

export default SaveButton;
