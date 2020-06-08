<template>
  <fragment>
    <nav>
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>

      <div class="toggle">
        <span class="fa fa-bars"></span>
      </div>

      <ul class="navlinks">
        <li><a href="/">Home</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href @click="logout()">Logout</a></li>
      </ul>
    </nav>
  </fragment>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.removeItem("airtimeFlipToken");
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 1rem 4rem;
  @media (max-width: 900px) {
    padding: 1rem;
  }
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 100px;
    img {
      max-width: 100%;
    }
  }

  .toggle {
    color: white;
    font-size: 2rem;
    @media (min-width: 900px) {
      display: none;
    }
  }

  .navlinks {
    @media (max-width: 900px) {
      display: none;
    }
    list-style: none;

    li {
      display: inline-block;
    }
    li a {
      color: white;
      padding: 0 2rem;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        color: var(--primary);
      }
    }
  }
}
</style>
