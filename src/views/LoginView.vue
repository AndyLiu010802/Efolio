<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex' 

const store = useStore() 

const loginData = ref({
  username: '',
  password: ''
})

const account = ref({
  username: "Andy",
  password: "password"
})

const errors = ref({
  username: null,
  password: null
})

const validateUsername = (blur) => {
  if (loginData.value.username !== account.value.username) {
    if (blur) errors.value.username = 'Username does not exist'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (loginData.value.password !== account.value.password) {
    if (blur) errors.value.password = 'Password is incorrect'
  } else {
    errors.value.password = null
  }
}

const submitForm = () => {
  validateUsername(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password) {
    store.dispatch('login')  
    alert("Login successful!")
  }
}

const Logout = () => {
  store.dispatch('logout')
  alert("Logout successful!")
}
</script>


<template>
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2" v-if="!store.getters.isAuthenticated">
        <h1 class="text-center">Log in</h1>
        <p class="text-center">
          This form is let user to login their account
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 d-flex justify-content-center">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateUsername(true)"
                @input="() => validateUsername(false)"
                v-model="loginData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>


          </div>
          <div class="row mb-3 d-flex justify-content-center">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="loginData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-md-8 offset-md-2" v-else>
        <h1 class="text-center">You are already logged in</h1>
        <p class="text-center">
          You are already logged in. Please log out to log in with another account.
        </p>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary me-2 d-flex justify-content-center" @click="Logout">Logout</button>
        </div>
        </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

/* ID selectors */
#username:focus,
#password:focus
{
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}
</style>

