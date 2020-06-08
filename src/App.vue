<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Import Fonts from google fonts
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,300&display=swap");

// Global colors
:root {
  --bg-color: #413b85;
  --primary: #e98604;
  --secondary: #6d63de;
  --white: #ffffff;
  --black: #030303;
}

// CSS RESET
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: var(--bg-color);
}

// Main Vue App Component
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
