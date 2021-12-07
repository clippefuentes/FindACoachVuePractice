<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
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
        <p v-if="!formIsValid"> Please enter valid email and password more than 6 characters</p>
        <base-button>{{submitButtonCaption}}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
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
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || this.password.length < 6 || !this.email.includes('@')) {
        this.formIsValid = false
        return
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      }

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload)
        } else {
          await this.$store.dispatch('signup', actionPayload)
        }
        const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`
        this.$router.replace(redirectUrl)
      } catch (error) {
        this.error = error.message || 'Fail to Sign Up'
      }
     
      this.isLoading = false;
    },
    switchAuthMode() {
      if(this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
    },
    handleError() {
      this.error = null
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