<template>
  <fragment>
    <div class="login-page">
      <div class="brand-logo">
        <img :src="require('../assets/logo.png')" alt="logo" />
      </div>

      <div class="login-form">
        <div class="form-header">
          <h2>Login to your account</h2>
          <p>Securely login to your airtimeflip</p>
        </div>

        <div class="form-content">
          <form @submit.prevent="login()">
            <span class="err-msg">{{ errorMessage }}</span>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" required v-model="emailAddress" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" required v-model="password" />
            </div>
            <div class="form-group">
              <input type="submit" value="LOG IN" />
            </div>
          </form>
        </div>
      </div>

      <div class="registration-wrapper">
        <p>
          <router-link to="/register"
            >Don't have an account? Register</router-link
          >
        </p>
      </div>
    </div>

    <!-- LOADER -->
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
  </fragment>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Login",
  components: {
    Loading
  },
  data() {
    return {
      emailAddress: "",
      password: "",
      errorMessage: "",
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const apiCall = this.$http.post("login", {
          identity: this.emailAddress,
          password: this.password
        });

        const apiResponse = await apiCall;

        const accessToken = apiResponse.data.payload.access_token;
        const userData = apiResponse.data.payload.user;

        this.$store.dispatch("addToken", accessToken);
        this.$store.dispatch("addUser", userData);

        if (
          this.$store.getters.isLoggedIn === true &&
          this.$store.getters.token === accessToken
        ) {
          this.$router.push("/");
          this.isLoading = false;
        }
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMessage = err.data.message;
        }
        if (err.status === 422) {
          this.errorMessage = err.data.data.password.toString();
        }
        if (err.status === 401) {
          this.errorMessage = err.data.message;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// Utilities

.err-msg {
  color: red;
}

label {
  display: block;
}

.brand-logo,
.registration-wrapper {
  text-align: center;
  margin-top: 4%;
  color: var(--white);
}

.brand-logo {
  width: 150px;
  margin: 2% auto;
  img {
    max-width: 100%;
  }
}

.registration-wrapper {
  margin: 1rem 0;
}

.registration-wrapper a {
  color: var(--white);
  text-decoration: none;
}
.login-form {
  width: 30%;
  height: auto;
  background: var(--white);
  margin: 2rem auto;
  padding: 1rem 2rem;
  border-radius: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 900px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  .form-header {
    margin: 1.5rem 0;
    text-align: center;
    h2,
    p {
      line-height: 1.5;
    }
    h2 {
      color: var(--primary);
      font-weight: 700;
    }
    p {
      font-weight: light;
      color: #4d586c;
    }
  }

  .form-content {
    margin: 2rem 0;
    .form-group {
      margin: 1.5rem 0;
      label {
        margin-bottom: 8px;
        font-weight: bold;
        color: #4d586c;
      }

      input {
        padding: 1rem;
        width: 100%;
        border: none;
        border-radius: 4px;
        background: #edf2f7;
        outline: none;
      }
      input[type="submit"] {
        -webkit-appearance: none;
        margin-top: 1rem;
        background: var(--bg-color);
        color: var(--white);
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
</style>
