<template>
    <div class="flex bg-gray-900 min-h-screen justify-center mt-32">
        <div class="bg-white w-1/3 mb-64 rounded-lg p-10 mt-24 flex-col justify-between">
            <div class="flex">
                <svg class="w-10 h-10 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                <div class="text-2xl font-bold">Add Question</div>
            </div>
            <div class="flex-col mt-16">
                <FormulateInput type="text" label="1. Question" />
            </div>
            <div class="flex-col mt-10 mb-12">
                <FormulateInput
                        :options="{first: 'Maths', second: 'Biology', third: 'Arts', fourth: 'Other'}"
                        type="checkbox"
                        label="Answers"
                />
            </div>
            <hr>
            <div class="flex justify-end mt-12">
                <button class="px-6 py-2 bg-gray-300 text-center rounded-lg mr-10 focus:outline-none hover:bg-gray-500" @click="this.$router.push({path: '/home'})">Back</button>
                <FormulateInput type="submit" >Add</FormulateInput>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuizBuilder"
    }
</script>

<style scoped>
</style>
