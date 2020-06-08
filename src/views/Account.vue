<template>
  <fragment>
    <Navbar />
    <div class="body">
      <div class="introduction">
        <h1 class="header-text">Accounts</h1>
        <p>All Bank Account Details associated with this account</p>
      </div>

      <div class="main-details">
        <div class="details">
          <h2 class="header-text">Personal Details</h2>
          <p>Full Name: {{ user.user.name }}</p>
          <p>User Name: {{ user.user.username }}</p>
          <p>Email Address: {{ user.user.email }}</p>
          <p>Phone Number: {{ user.user.phone }}</p>
          <p>Personal ID: {{ user.id }}</p>
        </div>

        <div class="details" v-for="(account, index) in accounts" :key="index">
          <h2 class="header-text">Bank Details {{ index + 1 }}</h2>
          <p>Bank Name: {{ account.bank.bank_name }}</p>
          <p>Account Name: {{ account.account_name }}</p>
          <p>Account Number: {{ account.account_number }}</p>
          <p>Bank ID: {{ account.bank.id }}</p>
          <p>Personal Account: {{ account.personal }}</p>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      user: null,
      accounts: null
    };
  },
  async created() {
    try {
      const apiHeaders = {
        Authorization: `Bearer ${localStorage.getItem("airtimeFlipToken")}`
      };
      const apiCall = await this.$http.get("accounts", {
        headers: apiHeaders
      });

      const apiJsonResponse = await apiCall.data.payload;

      this.user = await apiCall.data.payload[1];

      this.accounts = apiJsonResponse;

      console.log(apiJsonResponse);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  background: var(--white);
  padding: 4rem 6rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
}

.header-text {
  color: var(--bg-color);
}

.introduction {
  margin-bottom: 1rem;
  h1,
  p {
    line-height: 1.5;
  }
}
.details {
  margin: 2rem 0;
  h2,
  p {
    line-height: 1.5;
  }
}
</style>
