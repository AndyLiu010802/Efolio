<!-- SignOut.vue -->
<template>
    <div v-if="isAuthed">
      <h1>Sign Out</h1>
      <p>You are currently signed in as: {{ currentUserEmail }}</p>
      <button @click="signout">Sign out</button>
    </div>
    <div v-else>
      <h1>You are not signed in</h1>
      <router-link to="/">Go to Sign In</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const auth = getAuth();
  const router = useRouter();
  const currentUserEmail = ref("");
  const isAuthed = ref(false);
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthed.value = true;
        currentUserEmail.value = user.email;
      } else {
        isAuthed.value = false;
        router.push("/");  
      }
    });
  });
  
  const signout = () => {
    signOut(auth).then(() => {
      isAuthed.value = false;
      router.push("/"); 
    });
  };
  </script>
  