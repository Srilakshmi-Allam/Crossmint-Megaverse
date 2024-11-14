const axios = require("axios");

// candidate ID
const candidateId = "0a4a5c62-18e8-493d-bec5-146109476b70";

// API endpoint
const url = "https://challenge.crossmint.io/api/polyanets";

// Function to create a Polyanet at a given position
async function createPolyanet(row, column) {
  try {
    // Define the request data
    const data = {
      candidateId: candidateId,
      row: row,
      column: column,
    };

    // Send POST request to create the Polyanet
    const response = await axios.post(url, data);

    // Check if the request was successful
    if (response.status === 200) {
      console.log(`Polyanet created at row ${row}, column ${column}`);
    }
  } catch (error) {
    // Logging errors
    console.error(
      "Failed to create Polyanet:",
      error.response ? error.response.data : error.message
    );
  }
}

createPolyanet(2, 2);
createPolyanet(3, 3);
createPolyanet(4, 4);
createPolyanet(5, 5);
createPolyanet(6, 6);
createPolyanet(7, 7);
createPolyanet(8, 8);

createPolyanet(2, 8);
createPolyanet(3, 7);
createPolyanet(4, 6);
createPolyanet(5, 5);
createPolyanet(6, 4);
createPolyanet(7, 3);
createPolyanet(8, 2);
