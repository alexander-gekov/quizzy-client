<template>
    <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
            :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']"
    >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex flex-grow flex-1 justify-between">
                    <h3
                            class="font-semibold text-lg"
                            :class="[color === 'light' ? 'text-gray-800' : 'text-white']"
                    >
                        My Collection
                    </h3>
                    <button @click="toggleCreate = !toggleCreate"
                            class="bg-indigo-500 hover:bg-indigo-300 focus:outline-none rounded-full">
                        <i v-bind:class="{'fas fa-plus-circle fa-2x':!toggleCreate, 'fas fa-minus-circle fa-2x':toggleCreate}"></i>
                    </button>
                </div>
            </div>
        </div>
        <transition name="fade">
            <create-quizz class="transition ease-in" @close="toggleCreate = false" @refresh="createQuiz"
                          v-show="toggleCreate"></create-quizz>
        </transition>
        <div class="block w-full overflow-x-auto">
            <!-- Projects table -->

                <table class="items-center w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        >
                            Name
                        </th>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        >
                            Topic
                        </th>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        >
                            Number of Questions
                        </th>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        >
                            Times Played
                        </th>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        >
                            Public
                        </th>
                        <th
                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(quiz,index) in quizzes" :key="quiz.id">
                        <th
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4 text-left flex items-center"
                        >
                            <img
                                    src="http://placekitten.com/200/200"
                                    class="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                            />
                            <div v-if="editQuiz === quiz.id">
                                <input v-model="quiz.name" type="text"
                                       class="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <router-link :to="'/quiz/' + quiz.id" v-if="editQuiz != quiz.id"
                                         class="ml-3 font-bold"
                                         :class="[color === 'light' ? 'text-gray-700' : 'text-white']"
                            >
                                {{quiz.name}}
                            </router-link>
                        </th>
                        <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4"
                        >
                            <div v-if="editQuiz === quiz.id">
                                <label>
                                    <input v-model="quiz.topic" type="text"
                                           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                </label>
                            </div>
                            <div v-if="editQuiz != quiz.id"> {{quiz.topic}}</div>
                        </td>
                        <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4"
                        >
                            <div v-if="editQuiz === quiz.id">
                                <input v-model="quiz.number_of_questions" type="number"
                                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div v-if="editQuiz != quiz.id">
                                {{quiz.number_of_questions}}
                            </div>

                        </td>
                        <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4"
                        >
                            <div class="flex">

                            </div>
                        </td>
                        <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4"
                        >

                        </td>
                        <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-no-wrap p-4 text-right"
                        >
                            <div v-if="editQuiz === quiz.id">
                                <button @click="updateQuiz(quiz)"
                                        class="button bg-indigo-400 hover:bg-indigo-500 px-4 py-2 rounded-full text-white mx-4">
                                    Save
                                </button>
                            </div>
                            <table-dropdown v-else @updatedQuiz="editQuiz = quiz.id" @deletedQuiz="deleteQuiz(index)"
                                            :quiz-id="quiz.id"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
        </div>
    </div>
</template>
<script>
    import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";
    import CreateQuizz from "../Quizzes/CreateQuizz";
    import axios from 'axios'

    export default {
        data() {
            return {
                toggleCreate: false,
                quizzes: [],
                paginate: ['quizzes'],
                editQuiz: null
            };
        },
        mounted () {
            setTimeout(() => {
                this.shown = true
            }, 1000)
        },
        components: {
            TableDropdown,
            CreateQuizz
        },
        created() {
            axios.get("https://quizzy-api-v1.herokuapp.com/quizzes/user/" + localStorage.getItem("user_id"))
                .then(response => {
                    console.log(response.data);
                    this.quizzes = response.data;
                })
        },
        methods: {
            createQuiz(val) {
                this.quizzes.push(val);
            },
            deleteQuiz(index) {
                this.quizzes.splice(index, 1);
            },
            updateQuiz(quiz) {
                axios.put('https://quizzy-api-v1.herokuapp.com/quizzes/' + quiz.id, {
                    name: quiz.name,
                    topic: quiz.topic,
                    user_id: localStorage.getItem("user_id")
                }).then(this.editQuiz = null)
            },
        },
        props: {
            color: {
                default: "light",
                validator: function (value) {
                    // The value must match one of these strings
                    return ["light", "dark"].indexOf(value) !== -1;
                },
            },
        },
    };
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .15s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
