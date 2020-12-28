<template>
    <div class="flex mx-4">
        <div class="bg-gray-200 w-full rounded-lg border mr-10 self-start">
            <div class="flex justify-between align-middle p-5">
                <div class="flex self-center">
                    <formulate-input type="select" :options="{first: 'Multiple Choice',second: 'Checkbox',third: 'Open End'}"></formulate-input>
                    <svg class="w-8 h-8 ml-4 mt-1" v-tooltip="'Multiple Choice'" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                    </svg>
<!--                    <span class="ml-2">Multiple Choice</span>-->
                </div>
                <span class="text-center font-semibold self-center">Question 1</span>
            </div>
            <div class="bg-white p-4">
                <formulate-input type="textarea" :wrapper-class="['w-full']" v-model="question"
                                 placeholder="Write your question here."></formulate-input>
            </div>
            <div class="flex bg-white p-4">
                <button @click="correct = !correct" class="focus:outline-none">
                    <svg class="w-10 h-10 text-gray-500 mr-5" :class="{ 'text-green-500': correct}" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <formulate-input class="w-full" type="text" v-model="answer1"
                                 placeholder="Question 1"></formulate-input>
            </div>
            <div class="flex bg-white p-4">
                <button @click="correct = !correct" class="focus:outline-none">
                    <svg class="w-10 h-10 text-gray-500 mr-5" :class="{ 'text-green-500': correct}" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <formulate-input class="w-full" type="text" v-model="answer2"
                                 placeholder="Question 1"></formulate-input>
            </div>
            <div class="flex bg-white p-4">
                <button @click="correct = !correct" class="focus:outline-none">
                    <svg class="w-10 h-10 text-gray-500 mr-5" :class="{ 'text-green-500': correct}" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <formulate-input class="w-full" type="text" v-model="answer3"
                                 placeholder="Question 1"></formulate-input>
            </div>
            <div class="flex bg-white p-4">
                <button @click="correct = !correct" class="focus:outline-none">
                    <svg class="w-10 h-10 text-gray-500 mr-5" :class="{ 'text-green-500': correct}" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
                <formulate-input class="w-full" type="text" v-model="answer4"
                                 placeholder="Question 1"></formulate-input>
            </div>
            <hr>
            <div class="flex px-5 py-2 bg-gray-100 justify-between">
                <div class="flex">
                    <svg class="w-6 h-6 self-center mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <formulate-input type="select"
                                     :options="{first: '30 secs', second: '45 secs', third: '60 secs', fourth: '2 min'}"/>
                </div>
                <div class="flex">
                    <button @click="back" type="button" class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 mr-5">Cancel
                    </button>
                    <formulate-input type="submit">
                        <svg class="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                        </svg>
                        <span>Save</span></formulate-input>
                </div>
            </div>
        </div>
        <div class="bg-white border-4 rounded-lg w-1/2 px-10 py-16 shadow-lg">
            <div class="flex items-center justify-center bg-gray-800 p-4 h-64">
                <div class="text-center self-center text-white text-2xl">{{question}}</div>
            </div>
            <div class="flex items-center justify-center bg-red-600 p-4 h-20">
                <div class="text-center self-center text-white text-xl">{{answer1}}</div>
            </div>
            <div class="flex items-center justify-center bg-orange-500 p-4 h-20">
                <div class="text-center self-center text-white text-xl">{{answer2}}</div>
            </div>
            <div class="flex items-center justify-center bg-green-600 p-4 h-20">
                <div class="text-center self-center text-white text-xl">{{answer3}}</div>
            </div>
            <div class="flex items-center justify-center bg-purple-600 p-4 h-20">
                <div class="text-center self-center text-white text-xl">{{answer4}}</div>
            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: "QuestionEditor",
        data() {
            return {
                question: '',
                correct: false,
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: ''
            }
        },
        methods: {
            back(){
                let self = this;
                self.$router.back();
            }
        }
    }
</script>

<style scoped>

</style>
