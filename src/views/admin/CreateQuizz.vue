<template>
    <div class="grid grid-cols-6 gap-8">
        <a href="#" class="bg-white shadow-lg px-4 py-10 text-center rounded-lg hover:bg-indigo-500 hover:text-white transition-colors ease-in-out duration-300">
            <div class="text-xl font-bold">Quizz name</div>
            <div class="flex justify-center my-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
            </div>
            <div>
                <ol>
                    <li>Info 1</li>
                    <li>Info 2</li>
                    <li>Info 3</li>
                </ol>
            </div>
        </a>
        <router-link to="/quizz/build" class="bg-gray-300 shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-500 hover:text-white transition-colors duration-300">
            <div class="text-2xl font-bold ">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
        </router-link>

    </div>
</template>

<script>
    export default {
        name: "CreateQuizz"
    }
</script>

<style scoped>

</style>
