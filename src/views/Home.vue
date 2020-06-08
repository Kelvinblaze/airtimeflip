<template>
  <fragment>
    <Navbar />
    <div class="body">
      <div class="introduction">
        <h1>Welcome</h1>
        <p>
          We make it easier for you to convert airtime to cash
        </p>
      </div>

      <div class="menu-card">
        <router-link to="/create-account">
          <Card
            iconName="fa fa-plus"
            cardTitle="Create Account"
            cardSubtitle="You can add new accounts"
          />
        </router-link>
        <Card
          iconName="fa fa-search"
          cardTitle="Get Accounts"
          cardSubtitle="Fetch your account details"
        />
        <Card
          iconName="fa fa-plus"
          cardTitle="Retrieve Account Name"
          cardSubtitle="Get an Account Name"
        />
        <Card
          iconName="fa fa-sign-out"
          cardTitle="Log Out"
          cardSubtitle="Log out from AirtimeFlip "
        />
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "Home",
  methods: {
    sayHello() {
      alert("hello");
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

.menu-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1.5rem;

  a {
    text-decoration: none;
  }
}

.introduction {
  margin-bottom: 3rem;
  h1,
  p {
    line-height: 1.5;
  }
}
</style>
