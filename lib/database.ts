import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL as string)
      .then((response) =>
        console.log(`Connected to mongo in server: ${response.connection.host}`)
      );
  } catch (error) {
    console.log("could not connect to database");
  }
};
