import React, { useState } from 'react';
import SeatImage from './SeatImages'; // Assuming correct import path
import InputLabel from './InputLabel';

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
        <div className='grid grid-cols-2 gap-4'>
                <div className='mb-4'>
                <InputLabel htmlFor="section_input" value="Select Section" />
                    <select
                        id="section"
                        value={selectedSection}
                        onChange={handleSectionChange}
                        className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                    >
                        {sections.map(section => (
                            <option key={section} value={section}>Section {section}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                <InputLabel htmlFor="row_input" value="Select Row" />
                    <select
                        id="row"
                        value={selectedRow}
                        onChange={handleRowChange}
                        className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                    >
                        {rows.map(row => (
                            <option key={row} value={row}>Row {row}</option>
                        ))}
                    </select>
                </div>
            {/* {selectedSection && (
            )} */}
            {selectedSection && selectedRow && (
                <div className='col-span-2'>
                    <SeatImage section={selectedSection} row={selectedRow} />
                </div>
            )}
        </div>
    );
};

export default SeatSelector;
