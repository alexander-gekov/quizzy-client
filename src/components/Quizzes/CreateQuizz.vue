<template>
    <div>
        <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter a name">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="topic">
                    Topic
                </label>
                <input v-model="topic" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="topic" type="text" placeholder="Enter a topic">
            </div>
            <button id="createQuizzz" @click.prevent="createQuizz" type="button" class="bg-indigo-500 px-3 py-1 text-white rounded-full hover:bg-indigo-600 focus:outline-none">Add Quizz</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "CreateQuizz",
        data() {
            return {
                name: '',
                topic: '',
            }
        },
        methods: {
            createQuizz: function(){
                axios.post('https://quizzy-api-v1.herokuapp.com/quizzes',{
                    name: this.name,
                    topic: this.topic,
                    user_id: localStorage.getItem("user_id")
                }).then(response=>{
                    console.log(response.data);
                    this.name = '';
                    this.topic = '';
                    this.$emit('close',response.data);
                    this.$emit('refresh',response.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>
