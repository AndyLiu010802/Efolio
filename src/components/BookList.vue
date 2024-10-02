<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="openDialog(book.id, book.name)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>

    <!-- Dialog for updating -->
    <div v-if="isDialogVisible" class="dialog">
      <h3>Update Book Name</h3>
      <input v-model="newBookName" placeholder="Enter new book name" />
      <button @click="confirmUpdate">Confirm</button>
      <button @click="closeDialog">Cancel</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  setup() {
    const books = ref([]);
    const isDialogVisible = ref(false);
    const newBookName = ref('');
    const selectedBookId = ref(null);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000), orderBy('isbn'), limit(2));
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

    // Open dialog for updating the book
    const openDialog = (bookId, currentName) => {
      selectedBookId.value = bookId;
      newBookName.value = currentName;
      isDialogVisible.value = true;
    };

    // Close dialog
    const closeDialog = () => {
      isDialogVisible.value = false;
    };

    // Confirm the update
    const confirmUpdate = async () => {
      if (selectedBookId.value && newBookName.value) {
        try {
          const bookRef = doc(db, 'books', selectedBookId.value);
          await updateDoc(bookRef, {
            name: newBookName.value,
          });
          alert('Book updated successfully!');
          closeDialog();
          fetchBooks(); 
        } catch (error) {
          console.error('Error updating book: ', error);
        }
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
      isDialogVisible,
      newBookName,
      openDialog,
      closeDialog,
      confirmUpdate,
      deleteBook,
    };
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
}
</style>
