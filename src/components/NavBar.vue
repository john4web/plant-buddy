<template>
  <nav class="bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-start md:justify-center">
        <div class="flex space-x-7">
          <!-- Desktop Navbar items -->
          <div class="hidden md:flex items-center space-x-1 text-navy">
            <router-link
              to="/"
              class="py-4 px-2 font-semibold transition duration-300"
              >Home</router-link
            >
            <router-link
              to="/my-garden"
              class="py-4 px-2 font-semibold transition duration-300"
              >My Garden</router-link
            >
            <router-link
              to="/new-buddy"
              class="py-4 px-2 font-semibold transition duration-300"
              >New Buddy</router-link
            >
            <router-link
              to="/profile"
              class="py-4 px-2 font-semibold transition duration-300"
              >Profile</router-link
            >
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center py-4 px-2">
          <button class="outline-none h-6" @click="toggleMenu">
            <div class="space-y-2">
              <span class="block w-5 h-1 bg-navy rounded-full"></span>
              <span class="block w-8 h-1 bg-navy rounded-full"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <div
      :class="{ hidden: !menuIsOpen }"
      class="h-screen w-screen fixed text-navy bg-white px-6 text-xl"
    >
      <ul class="">
        <li>
          <router-link
            @click="toggleMenu"
            to="/"
            class="p-4 transition duration-300 inline-block mb-2"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            @click="toggleMenu"
            to="/my-garden"
            class="p-4 transition duration-300 inline-block mb-2"
            >My Garden</router-link
          >
        </li>
        <li>
          <router-link
            @click="toggleMenu"
            to="/new-buddy"
            class="p-4 transition duration-300 inline-block mb-2"
            >New Buddy</router-link
          >
        </li>
        <li>
          <router-link
            @click="toggleMenu"
            to="/profile"
            class="p-4 transition duration-300 inline-block mb-2"
            >Profile</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const menuIsOpen = ref(false);

    return {
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
.router-link-exact-active {
  background-color: #d0e1da;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .router-link-exact-active {
    border-bottom: 4px solid #d0e1da;
    background-color: white;
    border-radius: 0;
  }
}
</style>
