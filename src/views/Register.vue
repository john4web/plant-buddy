<template>
    <div class="flex flex-col justify-between text-center h-screen p-5">
        <back-button />
        <div>
            <img
                src="../assets/plant_care_illustration.png"
                alt="men taking care of his plant"
            />
            <h1>Let's get started!</h1>

            <p>Sign up to get this plant party started.</p>
        </div>
        <form class="flex flex-col gap-5">
            <div class="form-element">
                <label for="email">E-Mail</label>
                <input v-model="email" id="email" type="email" />
            </div>
            <div class="form-element">
                <label for="password">Password</label>
                <input v-model="password" id="password" type="password" />
            </div>
            <button @click="register" class="button button--blue">
                Register
            </button>
            <p>
                Already registered?
                <router-link class="underline" to="/login">Log in</router-link>
                instead.
            </p>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/AuthService';
import BackButton from '@/components/BackButton.vue';

export default defineComponent({
    name: 'Register',
    components: { BackButton },
    setup() {
        const router = useRouter();

        const email = ref<string>('');
        const password = ref<string>('');

        const register = async () => {
            // TODO: properly validate
            if (email.value && password.value) {
                const userCredentials = await AuthService.createUser(
                    email.value,
                    password.value
                );

                userCredentials
                    ? await router.push({ name: 'Home' })
                    : console.log('shit stg went wrong with registration'); // TODO: show snackbar or other error
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
