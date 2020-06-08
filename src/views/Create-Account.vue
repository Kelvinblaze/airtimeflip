<template>
  <fragment>
    <div class="login-page">
      <div class="brand-logo">
        <img :src="require('../assets/logo.png')" alt="logo" />
      </div>

      <div class="login-form">
        <div class="form-header">
          <h2>Add Bank Account</h2>
          <p>Add a new account to your profile.</p>
        </div>

        <div class="form-content">
          <form @submit.prevent="createAccount()">
            <span class="err-msg"> {{ errorMessage }}</span>
            <div class="form-group">
              <label for="AccountName">Account Name</label>
              <input type="text" required v-model="accountName" />
            </div>
            <div class="form-group">
              <label for="bankId">Bank ID</label>
              <select v-model="bankName">
                <option
                  v-for="(bank, index) in banks"
                  :key="index"
                  :value="bank.id"
                  >{{ bank.bank_name }}</option
                >
              </select>
            </div>
            <div class="form-group">
              <label for="accountNumber">Account Number</label>
              <input type="number" required v-model="accountNumber" />
            </div>
            <div class="form-group">
              <label for="accountType">Personal</label>
              <div class="grouped">
                <div class="radio-group">
                  <input type="radio" v-model="accountType" value="yes" />
                  <label for="one" class="customLabel">Yes</label>
                </div>

                <div class="radio-group">
                  <input type="radio" v-model="accountType" value="no" />
                  <label for="one" class="customLabel">No</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <button type="submit">ADD ACCOUNT DETAILS</button>
            </div>
          </form>

          <div class="form-group">
            <button type="button" class="back-btn" @click="goBack()">
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      accountName: "",
      accountNumber: "",
      bankName: "",
      accountType: "yes",
      banks: [],
      errorMessage: ""
    };
  },
  mounted() {
    this.fetchBanks();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async createAccount() {
      this.errorMessage = "";
      try {
        const apiHeaders = {
          Authorization: `Bearer ${localStorage.getItem("airtimeFlipToken")}`
        };

        const apiCall = await this.$http.post(
          "accounts",
          {
            account_number: this.accountNumber,
            bank_id: this.bankName,
            account_name: this.accountName,
            personal: this.accountType
          },
          {
            headers: apiHeaders
          }
        );

        if (apiCall.status === 200) {
          alert(apiCall.data.message);
          this.accountNumber = "";
          this.bankName = "";
          this.accountName = "";
          this.personal = "yes";
        }
      } catch (error) {
        if (error.status === 400) {
          this.errorMessage = error.data.message;
        }
      }
    },
    async fetchBanks() {
      const apiHeaders = {
        Authorization: `Bearer ${localStorage.getItem("airtimeFlipToken")}`
      };

      const apiCall = await this.$http.get("banks", {
        headers: apiHeaders
      });

      this.banks = apiCall.data.payload;
    }
  }
};
</script>

<style lang="scss" scoped>
// Utilities

label {
  display: block;
}
.err-msg {
  color: red;
}
.customLabel {
  display: flex;
}
.grouped {
  display: flex;
}
.radio-group {
  &:nth-child(2) {
    margin-left: 2rem;
  }
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

      input,
      select {
        padding: 1rem;
        width: 100%;
        border: none;
        border-radius: 4px;
        background: #edf2f7;
        outline: none;
      }

      select {
        -webkit-appearance: none;
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
      .back-btn {
        background: var(--white);
        color: var(--bg-color);
        border: 1px solid var(--bg-color);
      }
    }
  }
}
</style>
