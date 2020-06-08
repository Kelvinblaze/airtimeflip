<template>
  <fragment>
    <div class="card">
      <div class="card__icon">
        <span :class="iconName"></span>
      </div>

      <div class="aside">
        <div class="card__title">
          <h2>{{ cardTitle }}</h2>
        </div>
        <div class="card__subtitle">
          <p>{{ cardSubtitle }}</p>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "card",
  props: ["iconName", "cardTitle", "cardSubtitle"]
};
</script>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  cursor: pointer;

  .card__icon {
    font-size: 2rem;
    color: var(--bg-color);
  }

  &__title,
  &__subtitle {
    line-height: 1.5;
  }
  .aside {
    margin-left: 2.5rem;
  }

  &__title {
    color: var(--bg-color);
  }

  &__subtitle {
    font-weight: light;
    color: #4d586c;
  }
}
</style>
