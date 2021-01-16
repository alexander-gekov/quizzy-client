<template>
    <div class="flex flex-col justify-center items-center mt-20">
        <h1 class="text-2xl font-bold">Lobby</h1>
        <div class="text-xl font-medium">Owner: Aleksandar</div>
        <div class="mt-5">Players in lobby:</div>
        <ul>
            <li v-for="message in this.received_messages" :key="message">{{message}}</li>
        </ul>
        <div class="mt-10">Waiting for owner to start game.</div>
    </div>
</template>

<script>
    export default {
        name: "Lobby",
        data(){
            return {
                socket: null,
                received_messages: []
            }
        },
        created(){


        }
    }
</script>

<style scoped>

</style>
