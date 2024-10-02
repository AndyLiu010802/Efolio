<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  // import db from '../firebase/init.js';
  // import { collection, addDoc } from 'firebase/firestore';
  import BookList from '../components/BookList.vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const isbn = ref('');
      const name = ref('');
  
      const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }
        const response = await axios.post('https://addbook-m6cn4ley6q-uc.a.run.app', {
          isbn: isbn.value,
          name: name.value,
        });

        alert(response.data.message);

        isbn.value = '';
        name.value = '';
      } catch (error) {
        console.error('Error adding book: ', error);
        alert('Failed to add book.');
      }
    };
  
      return {
        isbn,
        name,
        addBook,
      };
    },
    components: {
      BookList,
    },
  };
  </script>
  