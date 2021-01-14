<template>
    <div>
        <navbar/>
        <main class="profile-page">
            <section class="relative block h-500-px">
                <div
                        class="absolute top-0 w-full h-full bg-center bg-cover"
                        style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80');
          "
                >
          <span
                  id="blackOverlay"
                  class="w-full h-full absolute opacity-50 bg-black"
          ></span>
                </div>
                <div
                        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style="transform: translateZ(0);"
                >
                    <svg
                            class="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                    >
                        <polygon
                                class="text-gray-300 fill-current"
                                points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>
            </section>
            <section class="relative py-16 bg-gray-300">
                <div class="container mx-auto px-4">
                    <div
                            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
                    >
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div
                                        class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                                >
                                    <div class="relative">
                                        <img
                                                alt="..."
                                                id="ProfilePic"
                                                :src="fileInfos[fileInfos.length - 1] ? fileInfos[fileInfos.length - 1].url : 'https://picsum.photos/200/300'"
                                                class="shadow-xl rounded-full h-auto align-middle border-none -mt-32"
                                        />
                                        <div>
                                            <div v-if="currentFile" class="progress">
                                                <div
                                                        class="progress-bar progress-bar-info progress-bar-striped"
                                                        role="progressbar"
                                                        :aria-valuenow="progress"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        :style="{ width: progress + '%' }"
                                                >
                                                    {{ progress }}%
                                                </div>
                                            </div>

                                            <label class="">
                                                <input type="file" ref="file" @change="selectFile"/>
                                            </label>

                                            <button class="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700"
                                                    :disabled="!selectedFiles" @click="upload">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-center text-center mt-12">
                                <h3 v-if="!edit"
                                    class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                                >
                                    {{user.username}}
                                </h3>
                                <formulate-input v-if="edit" v-model="user.username" type="text"
                                                 label="Name"></formulate-input>
                                <h3 v-if="!edit"
                                    class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                                >
                                    {{user.email}}
                                </h3>
                                <div v-if="!edit"
                                     class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase"
                                >
                                    <i
                                            class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"
                                    ></i>
                                    {{user.location}}
                                </div>
                                <formulate-input v-if="edit" v-model="user.location" type="text"
                                                 label="Location"></formulate-input>
                                <div class="mb-2 text-gray-700 mt-10">
                                    <i class="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                    {{user.roles[0].name}}
                                </div>
                                <div v-if="!edit" class="mb-2 text-gray-700">
                                    <i class="fas fa-university mr-2 text-lg text-gray-500"></i>
                                    {{user.institution}}
                                </div>
                                <formulate-input v-if="edit" v-model="user.institution" type="text"
                                                 label="Institution"></formulate-input>
                            </div>
                            <div class="mt-10 py-10 border-t border-gray-300 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4 flex flex-col justify-center items-center">
                                        <p v-if="!edit" class="mb-4 text-lg leading-relaxed text-gray-800">
                                            {{user.bio}}
                                        </p>
                                        <formulate-input v-if="edit" v-model="user.bio" type="text"
                                                         label="Bio"></formulate-input>
                                        <div class="flex justify-end">
                                            <button @click="edit = !edit"
                                                    class="bg-green-500 rounded-lg shadow-lg px-4 py-2 text-white">
                                                {{!edit ? "Edit" : "Cancel"}}
                                            </button>
                                            <button v-if="edit" @click="save"
                                                    class="bg-blue-500 rounded-lg shadow-lg px-4 py-2 text-white ml-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer-component/>
    </div>
</template>
<script>
    import Navbar from "@/components/Navbars/AuthNavbar.vue";
    import FooterComponent from "@/components/Footers/Footer.vue";

    import axios from 'axios';
    import UploadService from "../service/UploadFilesService";

    export default {
        data() {
            return {
                user: {
                    id: "",
                    username: "",
                    password: "",
                    email: "",
                    location: "",
                    bio: "",
                    institution: "",
                    roles: [],
                    quizzes: []
                },
                selectedFiles: undefined,
                currentFile: undefined,
                progress: 0,
                message: "",
                edit: false,
                fileInfos: []
            };
        },
        created() {
            axios.get("https://quizzy-api-v1.herokuapp.com/users/" + localStorage.getItem("user_id"))
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    this.$toastr("error", error.message)
                })
        },
        mounted() {
            UploadService.getFiles().then(response => {
                this.fileInfos = response.data;
            });
        },
        methods: {
            selectFile() {
                this.selectedFiles = this.$refs.file.files;
            },
            upload() {
                this.progress = 0;

                this.currentFile = this.selectedFiles.item(0);
                UploadService.upload(this.currentFile, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total);
                })
                    .then(response => {
                        this.message = response.data.message;
                        return UploadService.getFiles();
                    })
                    .then(files => {
                        this.fileInfos = files.data;
                        //document.getElementById("profilePic").src = this.fileInfos[this.fileInfos.length - 1].url;
                    })
                    .catch(() => {
                        this.progress = 0;
                        this.message = "Could not upload the file!";
                        this.currentFile = undefined;
                    });

                this.selectedFiles = undefined;
            },
            save() {
                axios.put("https://quizzy-api-v1.herokuapp.com/users/" + localStorage.getItem("user_id"), {
                    id: localStorage.getItem("user_id"),
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    location: this.user.location,
                    institution: this.user.institution,
                    bio: this.user.bio,
                    roles: this.user.roles,
                    quizzes: this.user.quizzes
                })
                    .then(() => {
                        this.edit = false;
                        this.$toastr("success", "Successfully changed info")
                    })
                    .catch(error => {
                        this.$toastr("error", error.message)
                    })
            }
        },
        components: {
            Navbar,
            FooterComponent,
        },
    };
</script>
