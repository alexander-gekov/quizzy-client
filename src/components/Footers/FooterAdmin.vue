<template>
  <footer class="block py-4">
    <div class="container mx-auto px-4">
      <hr class="mb-4 border-b-1 border-gray-300" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-10/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="https://www.creative-tim.com?ref=vtw-footer-admin"
                class="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Play now!
              </a>
            </li>
            <li>
              <a
                href="https://www.creative-tim.com/presentation?ref=vtw-footer-admin"
                class="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
