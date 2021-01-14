<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
        >
          
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-gray-500 text-center mb-3 font-bold">
              <small>sign up with credentials</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input
                  type="username"
                  data-username-input
                  v-model="username"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  data-email-input
                  v-model="email"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  data-password-input
                  v-model="password"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>

<!--              <div>-->
<!--                <label class="inline-flex items-center cursor-pointer">-->
<!--                  <input-->
<!--                    id="customCheckLogin"-->
<!--                    type="checkbox"-->
<!--                    class="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"-->
<!--                  />-->
<!--                  <span class="ml-2 text-sm font-semibold text-gray-700">-->
<!--                    I agree with the-->
<!--                    <a href="javascript:void(0)" class="text-green-500">-->
<!--                      Privacy Policy-->
<!--                    </a>-->
<!--                  </span>-->
<!--                </label>-->
<!--              </div>-->

              <div class="text-center mt-6">
                <button
                        data-submit-input
                  class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="register"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";

export default {
  data() {
    return {
      github,
      google,
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register: function () {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
              .then(() => this.$router.push('/'))
              .catch(err => console.log(err))
    }
  }
};
</script>
