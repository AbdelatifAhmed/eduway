import React from 'react';
import useFetchTimetable from './fetchTimetable';
import { Table } from 'react-bootstrap';

const Timetable = () => {
    const { timetable, loading, error } = useFetchTimetable();

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    if (loading) return <div className='pad'><p>Loading...</p></div>;
    if (error) return <div className='pad'><p>Error: {error.message}</p></div>;

    const getHourIndex = (time) => {
        const [hour, minute] = time.split(':');
        return parseInt(hour) - 8;
    };

    const generateTimetable = () => {
        const timetableMatrix = Array.from({ length: 13 }, () => Array(7).fill(null));

        timetable?.getSchedulesForStaffByUserIdDetails?.forEach((slot) => {
            const [startTime, endTime] = slot.timing.split(' - ');
            const startIndex = getHourIndex(startTime);
            const endIndex = getHourIndex(endTime);
            const span = endIndex - startIndex;

            if (startIndex >= 0 && startIndex < 13 && endIndex > startIndex && endIndex <= 13) {
                timetableMatrix[startIndex][slot.scheduleDay - 1] = {
                    slot,
                    span,
                    isMain: true,
                };

                for (let i = startIndex + 1; i < endIndex; i++) {
                    if (i < 13) {
                        timetableMatrix[i][slot.scheduleDay - 1] = {
                            isMain: false,
                        };
                    }
                }
            }
        });

        return timetableMatrix;
    };

    const timetableMatrix = generateTimetable();

    function convertTo12HourFormat(timeRange) {
        // Split the time range into start and end times
        const [startTime, endTime] = timeRange.split(' - ');
    
        // Helper function to convert a single time from 24-hour to 12-hour format
        const convertTo12Hour = (time) => {
            const [hour, minute] = time.split(':');
            let period = 'AM';
            let hour12 = parseInt(hour);
    
            if (hour12 >= 12) {
                period = 'PM';
                if (hour12 > 12) {
                    hour12 -= 12;
                }
            }
    
            if (hour12 === 0) {
                hour12 = 12; // 0 hour (midnight) should be 12 AM in 12-hour format
            }
    
            return `${hour12}:${minute} ${period}`;
        };
    
        // Convert both start and end times
        const start12Hour = convertTo12Hour(startTime);
        const end12Hour = convertTo12Hour(endTime);
    
        // Return the formatted time range
        return `${start12Hour} - ${end12Hour}`;
    }

    return (
        <div className='pad'>
            <h2>Timetable</h2>
            <header className='d-flex justify-content-between fw-bold'
                style={{ background: '#121431', color: 'white', padding: "20px", borderRadius: "10px" }}>
                <div className='item'>Name: <span>{timetable?.nameEnglish}</span></div>
                <div className='item'>Faculty: <span>{timetable?.facultysName}</span></div>
                <div className='item'>Academic Year: <span>{timetable?.academyYearName}</span></div>
            </header>
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
                                            <td key={day} title={convertTo12HourFormat(slot?.timing)} rowSpan={span} style={{ background: slot.scheduleType === 1 ? '#FFD700' : '#ADFF2F', padding: '10px', borderRadius: '5px', marginBottom: '5px' }}>
                                                <p>{slot.coursesName}</p>
                                                <p>{slot.coursesCode}</p>
                                                <p>{slot.schedulePlacesName}</p>
                                                <p>{slot.scientificDegreesName}</p>
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
    );
};

export default Timetable;
