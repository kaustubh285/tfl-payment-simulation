// src/app.ts

import express from "express";
import simulationEngine from "./simulationEngine";
import config from "./utils/config";
import apiRoutes from "./api";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

config.init(); // Creates the user_events and the zero-value transaction table
// simulationEngine.run();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// GATEKEEPER
// WAYPOINTER
// FARECOLLECTOR
// Matrix

// future scope - Path finder, find cheapest way to travel etc
