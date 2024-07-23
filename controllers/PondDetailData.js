const db = require('../firebase'); // Import Firestore instance
const firebase = require('firebase/app'); // Import firebase to use serverTimestamp()

const sensordataHandler = async (req, res, next) => {
  const { pondId, i1, i2 } = req.body;

  let exists = false;
  let sensordata;
  try {
    const sensordataSnapshot = await db.collection('ponddetail').get();
    sensordata = sensordataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (sensordata.length === 1) {
      exists = true;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Updating Data Failed",
    });
  }

  if (exists) {
    try {
      await db.collection('ponddetail').doc(sensordata[0].id).update({
        pondId: pondId,
        i1: i1,
        i2: i2,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updating Data Failed",
      });
    }
  } else {
    try {
      await db.collection('ponddetail').add({
        pondId: pondId,
        i1: i1,
        i2: i2,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updating Data Failed",
      });
    }
  }

  return res.status(200).json({
    message: "Data updated successfully",
  });
};

const getdataHandler = async (req, res, next) => {
  let sensordata;
  try {
    const sensordataSnapshot = await db.collection('ponddetail').get();
    sensordata = sensordataSnapshot.docs.map(doc => doc.data());
    console.log(sensordata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Getting Data Failed",
    });
  }

  if (sensordata.length === 0) {
    return res.status(404).json({
      message: "No sensor data found",
    });
  }

  const data = {
    pondId: sensordata[0].pondId,
    i1: sensordata[0].i1,
    i2: sensordata[0].i2,
  };

  return res.status(200).json(data);
};

exports.ponddataHandler = ponddataHandler;
exports.getdataHandler = getdataHandler;
