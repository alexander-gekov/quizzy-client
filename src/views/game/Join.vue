<template>
    <div class="flex flex-col justify-center items-center mt-20">
        <div class="text-2xl font-medium uppercase mb-10">Join Game</div>
        <input v-model="gamePin" type="text" class="text-2xl rounded shadow-lg px-10 py-6 focus:outline-none mb-10" placeholder="GAME PIN">
        <button class="bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 text-white">Join</button>
    </div>
</template>

<script>
    export default {
        name: "Join",
        data(){
            return {
                gamePin: ""
            }
        }
    }
</script>

<style scoped>

</style>
