<template>
    <div>
        <h1>This is the login page</h1>
        <router-link to="/authenticate">Back</router-link>
        <label for="email">E-Mail</label>
        <input v-model="email" id="email" type="email" />
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" />
        <button @click="login">Login</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/AuthService';

export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter();

        const email = ref<string>('');
        const password = ref<string>('');

        const login = async () => {
            if (email.value && password.value) {
                const userCredentials = await AuthService.signIn(
                    email.value,
                    password.value
                );
                userCredentials
                    ? await router.push({ name: 'Home' })
                    : console.log('shit stg went wrong with login'); // TODO: show snackbar or other error
            }
        };
        return {
            email,
            password,
            login,
        };
    },
});
</script>
