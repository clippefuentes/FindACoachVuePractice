<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Receieved</h2>
        </header>
        <div v-if="isLoading">
          <base-loader> </base-loader>
        </div>
        <ul v-else-if="hasRequest && !isLoading">
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
  </div>
</template>

<script>
import RequestItem from '../../components/layout/requests/RequestItem.vue'
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
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
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/fetchRequests');
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Something failed';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
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