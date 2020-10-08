<template>
    <div>
        <a
                class="text-gray-600 py-1 px-3"
                href="#pablo"
                ref="btnDropdownRef"
                v-on:click="toggleDropdown($event)"
        >
            <i class="fas fa-ellipsis-v"></i>
        </a>
        <div
                ref="popoverDropdownRef"
                class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
        >
            <a
                    href="#"
                    @click.prevent="updateQuiz"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Edit
            </a>
            <a
                    href="#"
                    @click.prevent="deleteQuiz"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Delete
            </a>
        </div>
    </div>
</template>
<script>
    import {createPopper} from "@popperjs/core";
    import axios from 'axios'

    export default {
        data() {
            return {
                dropdownPopoverShow: false,
            };
        },
        props: {
            quizId: Number
        },
        methods: {
            toggleDropdown: function (event) {
                event.preventDefault();
                if (this.dropdownPopoverShow) {
                    this.dropdownPopoverShow = false;
                } else {
                    this.dropdownPopoverShow = true;
                    createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                        placement: "bottom-start",
                    });
                }
            },
            deleteQuiz: function () {
                axios.delete('https://quizzy-api-v1.herokuapp.com/quizzes/' + this.quizId)
                    .then(response => {
                        console.log(response.data)
                        this.$emit('deletedQuiz', this.quizId)
                    })
            },
            updateQuiz: function () {
                this.$emit('updatedQuiz', this.quizId);
                this.toggleDropdown(event);
            }
        },
    };
</script>
