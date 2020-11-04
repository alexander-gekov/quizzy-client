<template>
    <div>
        <a
                class="text-gray-600 block"
                href="#"
                ref="btnDropdownRef"
                v-on:click="toggleDropdown($event)"
        >
            <div class="items-center flex">
        <span
                class="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"
        >
          <img
                  src="https://lh3.googleusercontent.com/a-/AOh14Gh0YI7ivp_2mY99XXLprN9o5j1RyGvozi_5sF6A4nk=s88"
                  alt="..."
                  class="w-full rounded-full align-middle border-none shadow-lg"
          />
        </span>
            </div>
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
                    href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Action
            </a>
            <a
                    href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Another action
            </a>
            <a
                    href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Something else here
            </a>
            <div class="h-0 my-2 border border-solid border-gray-200"/>
            <a
                    href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            >
                Seprated link
            </a>
        </div>
    </div>
</template>

<script>
    import {createPopper} from "@popperjs/core";


    export default {
        data() {
            return {
                dropdownPopoverShow: false,
            };
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
        },
    };
</script>
