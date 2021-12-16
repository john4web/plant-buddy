<template>
  <NavBar v-if="isAuthorized" />
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthService from "@/services/AuthService";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const isAuthorized = ref(false);
    const menuIsOpen = ref(false);

    isAuthorized.value = AuthService.isAuthorized();

    return {
      isAuthorized,
      menuIsOpen,
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
