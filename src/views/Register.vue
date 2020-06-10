<template>
  <fragment>
    <div class="login-page">
      <div class="brand-logo">
        <img :src="require('../assets/logo.png')" alt="logo" />
      </div>

      <div class="login-form">
        <div class="form-header">
          <h2>Create a new account</h2>
          <p>Welcome to the best airtime to cash converter</p>
        </div>

        <div class="form-content">
          <form @submit.prevent="createAccount()">
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input type="text" required v-model="fullName" />
              <div class="error-msg">
                <span>{{ fullNameErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="username">User Name</label>
              <input type="text" required v-model="userName" />
              <div class="error-msg">
                <span>{{ userNameErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" required v-model="emailAddress" />
              <div class="error-msg">
                <span>{{ emailErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="mobilenum">Mobile Number</label>
              <input type="tel" required v-model="phoneNumber" />
              <div class="error-msg">
                <span>{{ numberErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" required v-model="pass" />
              <div class="error-msg">
                <span>{{ passErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="cpassword">Confirm Password</label>
              <input type="password" required v-model="confirmPass" />
              <div class="error-msg">
                <span>{{ passConfirmErr }}</span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit">CREATE ACCOUNT</button>
            </div>
          </form>
        </div>
      </div>

      <div class="registration-wrapper">
        <p>
          <router-link to="/login"
            >Already Own an account? Login Here</router-link
          >
        </p>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      fullName: "",
      userName: "",
      emailAddress: "",
      phoneNumber: "",
      pass: "",
      confirmPass: "",
      passConfirmErr: "",
      fullNameErr: "",
      userNameErr: "",
      emailErr: "",
      numberErr: "",
      passErr: ""
    };
  },
  methods: {
    async createAccount() {
      if (this.pass !== this.confirmPass) {
        this.passConfirmErr = "Passwords do not match";
      } else {
        try {
          this.passConfirmErr = "";
          this.userNameErr = "";
          this.emailErr = "";
          this.numberErr = "";

          const apiCall = this.$http.post("users", {
            fullname: this.fullName,
            username: this.userName,
            number: this.phoneNumber,
            email: this.emailAddress,
            password: this.pass,
            password_confirmation: this.confirmPass
          });

          const apiRes = await apiCall;
          console.log(apiRes);

          if (apiRes.status === 200) {
            if (apiRes.body.message) {
              alert(apiRes.body.message);
              this.$router.push("/login");
            }
            if (apiRes.body.data.success === false) {
              this.numberErr = apiRes.body.data.errors.phone.toString();
            }
          }
        } catch (error) {
          console.log(error);
          if (error.body.data.email) {
            this.emailErr = error.body.data.email.toString();
          }
          if (error.body.data.username) {
            this.userNameErr = error.body.data.username.toString();
          }
          if (error.body.data.number) {
            this.numberErr = error.body.data.number.toString();
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// Utilities

label {
  display: block;
}

.error-msg {
  color: red;
  margin: 8px 0;
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
      button {
        -webkit-appearance: none;
        margin-top: 1rem;
        background: var(--bg-color);
        color: var(--white);
        font-weight: bold;
        cursor: pointer;
        padding: 1rem;
        width: 100%;
        border: none;
        border-radius: 4px;
        outline: none;
      }
    }
  }
}
</style>
