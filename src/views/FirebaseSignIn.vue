<template>
    <div v-if="!isAuthed">
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="signin">Sign in via Firebase</button></p>
    
      <div v-if="message">
        <h2>{{ message }}</h2> 
      </div>
    
      <div v-if="error">
        <h2 style="color: red">{{ error }}</h2>
      </div>
    </div>
    <div v-else>
      <h1>Welcome!</h1>
      <p>{{ message }}</p>
      <router-link to="/signout">Go to Sign Out</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
  
  const email = ref("");
  const password = ref("");
  const message = ref(""); 
  const error = ref("");
  const isAuthed = ref(false);
  
  const auth = getAuth();
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthed.value = true;
        message.value = `Welcome back, ${user.email}`;
      } else {
        isAuthed.value = false;
      }
    });
  });
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        error.value = "";
        message.value = `You are signed in as: ${auth.currentUser.email}`;
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          error.value = "User does not exist.";
        } else if (err.code === 'auth/wrong-password') {
          error.value = "Incorrect password.";
        } else {
          error.value = "Error: " + err.message;
        }
        message.value = "";
      });
  };
  </script>
  