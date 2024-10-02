/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();
const db = admin.firestore();

exports.getBookCount = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error getting book count:", error.message);
      res.status(500).send("Error getting book count");
    }
  });
});

/**
 * Capitalizes the given name.
 *
 * @param {string} name - The name to capitalize.
 * @return {string} The capitalized name.
 */
function capitalize(name) {
  return name.toUpperCase();
}


exports.addBook = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;

      if (isNaN(isbn)) {
        return res.status(400).json({error: "ISBN must be a valid number"});
      }
      const capitalizedName = capitalize(name);

      await db.collection("books").add({
        isbn: isbn,
        name: capitalizedName,
      });

      res.status(200).json({message: "successfully added book",
        isbn: isbn, name: capitalizedName});
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).json({error: "Failed to add book"});
    }
  });
});

exports.getBooks = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = [];
      snapshot.forEach((doc) => {
        books.push(doc.data());
      });
      res.status(200).send({books});
    } catch (error) {
      console.error("Error getting books:", error.message);
      res.status(500).send("Error getting books");
    }
  });
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
