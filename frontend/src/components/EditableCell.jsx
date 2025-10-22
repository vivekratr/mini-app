
import React, { useState, useEffect, useRef } from 'react';
import { usePricelistStore } from '../stores/priceListStores.js';
import "../styles/EditableCell.css";

const EditableCell = ({
    productId,
    field,
    value,
    type = 'text',
    className = ''
}) => {
    const {
        editingCell,
        savingCell,
        startEditingCell,
        stopEditingCell,
        updateProductField,
        saveProductField,
    } = usePricelistStore();

    const [localValue, setLocalValue] = useState(value);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const isEditing = editingCell?.productId === productId && editingCell?.field === field;
    const isSaving = savingCell?.productId === productId && savingCell?.field === field;

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleClick = () => {
        if (!isEditing) {
            startEditingCell(productId, field);
        }
    };

    const handleChange = (e) => {
        setLocalValue(e.target.value);
        setError(null);
    };

    const handleBlur = async () => {
        if (localValue === value) {
            stopEditingCell();
            return;
        }

        if (type === 'number' && isNaN(parseFloat(localValue))) {
            setError('Invalid number');
            setLocalValue(value);
            stopEditingCell();
            return;
        }

        try {
            updateProductField(productId, field, localValue);

            await saveProductField(productId, field, localValue);
        } catch (err) {
            setError('Failed to save');
            console.error('Save error:', err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            setLocalValue(value);
            stopEditingCell();
        }
    };

    if (isEditing) {
        return (
            <div className={`editable-cell editing ${className}`}>
                <input
                    ref={inputRef}
                    type={type === 'number' ? 'number' : 'text'}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="editable-input"
                    step={type === 'number' ? '0.01' : undefined}
                />
                {error && <span className="cell-error">{error}</span>}
            </div>
        );
    }

    return (
        <div
            className={`editable-cell ${isSaving ? 'saving' : ''} ${className}`}
            onClick={handleClick}
            title="Click to edit"
        >
            <span className="cell-value">
                {isSaving ? (
                    <>
                        {value}
                    </>
                ) : (
                    value || '-'
                )}
            </span>
        </div>
    );
};

export default EditableCell;