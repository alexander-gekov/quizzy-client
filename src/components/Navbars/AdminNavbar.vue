<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center"
  >
    <div
      class="w-full mx-auto items-center bg-indigo-500 flex justify-between md:flex-no-wrap flex-wrap md:px-10 p-4"
    >
      <!-- Brand -->
      <a
        class="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        href="javascript:void(0)"
      >
        Welcome, {{this.username}}
      </a>
      <!-- Form -->
      <form
        class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
          />
        </div>
      </form>
      <!-- User -->
      <ul name="avatar" class="flex-col md:flex-row list-none items-center hidden md:flex">
        <user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import axios from 'axios'

export default {
  computed: {
    username: function(){ return localStorage.getItem('username')}
  },
  created() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
  components: {
    UserDropdown,
  },
};
</script>
