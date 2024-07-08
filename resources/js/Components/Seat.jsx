import React, { useState } from 'react';
import SeatImage from './SeatImages'; // Assuming correct import path

const SeatSelector = ({ onSeatSelect }) => {
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedRow, setSelectedRow] = useState('');

    const sections = ['A', 'B', 'C', 'D'];
    const rows = [1, 2, 3];

    const handleSectionChange = (e) => {
        const section = e.target.value;
        setSelectedSection(section);
        setSelectedRow('');
        onSeatSelect(section, ''); // Call onSeatSelect with section and empty row
    };

    const handleRowChange = (e) => {
        const row = e.target.value;
        setSelectedRow(row);
        onSeatSelect(selectedSection, row); // Call onSeatSelect with selectedSection and row
    };

    return (
        <div>
            <div>
                <label htmlFor="section">Section:</label>
                <select
                    id="section"
                    value={selectedSection}
                    onChange={handleSectionChange}
                >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                    ))}
                </select>
            </div>
            {selectedSection && (
                <div>
                    <label htmlFor="row">Row:</label>
                    <select
                        id="row"
                        value={selectedRow}
                        onChange={handleRowChange}
                    >
                        <option value="">Select Row</option>
                        {rows.map(row => (
                            <option key={row} value={row}>Row {row}</option>
                        ))}
                    </select>
                </div>
            )}
            {selectedSection && selectedRow && (
                <SeatImage section={selectedSection} row={selectedRow} />
            )}
        </div>
    );
};

export default SeatSelector;
