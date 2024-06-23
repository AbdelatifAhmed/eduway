// src/components/StudentTimetable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const StudentTimetable = ({ timetable }) => {
    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    const getHourIndex = (time) => {
        const [hour, minute] = time.split(':');
        return parseInt(hour) - 8;
    };
    const generateTimetable = () => {
        const timetableMatrix = Array.from({ length: 13 }, () => Array(7).fill(null));

        timetable?.timetable?.forEach((slot) => {
            const [startTime, endTime] = slot.timing.split(' - ');
            const startIndex = getHourIndex(startTime);
            const endIndex = getHourIndex(endTime);
            const span = endIndex - startIndex;

            timetableMatrix[startIndex][slot.scheduleDay - 1] = {
                slot,
                span,
                isMain: true,
            };

            for (let i = startIndex + 1; i < endIndex; i++) {
                timetableMatrix[i][slot.scheduleDay - 1] = {
                    isMain: false,
                };
            }
        });

        return timetableMatrix;
    };

    const timetableMatrix = generateTimetable();

    return (
        <div className='pad'>
            <h2>Student Timetable</h2>
            <div className='table-content'>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Time</th>
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, hourIndex) => (
                        <tr key={hour}>
                            <td>{hour}</td>
                            {days.map((day, dayIndex) => {
                                const cellData = timetableMatrix[hourIndex][dayIndex];

                                if (cellData) {
                                    if (cellData.isMain) {
                                        const { slot, span } = cellData;
                                        return (
                                            <td key={day} rowSpan={span} style={{ background: slot.scheduleType === 1 ? '#FFD700' : '#ADFF2F', padding: '10px', borderRadius: '5px', marginBottom: '5px' }}>
                                                <p>{slot.coursesName}</p>
                                                <p>{slot.coursesCode}</p>
                                                <p>{slot.schedulePlacesName}</p>
                                                <p>{slot.nameDoctor}</p>
                                                <p>{slot.scheduleType === 1 ? 'Lecture' : 'Session'}</p>
                                            </td>
                                        );
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return <td key={dayIndex}></td>;
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
};

export default StudentTimetable;
