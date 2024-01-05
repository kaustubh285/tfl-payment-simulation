# TFL Payment System Simulation

This project simulates the payment system design for Transport for London (TFL). It includes the implementation of a gatekeeping mechanism and a waypointer to manage user entries and exits in the transportation system. The simulation is built using TypeScript and PostgreSQL for database storage.

## Project Structure

### `src/controllers/Gatekeeper.ts`

This file contains the logic for handling user entries and exits. It interacts with the database to record user events and zero-value transactions.

### `src/controllers/Waypointer.ts`

The Waypointer file processes zero-value transactions to generate journey entries. It utilizes helper functions to group transaction data by user and create a chronological list of journey entries.

### `src/utils/config.ts`

This module initializes the database tables (`user_event` and `zero_value_transactions`) if they do not exist. It is invoked in the main application (`app.ts`).

### `src/utils/db.ts`

This file establishes a connection to the PostgreSQL database using the `pg` library. It exports a query function for executing SQL queries.

### `src/app.ts`

The main entry point of the application. It initializes the database tables and runs the simulation engine.

### `src/simulationEngine.ts`

This module simulates user events, such as entry and exit, throughout the day. It utilizes the gatekeeper to record events in the database. The `waypointer` function is called at the end of the simulation day to generate journey entries.

## Usage

1. Install dependencies: `npm install`
2. Run the simulation: `npm start`

## Database Tables

### `user_event`

- `event_id`: Primary key
- `user_id`: User identifier
- `card_id`: Card identifier
- `location`: Location of the event
- `zone`: Zone number
- `date`: Date of the event
- `created_at`: Timestamp of record creation

### `zero_value_transactions`

- `transaction_id`: Primary key
- `user_id`: User identifier
- `card_id`: Card identifier
- `transaction_type`: Type of transaction (entry/exit)
- `location`: Location of the transaction
- `zone`: Zone number
- `date`: Date of the transaction
- `event_id`: Foreign key referencing `user_event.event_id`
- `created_at`: Timestamp of record creation

## Running the Simulation

Execute the simulation by running the `npm start` command. The simulated events include user entries and exits at various locations and zones. The `waypointer` function is called at the end to generate journey entries.

## Note

Please ensure that you have a PostgreSQL database configured and accessible. Update the database configuration in `src/utils/db.ts` with your credentials.

For any questions or clarifications, please provide additional information or answer specific questions related to the project.
