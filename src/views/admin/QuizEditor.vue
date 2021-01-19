<template>
    <div class="flex mx-24 overflow-hidden mt-32">
        <div class="bg-white rounded-lg p-10 w-1/3 mr-16 shadow-lg self-start">
            <img class="w-full " src="https://picsum.photos/800/500" alt="">
            <FormulateInput type="image" class="my-2"/>
            <div class="mt-4 text-2xl font-bold">{{quiz.name}}</div>
            <div class="flex mt-4 justify-around">
                <div v-tooltip="'Everybody can see this quiz'" class="flex mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span class="ml-1">public</span>
                </div>
                <div class="flex mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                    </svg>
                    <span class="ml-1">English</span>
                </div>
                <div v-tooltip="'Default time for all questions'" class="flex">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="ml-1">30 secs</span>
                </div>
            </div>
            <hr class="my-4">
            <div class="flex">
                <div class="flex text-gray-800 mr-8 ml-2" v-tooltip="'Topic'">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    <span class="ml-1">{{quiz.topic}}</span>
                </div>
                <div class="flex">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <span class="font-bold">{{questions.length}}</span>
                    <span class="ml-2">Questions</span>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-lg py-4 px-6 w-full shadow-lg overflow-y-scroll">
            <div class="mb-4 flex justify-between mx-20">
                <div class="text-xl">Quiz Editor</div>
                <div class="flex">
                    <button class="flex bg-indigo-200 p-2 rounded-lg text-indigo-800 align-middle focus:outline-none hover:bg-indigo-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <router-link :to="'question/new?q=' + this.$route.params.id" class="ml-2">Add new question</router-link>
                    </button>
                </div>
            </div>
            <hr>
            <div>
                <div class="mt-5" v-for="(question,index) in questions" :key="question.id">
                    <div class="bg-gray-200 w-10/12 rounded-lg border mx-auto">
                        <div class="flex justify-between align-middle p-5">
                            <div class="flex self-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                                </svg>
                                <span class="ml-2">Multiple Choice</span>
                            </div>
                            <span class="text-center font-semibold self-center">Question {{index + 1}}</span>
                            <div class="flex">
                                <router-link :to="'question/'+question.id +'/new?q=' + quiz.id" class="bg-white border rounded-lg px-4 py-2 flex hover:bg-gray-300">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                    <span class="ml-2">Edit</span>
                                </router-link>
                                <button v-tooltip="'Duplicate'" @click="duplicate(question,index)" class="bg-white border rounded-lg p-2 mx-2 hover:bg-gray-300">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                </button>
                                <button v-tooltip="'Remove'" @click="remove(question.id,index)" class="bg-white border rounded-lg p-2 group hover:bg-red-200">
                                    <svg class="w-6 h-6 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="bg-white px-5 pt-5 pb-2 font-semibold">
                            {{question.questionString}}
                        </div>
                        <div class="text-xs px-5 bg-white">answer choices</div>
                        <div class="flex-col p-5 bg-white">
                            <div class="grid grid-cols-2 gap-x-10 gap-y-4">
                                <div class="flex mr-16">
                                    <svg class="w-6 h-6" :class="question.answer1 == question.correctAnswer ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span class="ml-2">{{question.answer1}}</span>
                                </div>
                                <div class="flex">
                                    <svg class="w-6 h-6" :class="question.answer2 == question.correctAnswer ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span class="ml-2">{{question.answer2}}</span>
                                </div>
                                <div class="flex mr-16">
                                    <svg class="w-6 h-6" :class="question.answer3 == question.correctAnswer ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span class="ml-2">{{question.answer3}}</span>
                                </div>
                                <div class="flex">
                                    <svg class="w-6 h-6" :class="question.answer4 == question.correctAnswer ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span class="ml-2">{{question.answer4}}</span>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="flex px-5 py-2 bg-gray-100 ">
                            <svg class="w-6 h-6 self-center mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {{question.seconds}} seconds
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-16 p-4 border-dashed border-2 mx-20">
                <router-link :to="'question/new?q=' + this.$route.params.id" v-tooltip="'Multiple Choice'" class="flex p-2 rounded-lg bg-orange-500 hover:bg-orange-600">
                    <svg class="w-8 h-8 text-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>
                </router-link>
                <router-link :to="'question/new?q=' + this.$route.params.id" v-tooltip="'Checkbox'" class="flex p-2 rounded-lg bg-green-500 hover:bg-green-600 mx-4">
                    <svg class="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </router-link>
                <router-link :to="'question/new?q=' + this.$route.params.id" v-tooltip="'Open Ended'" class="flex p-2 rounded-lg bg-purple-500 hover:bg-purple-600">
                    <svg class="w-8 h-8 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "QuizEditor",
        data(){
            return {
                quiz: "",
                questions: [],
            }
        },
        created(){
            axios.get("https://quizzy-api-v1.herokuapp.com/quizzes/" + this.$route.params.id)
            .then(response => {
                this.quiz = response.data;
                this.questions = response.data.questions
            })
        },
        methods: {
            remove(id,index){
                this.questions.splice(index,1)
                axios.delete("https://quizzy-api-v1.herokuapp.com/questions/" + id)
                .then(
                    this.$toastr('success', 'Successfully removed question', 'Success')
                )
            },
            duplicate(question,index){
                axios.post("https://quizzy-api-v1.herokuapp.com/questions/", {
                    questionString: question.questionString,
                    answer1: question.answer1,
                    answer2: question.answer2,
                    answer3: question.answer3,
                    answer4: question.answer4,
                    correctAnswer: question.correctAnswer,
                    seconds: question.seconds,
                    quiz_id: this.$route.params.id
                })
                this.questions.push(this.questions[index])
            }
        }
    }
</script>

<style scoped>

</style>
