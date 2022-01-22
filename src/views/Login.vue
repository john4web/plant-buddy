<template>
    <div class="flex flex-col justify-between text-center gap-5 h-screen p-5">
        <back-button />
        <div>
            <img
                src="../assets/plant_care_illustration.png"
                alt="men taking care of his plant"
            />
            <h1>Welcome back!</h1>
            <p>Enter your credentials, and let's get started!</p>
        </div>
        <div class="flex flex-col gap-5">
            <div class="form-element">
                <label for="email">E-Mail</label>
                <input v-model="email" id="email" type="email" />
            </div>
            <div class="form-element">
                <label for="password">Password</label>
                <input v-model="password" id="password" type="password" />
            </div>
            <button @click="login" class="button button--blue">Login</button>
            <p>
                No account?
                <router-link class="underline" to="/register"
                    >Register</router-link
                >
                instead.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/AuthService';
import BackButton from '@/components/BackButton.vue';

export default defineComponent({
    name: 'Login',
    components: { BackButton },
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
