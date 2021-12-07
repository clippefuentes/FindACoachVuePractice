<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Password" />
      </div>
      <p v-if="!formIsValid"> Please enter valid email and password more than 4 characters</p>
      <base-button>{{submitButtonCaption}}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Register'
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Sign Up Instead' : 'Login Instead'
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (this.email === '' || this.password.length > 3 || !this.email.includes('@')) {
        this.formIsValid = false
        return
      }
    },
    switchAuthMode() {
      if(this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>