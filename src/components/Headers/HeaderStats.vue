<template>
  <!-- Header -->
  <div class="relative pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="1st Places"
              :statTitle="first_places"
              statArrow=""
              statPercent=""
              statPercentColor="text-green-500"
              statDescripiron=""
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL POINTS"
              :statTitle="points"
              statArrow=""
              statPercent=""
              statPercentColor="text-green-500"
              statDescripiron=""
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="GAMES PLAYED"
              :statTitle="games_played"
              statArrow=""
              statPercent=""
              statPercentColor="text-orange-500"
              statDescripiron=""
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="RANK"
              :statTitle="ranking"
              statArrow=""
              statPercent=""
              statPercentColor="text-green-500"
              statDescripiron=""
              statIconName="fas fa-percent"
              statIconColor="bg-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  components: {
    CardStats,
  },
  props: {
    first_places: Number,
    games_played: Number,
    points: Number,
    ranking: Number
  }
};
</script>
