const express = require('express');
const router = express.Router();
const db = require('../config/firebase'); // Import Firestore instance

// Add pond data
router.post('/', async (req, res) => {
  const { receivedString } = req.body;
  try {
    await db.collection('ponddetail').add({
      receivedString: receivedString,
    });

    res.status(201).json({ message: 'Pond data added successfully' });
  } catch (error) {
    console.error('Error adding pond data: ', error);
    res.status(500).json({ message: 'Failed to add pond data', error });
  }
});

// Update pond data
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { receivedString } = req.body;

  try {
    await db.collection('ponddetail').doc(id).update({
      receivedString : receivedString
    });

    res.status(200).json({ message: 'Pond data updated successfully' });
  } catch (error) {
    console.error('Error updating pond data: ', error);
    res.status(500).json({ message: 'Failed to update pond data', error });
  }
});

// Get all pond data
router.get('/', async (req, res) => {
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

module.exports = router;
