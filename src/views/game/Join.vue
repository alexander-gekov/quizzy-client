<template>
    <div class="flex flex-col justify-center items-center mt-20">
        <div class="text-2xl font-medium uppercase mb-10">Join Game</div>
        <input v-model="gamePin" type="text" class="text-2xl rounded shadow-lg px-10 py-6 focus:outline-none mb-10"
               placeholder="GAME PIN">
        <button @click="connectWs" class="bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 text-white">Join
        </button>
        <div v-for="player in players" :key="player">{{player}}</div>
    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'webstomp-client';

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    export default {
        name: "Join",
        data() {
            return {
                gamePin: "",
                socket: null,
                stompClient: null,
                players: []
            }
        },
        created() {
        },
        methods: {
            connectWs() {

                this.socket = new SockJS('http://localhost:8080/ws');
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
            sendMessage() {
                var messageContent = "";
                if (messageContent && this.stompClient) {
                    var chatMessage = {
                        sender: localStorage.getItem("username"),
                        content: "hello",
                        type: 'CHAT'
                    };
                    this.stompClient.send("/app/game/sendMessage", {}, JSON.stringify(chatMessage));
                }
            },
            onMessageReceived(payload) {
                var message = JSON.parse(payload.body);
                if (message.type === 'JOIN') {
                    this.players = message.content.substr(1,message.content.length-2).split(',')
                    console.log(message.content);
                } else if (message.type === 'LEAVE') {
                    // TODO send message to server to remove player from list
                    console.log(this.players);
                    message.content = message.sender + ' left!';
                    let users = this.players;
                    users.forEach((item,index)=>{
                        if(item.trim() === message.sender.trim()){
                            this.players.splice(index,1)
                        }
                    })
                } else {
                    console.log(message.content);
                }
            }
        }
    }
</script>

<style scoped>

</style>
