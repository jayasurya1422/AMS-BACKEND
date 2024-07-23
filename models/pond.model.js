const express = require('express');
const router = express.Router();
const db = require('../config/firebase'); // Import Firestore instance

// Add a new pond
router.post('/', async (req, res) => {
  const { pondId, i1, i2 } = req.body;

  try {
    await db.collection('ponds').doc(pondId).set({
      pondId,
      i1,
      i2,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).send({ message: 'Pond added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding pond', error });
  }
});

// Update a pond
router.put('/:pondId', async (req, res) => {
  const { pondId } = req.params;
  const { i1, i2 } = req.body;

  try {
    await db.collection('ponds').doc(pondId).update({
      i1,
      i2,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send({ message: 'Pond updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating pond', error });
  }
});

// Get a pond
router.get('/:pondId', async (req, res) => {
  const { pondId } = req.params;

  try {
    const pondDoc = await db.collection('ponds').doc(pondId).get();
    if (pondDoc.exists) {
      res.status(200).send(pondDoc.data());
    } else {
      res.status(404).send({ message: 'No such pond found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error getting pond', error });
  }
});

module.exports = router;
