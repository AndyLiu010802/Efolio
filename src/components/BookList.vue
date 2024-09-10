<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="updateBook(book.id, 'Updated Book Name')">Update</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { doc, updateDoc, deleteDoc } from "firebase/firestore";
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '>', 1000));
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      // Update a book document
      const updateBook = async (bookId, updatedName) => {
        try {
          const bookRef = doc(db, 'books', bookId);
          await updateDoc(bookRef, {
            name: updatedName,
          });
          alert('Book updated successfully!');
          fetchBooks(); 
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      // Delete a book document
      const deleteBook = async (bookId) => {
        try {
          const bookRef = doc(db, 'books', bookId);
          await deleteDoc(bookRef);
          alert('Book deleted successfully!');
          fetchBooks(); 
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        updateBook,
        deleteBook,
      };
    },
  };
  </script>
  