import express from 'express';
import path from 'path';
//when using ES Modules, you can't use __dirname and __filename without adding them to the module scope
import { __filename, __dirname } from './config.js';

const PORT = process.env.PORT || 3001;
const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../build')));


// Serve React App for all routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
