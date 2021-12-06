<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Receieved</h2>
      </header>
      <ul v-if="hasRequest">
        <request-item
          v-for="request in receivedRequests" :key="request.id"
          :request="request"
          :email="request.userEmail"
          :message="request.message"
        />
      </ul>
      <h3 v-else>You haven't receieved any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/layout/requests/RequestItem.vue'
export default {
  components: {
    RequestItem
  },
  computed: {
    receivedRequests() {
      console.log(this.$store.getters['requests/requests'][0])
      return this.$store.getters['requests/requests'];
    },
    hasRequest() {
      return this.$store.getters['requests/hasRequests'];
    }
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>