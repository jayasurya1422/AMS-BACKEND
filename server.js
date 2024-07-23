const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pondRoutes = require('./routes/ponds');
const db = require('./config/firebase'); // Ensure this path is correct
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('ponddetail').get();
    const ponds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(ponds);
  } catch (error) {
    console.error('Error getting pond data: ', error);
    res.status(500).json({ message: 'Failed to get pond data', error });
  }
});

app.use('/ponds', pondRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
