<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
        </a>
      </div>
      <span
        class="nav-toggle"
        @click="showMobileMenu = !showMobileMenu"
        :class="{ 'is-active': showMobileMenu }"
      >
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu" :class="{ 'is-active': showMobileMenu }">
        <a
          class="nav-item is-tab"
          @click="$store.dispatch('modal/showModal', 'login')"
          v-text="'About'"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
};
</script>
