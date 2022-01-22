<template>
    <div class="flex flex-col justify-between text-center h-screen p-5">
        <div class="flex flex-col justify-center gap-3 h-full">
            <img
                src="../assets/plant_care_illustration.png"
                alt="men taking care of his plant"
            />
            <div>
                <h1 class="font-10xl">Ready to plan(t)?</h1>
                <p>
                    Make sure you never forget your little green buddies again!
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-3">
            <router-link to="/register" class="button button--blue">
                Register
            </router-link>
            <router-link to="/login" class="button">Log In</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Authenticate',
});
</script>
