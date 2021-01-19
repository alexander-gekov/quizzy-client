<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-gray-200">
      <admin-navbar />
<!--      <header-stats />-->
      <div class="px-4 md:px-10 mx-auto w-full flex flex-col justify-between h-screen">
        <router-view  />
        <footer-admin/>
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import axios from 'axios'


let token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    FooterAdmin,
  },
  data(){
    return {
      socket: null,
      stompClient: null
    }
  },
};
</script>
