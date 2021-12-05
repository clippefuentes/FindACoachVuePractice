<template>
  DETAILS
  <router-view></router-view>
  <router-link :to="`/coaches/${id}/contact`"> Contact </router-link>
</template>

<script>
export default {
  name: 'CoachDetails',
  data() {
    return {
      id: this.$route.params.id,
    } 
  },
  created() {
    console.log(this.$route.params.id);
  }
}
</script>

<style>

</style>