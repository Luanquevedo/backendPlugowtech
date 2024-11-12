import { listen } from "./src/app.js";  
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
