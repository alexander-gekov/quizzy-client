<template>
    <div>
        <div v-if="question_number < -1" class="mt-20">
            <div v-if="!stompClient" class="flex flex-col justify-center items-center mt-20">
                <div class="text-2xl font-medium uppercase mb-10">Join Game</div>
                <input v-model="gamePin" type="text"
                       class="text-2xl rounded shadow-lg px-10 py-6 focus:outline-none mb-10"
                       placeholder="GAME PIN">
                <button @click="connectWs"
                        class="bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 text-white">
                    Join
                </button>
                <div v-for="player in players" :key="player">{{player}}</div>
            </div>
            <div v-if="stompClient" class="flex flex-col min-h-full justify-around">
                <div class="flex bg-gray-400 rounded-lg p-6 mt-20 w-1/2 self-center justify-center">
                    <div class="text-2xl text-medium">Game #{{gamePin}}</div>

                </div>
                <div class="text-xl text-light self-center">Owner: {{owner}}</div>
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
                    Waiting for host to start game
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
                <div class="flex-1 mt-20">
                    <div class="flex">
                        <button @click="answer(questions[question_number].answer1)"
                                :class="answers[question_number] === questions[question_number].answer1 ? 'bg-green-500 hover:bg-green-400' : answers.length === this.question_number ? 'bg-gray-500' : ''"
                             class="bg-red-600 hover:bg-red-700 hover:underline rounded-lg px-5 m-2 py-10 w-1/2 cursor-pointer">
                            {{questions[question_number].answer1}}
                        </button>
                        <button @click="answer(questions[question_number].answer2)"
                             class="bg-orange-500 hover:bg-orange-600 hover:underline rounded-lg px-5 py-10 m-2 w-1/2 cursor-pointer">
                            {{questions[question_number].answer2}}
                        </button>
                    </div>
                    <div class="flex">
                        <button @click="answer(questions[question_number].answer3)"
                             class="bg-green-600 hover:bg-green-700 hover:underline rounded-lg px-5 m-2 py-10 w-1/2 cursor-pointer">
                            {{questions[question_number].answer3}}
                        </button>
                        <button @click="answer(questions[question_number].answer4)"
                             class="bg-purple-600 hover:bg-purple-700 hover:underline rounded-lg px-5 m-2 py-10 w-1/2 cursor-pointer">
                            {{questions[question_number].answer4}}
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="gameEnded" class="justify-center text-center">
                <div>Leaderboard</div>
                <ol type="1">
                    <li v-for="player in playersWithInfo" :key="player">{{player.name}} : {{player.points}}</li>
                </ol>
                <div class="mt-10">
                    <button class="bg-gray-500 rounded-full px-4 py-2">Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'webstomp-client';
    import axios from 'axios';

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    var timeOutQuestion;

    export default {
        name: "Join",
        data() {
            return {
                gamePin: "",
                socket: null,
                stompClient: null,
                owner: '',
                players: [],
                playersWithInfo: [],
                quizzes: [],
                quiz: '',
                created: false,
                question_number: -2,
                countDown: 5,
                countDownStarted: false,
                countDownNextQuestion: -1,
                timeOutQuestion: undefined,
                gameEnded: false,
                answers: []
            }
        },
        computed: {
            questions: function () {
                return this.quiz.questions
            },
            username: function () {
                return localStorage.getItem("username");
            }
        },
        methods: {
            connectWs() {

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
                        // Subscribe to the Public Topic
                        this.stompClient.subscribe(`/topic/${this.gamePin}`, this.onMessageReceived);

                        this.stompClient.subscribe('/topic/public', this.onMessageReceived);


                        let body = JSON.stringify({sender: localStorage.getItem("username"), type: 'JOIN'})
                        // Tell your username to the server
                        this.stompClient.send(`/app/game/${this.gamePin}/addUser`,
                            body, {}
                        )
                        // this.stompClient.send("/app/test/send", JSON.stringify(chatMessage), {});
                    }
                )
            },
            onMessageReceived(payload) {
                var message = JSON.parse(payload.body);
                if (message.type === 'JOIN') {
                    this.players = message.content.substr(1, message.content.length - 2).split(',')
                    this.owner = message.other;
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
                } else if (message.type === 'ANSWER') {
                    this.playersWithInfo.forEach(player => {
                        if (player.name === message.sender) {
                            player.points += 10;
                        }
                    })
                } else if (message.type === 'COUNTDOWN') {
                    let countdown = message.content;
                    if(countdown === 0){
                        this.nextQuestion();
                    }
                    this.countDownNextQuestion = countdown;
                    this.countDownTimer("question")
                }else if (message.type === 'START') {
                    console.log("start")
                    this.question_number = -1;
                    axios.get("https://quizzy-api-v1.herokuapp.com/quizzes/" + message.content)
                        .then(response => {
                            this.quiz = response.data
                        })
                    this.players.forEach(player => {
                        this.playersWithInfo.push({
                            name: player,
                            points: 0,
                            games_played: 0,
                            first_places: 0,
                            ranking: 0
                        })
                    })
                    this.countDownStarted = true;
                    this.countDownTimer("game");
                } else {
                    console.log(message.content);
                }
            },
            isCorrect(answer) {
                return this.questions[this.question_number].correctAnswer === answer
            },
            countDownTimer(type) {
                if (type === "question") {
                    console.log("tuk")
                    if (this.countDownNextQuestion === 1) {
                        clearTimeout(timeOutQuestion);
                        this.nextQuestion();
                    }
                    if (this.countDownNextQuestion > 0) {
                        this.countdown();
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
                    console.log('krai 1')
                }
                if (this.question_number < this.questions.length) {
                    'next question'
                    if (this.question_number === this.questions.length) {
                        this.gameEnded = true;
                        console.log('krai 2')
                    } else {
                        this.question_number++;
                        this.countDownNextQuestion = this.questions[this.question_number].seconds;
                    }
                } else {
                    this.gameEnded = true;
                }

                //this.countDownTimer("question")
            },
            countdown() {
                if (this.countDownNextQuestion === 0 && this.question_number + 1 === this.questions.length) {
                    this.gameEnded = true;
                    this.playersWithInfo.sort((a, b) => b.points - a.points)
                } else {
                    console.log('minus edno')
                    this.countDownTimer("question")
                }
            },
            answer(answer) {
                if (this.answers.length <= this.question_number) {
                    //check if it is correct
                    if (this.questions[this.question_number].correctAnswer === answer) {
                        this.answers.push(answer);
                        let body = JSON.stringify({sender: this.username, type: 'ANSWER'})
                        this.stompClient.send(`/app/game/${this.gamePin}/answer`, body, {})
                        this.$toastr('add', {
                            title: '+10 points', // Toast Title
                            msg: 'Correct!', // Message
                            timeout: 3000, // Timeout in ms
                            position: 'toast-top-center', // Toastr position
                            type: 'success', // Toastr type
                        })
                        this.playersWithInfo.forEach(player => {
                            if (player.name === this.username) {
                                player.points += 10;
                            }
                        })
                    } else {
                        this.answers.push(answer);
                        this.$toastr('add', {
                            title: '+0 points', // Toast Title
                            msg: 'OOps! That is incorrect', // Message
                            timeout: 3000, // Timeout in ms
                            position: 'toast-top-center', // Toastr position
                            type: 'error', // Toastr type
                        })
                    }
                }
                else{
                    this.$toastr('error','You already answered!')
                }
            }
        }
    }
</script>

<style scoped>

</style>
