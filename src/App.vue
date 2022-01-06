<template>
  <NavBar v-if="isAuthorized" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const menuIsOpen = ref(false);
    const route = useRoute();

    const isAuthorized = computed(() => {
      return !(route.name === "Register" || route.name === "Login");
    });

    return { route, menuIsOpen, isAuthorized };
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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
