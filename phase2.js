const axios = require('axios');

// Candidate ID provided by Crossmint
const candidateId = "0a4a5c62-18e8-493d-bec5-146109476b70";

// Base URL for the API
const baseUrl = "https://challenge.crossmint.io/api";

// Function to fetch the goal map
async function fetchGoalMap() {
  try {
    const response = await axios.get(`${baseUrl}/map/${candidateId}/goal`);
    return response.data;
  } catch (error) {
    console.error("Error fetching goal map:", error.response ? error.response.data : error.message);
  }
}

// Function to create a Polyanet at a given position
async function createPolyanet(row, column) {
  try {
    await axios.post(`${baseUrl}/polyanets`, { candidateId, row, column });
    console.log(`Polyanet created at (${row}, ${column})`);
  } catch (error) {
    console.error(`Error creating Polyanet at (${row}, ${column}):`, error.response ? error.response.data : error.message);
  }
}

// Function to create a Soloon at a given position with a specific color
async function createSoloon(row, column, color) {
  try {
    await axios.post(`${baseUrl}/soloons`, { candidateId, row, column, color });
    console.log(`Soloon created at (${row}, ${column}) with color ${color}`);
  } catch (error) {
    console.error(`Error creating Soloon at (${row}, ${column}):`, error.response ? error.response.data : error.message);
  }
}

// Function to create a Cometh at a given position with a specific direction
async function createCometh(row, column, direction) {
  try {
    await axios.post(`${baseUrl}/comeths`, { candidateId, row, column, direction });
    console.log(`Cometh created at (${row}, ${column}) facing ${direction}`);
  } catch (error) {
    console.error(`Error creating Cometh at (${row}, ${column}):`, error.response ? error.response.data : error.message);
  }
}

// Function to add a delay between processing tasks within each row
async function processWithDelay(tasks, delay = 250) {
    for (const task of tasks) {
      await task();
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

// Main function to build the megaverse
async function buildMegaverse() {
  const goalMap = await fetchGoalMap();

  const goals = goalMap?.goal

  if (!goals ) {
    console.error("Failed to retrieve goals.");
    return;
  }

    //   console.log('goals', goals)

  // Sequentially process each row to avoid rate-limiting issues
  for (const [rowIndex, row] of goals.entries()) {
    const tasks = row.map((cell, columnIndex) => async () => {
      if (cell === "POLYANET") {
        await createPolyanet(rowIndex, columnIndex);
      } else if (cell.includes("SOLOON")) {
        const color = cell.split("_")[0].toLowerCase();
        await createSoloon(rowIndex, columnIndex, color);
      } else if (cell.includes("COMETH")) {
        const direction = cell.split("_")[0].toLowerCase();
        await createCometh(rowIndex, columnIndex, direction);
      }
    });

    // Process each cell in the row with a delay between each request
    await processWithDelay(tasks);
  }
}

// Run the main function to build the megaverse
buildMegaverse();
