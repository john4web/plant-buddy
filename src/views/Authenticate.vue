<template>
    <div>
        <div>!!Display a big image here!!</div>
        <h1>Ready to plan(t)?</h1>
        <p>Make sure you never forget your little green buddies again!</p>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Log In</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Authenticate',
});
</script>
