<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-start md:justify-center">
        <div class="flex space-x-7">
          <!-- Desktop Navbar items -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link
              to="/"
              class="
                py-4
                px-2
                text-gray-500
                font-semibold
                hover:text-green-500
                transition
                duration-300
              "
              >Home</router-link
            >
            <router-link
              to="/my-garden"
              class="
                py-4
                px-2
                text-gray-500
                font-semibold
                hover:text-green-500
                transition
                duration-300
              "
              >My Garden</router-link
            >
            <router-link
              to="/new-buddy"
              class="
                py-4
                px-2
                text-gray-500
                font-semibold
                hover:text-green-500
                transition
                duration-300
              "
              >New Buddy</router-link
            >
            <router-link
              to="/profile"
              class="
                py-4
                px-2
                text-gray-500
                font-semibold
                hover:text-green-500
                transition
                duration-300
              "
              >Profile</router-link
            >
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center py-4 px-2">
          <button class="outline-none" @click="toggleMenu">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-green-500"
              x-show="!showMenu"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <div :class="{ hidden: !menuIsOpen }">
      <ul class="">
        <li>
          <router-link
            to="/"
            class="
              block
              text-sm
              px-2
              py-4
              hover:bg-green-500
              transition
              duration-300
            "
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/my-garden"
            class="
              block
              text-sm
              px-2
              py-4
              hover:bg-green-500
              transition
              duration-300
            "
            >My Garden</router-link
          >
        </li>
        <li>
          <router-link
            to="/new-buddy"
            class="
              block
              text-sm
              px-2
              py-4
              hover:bg-green-500
              transition
              duration-300
            "
            >New Buddy</router-link
          >
        </li>
        <li>
          <router-link
            to="/profile"
            class="
              block
              text-sm
              px-2
              py-4
              hover:bg-green-500
              transition
              duration-300
            "
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
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: white;
  background-color: #10b981;
  font-weight: 600;
}

@media (min-width: 768px) {
  .router-link-exact-active {
    color: #10b981;
    font-weight: 600;
    border-bottom: 4px solid #10b981;
    background-color: white;
  }
}
</style>
