import db from "./db";

const init = async () => {
  try {
    const events_results = await db.query(`CREATE TABLE IF NOT EXISTS user_event
(
    event_id serial PRIMARY KEY,
    user_id text NOT NULL,
    card_id text NOT NULL,
    location text,
    zone smallint NOT NULL,
    date text
    created_at timestamp DEFAULT NOW()
);`);

    const zvt_results =
      await db.query(`CREATE TABLE IF NOT EXISTS zero_value_transactions
(
    transaction_id SERIAL PRIMARY KEY,
    user_id text NOT NULL,
    card_id text NOT NULL,
    transaction_type text NOT NULL, -- 'entry' or 'exit'
    location text,
    zone smallint NOT NULL,
    date text,
    event_id serial,
    created_at timestamp DEFAULT NOW(),
    FOREIGN KEY (event_id) REFERENCES user_event(event_id)
);`);

    // console.log(events_results, zvt_results);
  } catch {
    console.error("TABLE CREATION FAILED!");
  }
};

export default { init };
