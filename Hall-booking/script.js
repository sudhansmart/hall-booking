const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3500;
app.use(bodyParser.json());

let Bookingid = 0; // Initialize Bookingid variable
const currentTime =new Date()
const date = currentTime.getDate().toString();
const month = (currentTime.getMonth()+1).toString();
const year = currentTime.getFullYear().toString();
const hour = currentTime.getHours().toString();
const mins = currentTime.getMinutes().toString();

const bookingdate = `${date}-${month}-${year}`
const time =`${hour}:${mins}`
// Stored datas in local variables
const CustomerData = []; // Initialize CustomerData array

const BookingData = []; // Initialize BookingData  array


const TimesOfBooked = []; // Initialize TimesOfBooked array

// Method to Get Room details
app.get('/getroom', (req, res) => {
  res.json(BookingData);
});
// Method to Get Customer details
app.get('/getcust', (req, res) => {
  res.json(CustomerData);
});
// Method to Get Times of Booking
app.get('/gettimes', (req, res) => {
  res.json(TimesOfBooked);
});
// Method to Get input values
app.post('/senddata', (req, res) => {
  const newdata = req.body;

  // Increment Bookingid for the next booking
  Bookingid++;

  // Update CustomerData with Bookingid, CustomerName, date, Start_time, and End_time
  const customerEntry = {
    Bookingid: Bookingid,
    CustomerName: newdata.CustomerName,
    date: newdata.date,
    Start_time: newdata.Start_time,
    End_time: newdata.End_time
  };
  CustomerData.push(customerEntry);

  // Update BookingData with received data
  BookingData.push(newdata);

  // Count the bookings of the same customer name
  const customerBookingsCount = BookingData.filter(booking => booking.CustomerName === newdata.CustomerName).length;

  // Create TimesOfBooked entry with the specified properties
  const timesOfBookedEntry = {
    Times_of_Booked: customerBookingsCount,
    CustomerName: newdata.CustomerName,
    RoomName: newdata.RoomName,
    date: newdata.date,
    Start_time: newdata.Start_time,
    End_time: newdata.End_time,
    Bookingid: Bookingid,
    BookingDate: bookingdate,
    BookedStatus: newdata.BookedStatus
  };

  TimesOfBooked.push(timesOfBookedEntry);

  res.status(201).send("Data Saved Successfully");
});

app.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
});
