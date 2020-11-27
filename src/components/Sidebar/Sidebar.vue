<template>
    <nav
            class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
    >
        <div
                class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
        >
            <!-- Toggler -->
            <button
                    class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    type="button"
                    v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
            >
                <i class="fas fa-bars"></i>
            </button>
            <!-- Brand -->
            <router-link
                    class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
            >
<!--                <img :src="quizzy" class="w-1/3" alt="">-->
                <div class="text-2xl">QuizzY</div>
            </router-link>
            <!-- User -->
            <ul class="md:hidden items-center flex flex-wrap list-none">
                <li class="inline-block relative">
                    <notification-dropdown/>
                </li>
                <li class="inline-block relative">
                    <user-dropdown/>
                </li>
            </ul>
            <!-- Collapse -->
            <div
                    class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
                    v-bind:class="collapseShow"
            >
                <!-- Collapse header -->
                <div
                        class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300"
                >
                    <div class="flex flex-wrap">
                        <div class="w-6/12">
                            <router-link
                                    class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                                    to="/"
                            >
                                Quizzy
                            </router-link>
                        </div>
                        <div class="w-6/12 flex justify-end">
                            <button
                                    type="button"
                                    class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                    v-on:click="toggleCollapseShow('hidden')"
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Form -->
                <form class="mt-6 mb-4 md:hidden">
                    <div class="mb-3 pt-0">
                        <input
                                type="text"
                                placeholder="Search"
                                class="px-3 py-2 h-12 border border-solid border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                        />
                    </div>
                </form>

                <!-- Divider -->
                <hr class="my-4 md:min-w-full"/>
                <!-- Heading -->
                <h6
                        class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                    Play Now!
                </h6>
                <!-- Navigation -->

                <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                    <li class="items-center">
                        <router-link
                                to="/game/create"
                                v-slot="{ href, route, navigate, isActive }"
                        >
                            <a
                                    :href="href"
                                    @click="navigate"
                                    class="text-xs uppercase py-3 font-bold block"
                                    :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
                            >
                                <i
                                        class="fas fa-tv mr-2 text-sm"
                                        :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                                ></i>
                                Create a Game
                            </a>
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                to="/game/join"
                                v-slot="{ href, route, navigate, isActive }"
                        >
                            <a
                                    :href="href"
                                    @click="navigate"
                                    class="text-xs uppercase py-3 font-bold block"
                                    :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
                            >
                                <i
                                        class="fas fa-tools mr-2 text-sm"
                                        :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                                ></i>
                                Join Game
                            </a>
                        </router-link>
                    </li>

                </ul>

                <!-- Divider -->
                <hr class="my-4 md:min-w-full"/>
                <!-- Heading -->
                <h6
                        class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                    Quizzes
                </h6>
                <!-- Navigation -->

                <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                    <li id="MyCollectionn" class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/mycollection"
                        >
                            <i class="fas fa-newspaper text-gray-400 mr-2 text-sm"></i>
                            My Collection
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/quizz/create"
                        >
                            <i class="fas fa-user-circle text-gray-400 mr-2 text-sm"></i>
                            Create a Quizz
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/quizz/browse"
                        >
                            <i class="fas fa-user-circle text-gray-400 mr-2 text-sm"></i>
                            Trending
                        </router-link>
                    </li>
                </ul>

                <!-- Divider -->
                <hr class="my-4 md:min-w-full"/>
                <!-- Heading -->
                <h6
                        class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                    My Profile
                </h6>
                <!-- Navigation -->
                <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/user/myprofile"
                        >
                            <i class="fas fa-fingerprint text-gray-400 mr-2 text-sm"></i>
                            My Account
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/user/changepassword"
                        >
                            <i class="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>
                            Change password
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/user/addfriends"
                        >
                            <i class="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>
                            Add Friends
                        </router-link>
                    </li>
                </ul>
                <!-- Divider -->
                <hr class="my-4 md:min-w-full"/>
                <!-- Heading -->
                <h6
                        class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
                >
                    Auth Layout Pages
                </h6>
                <!-- Navigation -->
                <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/auth/login"
                        >
                            <i class="fas fa-fingerprint text-gray-400 mr-2 text-sm"></i>
                            Login
                        </router-link>
                    </li>

                    <li class="items-center">
                        <router-link
                                class="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/auth/register"
                        >
                            <i class="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>
                            Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
); }

<script>
    import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
    import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
    import quizzy from '@/assets/img/quizzy.png'

    export default {
        data() {
            return {
                collapseShow: "hidden",
                quizzy
            };
        },
        methods: {
            toggleCollapseShow: function (classes) {
                this.collapseShow = classes;
            },
        },
        components: {
            NotificationDropdown,
            UserDropdown,
        },
    };
</script>
