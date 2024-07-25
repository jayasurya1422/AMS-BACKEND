const db = require('../config/firebase');
const admin = require('firebase-admin');

class Pond {
  constructor(pondId, i1, i2) {
    this.receivedString = this.receivedString;
  }

  // Save or update a pond detail
  static async savePondDetail(pond) {
    try {
      const pondRef = db.collection('ponddetail').doc(pond.pondId);
      await pondRef.set({
        receivedString: receivedString,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true }); // Merge to update existing fields
      console.log(Pond ${pond.pondId} saved successfully.);
    } catch (error) {
      console.error('Error saving pond detail:', error);
    }
  }

  // Get pond detail by pondId
  static async getPondDetail(pondId) {
    try {
      const pondRef = db.collection('ponddetail').doc(pondId);
      const doc = await pondRef.get();
      if (!doc.exists) {
        console.log(No such pond with ID: ${pondId});
        return null;
      }
      return doc.data();
    } catch (error) {
      console.error('Error getting pond detail:', error);
    }
  }

  // Get all ponds
  static async getAllPonds() {
    try {
      const snapshot = await db.collection('ponddetail').get();
      if (snapshot.empty) {
        console.log('No ponds found.');
        return [];
      }
      const ponds = [];
      snapshot.forEach(doc => {
        ponds.push(doc.data());
      });
      return ponds;
    } catch (error) {
      console.error('Error getting all ponds:', error);
    }
  }

  static async deletePond(pondId) {
    try {
      const pondRef = db.collection('ponddetail').doc(pondId);
      await pondRef.delete();
      console.log(Pond ${pondId} deleted successfully.);
    } catch (error) {
      console.error('Error deleting pond detail:', error);
    }
  }
}

module.exports = Pond;
