<template>
    <div class="mt-16">
        <div v-if="question_number < -1">
            <div v-if="created === false" class="flex flex-col justify-center items-center mt-40">
                <div class="text-6xl text-bold ">Create Game 😍</div>
                <formulate-input v-model="gamePin" class="text-4xl lg:w-1/6 mt-10" type="text"
                                 label="Game PIN"></formulate-input>
                <formulate-input v-model="quiz" class="text-4xl lg:w-1/6" type="select" label="Quiz"
                                 :options="this.quizzes"></formulate-input>
                <formulate-input @click="connectWs" type="button" class="text-2xl">Create Game</formulate-input>
            </div>
            <div v-if="created === true" class="flex flex-col min-h-full justify-around">
                <div class="flex bg-gray-400 rounded-lg p-6 mt-20 w-1/2 self-center justify-center">
                    <div class="text-2xl text-medium">Game #{{gamePin}}</div>

                </div>
                <div class="text-xl text-light self-center">Owner: {{username}}</div>

                <ul class="mt-10">
                    <div v-for="player in players" :key="player"
                         class="flex  my-2 justify-center items-center text-2xl">
                        <div>
                            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">{{player}}</div>
                    </div>
                </ul>
                <div class="text-center text-xl text-gray-800 animate-pulse">
                    Waiting for players
                </div>
                <div class="self-center mt-5">
                    <formulate-input @click="startGame" type="button">START GAME</formulate-input>
                </div>
            </div>
        </div>
        <div class="text-gray-800 text-6xl mt-32">
            <div v-if="countDown>0 && countDownStarted &&!gameEnded" class="justify-center text-center">
                <div>GAME IS STARTING ...</div>
                <div>{{countDown}}</div>
            </div>
            <div v-if="countDown === 0 && !gameEnded" class="flex flex-col">
                <div class="flex justify-between items-center text-4xl font-bold self-center">
                    <span><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
                    {{countDownNextQuestion}}
                    <div @click="clearTimeout(this.timeOutQuestion)" class="mx-2">
                        GAME #{{gamePin}}
                    </div>
                </div>
                <div class="bg-gray-400 p-4 rounded-lg text-4xl text-medium">
                    {{questions[question_number].questionString}}
                </div>
                <div class="text-center text-4xl">Question #{{question_number+1}} out of {{questions.length}}</div>
                <div class="flex text-3xl self-center">Players: {{players.length}}</div>
                <div class="flex-1 mt-20">
                    <div class="flex">
                        <div class="bg-red-600 rounded-lg px-5 m-2 py-10 w-1/2">
                            {{questions[question_number].answer1}}
                        </div>
                        <div class="bg-orange-500 rounded-lg px-5 py-10 m-2 w-1/2 ">
                            {{questions[question_number].answer2}}
                        </div>
                    </div>
                    <div class="flex">
                        <div class="bg-green-600 rounded-lg px-5 m-2 py-10 w-1/2 ">
                            {{questions[question_number].answer3}}
                        </div>
                        <div class="bg-purple-600 rounded-lg px-5 m-2 py-10 w-1/2 ">
                            {{questions[question_number].answer4}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="gameEnded" class="justify-center text-center">
                <div>Leaderboard</div>
                <ol type="1">
                    <!--                    <li v-for="player in players" :key="player">{{player}}</li>-->
                </ol>
                <div class="mt-10">
                    <button class="bg-gray-500 rounded-full px-4 py-2" @click="this.$router.back()">Back</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'webstomp-client';
    import axios from "axios";

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    var timeOutQuestion;

    export default {
        name: "Lobby",
        data() {
            return {
                gamePin: "",
                socket: null,
                stompClient: null,
                players: [],
                quizzes: [],
                quiz: '',
                created: false,
                question_number: -2,
                countDown: 5,
                countDownStarted: false,
                countDownNextQuestion: -1,
                timeOutQuestion: undefined,
                gameEnded: false
            }
        },
        computed: {
            username: function () {
                return localStorage.getItem('username')
            },
            questions: function () {
                return this.quiz.questions
            }
        },
        created() {
            axios.get("https://quizzy-api-v1.herokuapp.com/quizzes/user/" + localStorage.getItem("user_id"))
                .then(response => {
                    console.log(response.data);
                    this.quizzes = response.data;
                    this.quizzes.forEach((quiz) => {
                        quiz.label = quiz.name
                        quiz.value = quiz
                    })
                })
            clearTimeout(timeOutQuestion)
        },
        methods: {
            connectWs() {
                this.created = true;
                this.socket = new SockJS('https://quizzy-api-v1.herokuapp.com/ws');
                this.stompClient = Stomp.over(this.socket);

                this.stompClient.connect(
                    {}, this.onConnected(),
                    error => {
                        console.log(error);
                        this.$toastr('success', error)
                    }
                );
            },
            onConnected() {
                sleep(2000).then(() => {
                        this.created = true;
                        // Subscribe to the Public Topic
                        this.stompClient.subscribe(`/topic/${this.gamePin}`, this.onMessageReceived);

                        this.stompClient.subscribe('/topic/public', this.onMessageReceived);


                        let body = JSON.stringify({sender: localStorage.getItem("username"), type: 'CREATE'})
                        // Tell your username to the server
                        this.stompClient.send(`/app/game/${this.gamePin}`,
                            body, {}
                        )
                        // this.stompClient.send("/app/test/send", JSON.stringify(chatMessage), {});
                    }
                )
            },
            onMessageReceived(payload) {
                var message = JSON.parse(payload.body);
                if (message.type === 'EXISTS') {
                    this.stompClient.unsubscribe(`/topic/${this.gamePin}`)
                    this.$toastr('error', 'GAME Pin already in use.')
                    location.reload();
                } else {
                    this.created = true;
                    if (message.type === 'JOIN') {
                        this.players = message.content.substr(1, message.content.length - 2).split(',')
                        console.log(message.content);
                    } else if (message.type === 'LEAVE') {
                        let body = JSON.stringify({sender: localStorage.getItem("username"), type: 'LEFT'})
                        this.stompClient.send(`/app/game/${this.gamePin}/removeUser`, body, {})
                        console.log(this.players);
                        message.content = message.sender + ' left!';
                        let users = this.players;
                        users.forEach((item, index) => {
                            if (item.trim() === message.sender.trim()) {
                                this.players.splice(index, 1)
                            }
                        })
                    } else {
                        console.log(message.content);
                    }
                }

            },
            startGame() {
                // Send message to server to start game
                let body = JSON.stringify({
                    sender: localStorage.getItem("username"),
                    type: 'START',
                    content: `${this.quiz.id}`
                })
                this.stompClient.send(`/app/game/${this.gamePin}/startGame`, body, {})
                //Go to first question
                this.question_number = -1;
                this.countDownStarted = true;
                this.countDownTimer("game");
            },
            countDownTimer(type) {
                if (type === "question") {
                    console.log("tuk")
                    if (this.countDownNextQuestion === 0) {
                        clearTimeout(timeOutQuestion);
                        this.nextQuestion();
                    }
                    if (this.countDownNextQuestion > 0) {
                        timeOutQuestion = setTimeout(function () {
                            this.countdown()
                        }.bind(this), 1000)
                    }
                } else if (type === "game") {
                    var timeoutGame;
                    if (this.countDown === 0) {
                        clearTimeout(timeoutGame)
                        this.nextQuestion();
                        this.countDownTimer("question")
                    }
                    if (this.countDown > 0) {
                        timeoutGame = setTimeout(() => {
                            this.countDown -= 1
                            this.countDownTimer("game")
                        }, 1000)
                    }
                }
            },
            nextQuestion() {
                clearTimeout(timeOutQuestion)

                if (this.question_number === this.questions.length) {
                    this.gameEnded = true;
                    console.log('krai')
                }
                if (this.question_number < this.questions.length) {
                    'next question'
                    if (this.question_number === this.questions.length) {
                        this.gameEnded = true;
                        console.log('krai')
                    } else {
                        this.question_number++;
                        this.countDownNextQuestion = this.questions[this.question_number].seconds;
                    }
                } else {
                    this.gameEnded = true;
                    console.log('krai')
                }

                //this.countDownTimer("question")
            },
            countdown() {
                this.countDownNextQuestion -= 1;
                let body = JSON.stringify({
                    sender: localStorage.getItem("username"),
                    content: `${this.countDownNextQuestion}`,
                    type: 'COUNTDOWN'
                })
                this.stompClient.send(`/app/game/${this.gamePin}/countdown`, body, {})
                if (this.countDownNextQuestion === 0 && this.question_number + 1 === this.questions.length) {
                    this.gameEnded = true;
                    let body = JSON.stringify({
                        sender: localStorage.getItem("username"),
                        type: 'END',
                        content: `${this.quiz.id}`
                    })
                    this.stompClient.send(`/app/game/${this.gamePin}/endGame`, body, {})
                } else {
                    console.log('minus edno')
                    this.countDownTimer("question")
                }
            }
        }
    }
</script>

<style scoped>

</style>
