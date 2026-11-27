import { useState } from "react"

function SpaceBookingPage() {
    const [space, setSpace] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    return (
        <div>
            <h1>Space Booking</h1>

            <form>
                <div>
                    <label>Space</label>
                    <select value={space} onChange={(event) => setSpace(event.target.value)}>
                        <option value="">Select a space</option>
                        <option value="study room">Study Room</option>
                        <option value="meeting room">Meeting Room</option>
                        <option value="computer lab">Computer Lab</option>
                    </select>
                </div>

                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div>
                    <label>Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                    />
                </div>

                <div>
                    <label>End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                    />
                </div>

                <button type="submit">Book Space</button>
            </form>
        </div>
    )
}

export default SpaceBookingPage