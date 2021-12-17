<template>
  <div>
    <h1>This is the register page</h1>
    <label for="email">E-Mail</label>
    <input v-model="email" name="email" type="email" />
    <label for="password">Password</label>
    <input v-model="password" name="password" type="password" />
    <button @click="register">Register</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import AuthService from "@/services/AuthService";

export default defineComponent({
  name: "Register",
  setup() {
    const router = useRouter();

    const email = ref<string>("");
    const password = ref<string>("");

    const register = async () => {
      // TODO: properly validate
      if (email.value && password.value) {
        const userCredentials = await AuthService.createUser(
          email.value,
          password.value
        );

        userCredentials
          ? await router.push({ name: "Home" })
          : console.log("shit stg went wrong with registration"); // TODO: show snackbar or other error
      }
    };
    return {
      email,
      password,
      register,
    };
  },
});
</script>
