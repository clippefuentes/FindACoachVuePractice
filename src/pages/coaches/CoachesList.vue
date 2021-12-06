<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isCoach" link to="/register"> Register as Coach </base-button>
        </div>
        <div v-if="isLoading">
          <base-loader> </base-loader>
        </div>
        <ul v-if="hasCoaches">
          <li v-for="coach in filteredCoaches" :key="coach.id">
            <!-- <router-link :to="'/coaches/' + coach.id"> -->
            <coach-item
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            >
            </coach-item>
            <!-- </router-link> -->
          </li>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/layout/coaches/CoachItem.vue';
import CoachFilter from '../../components/layout/coaches/CoachFilter.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      const newCoach = coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
      return newCoach;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    setFilters(newFilters) {
      this.activeFilters = newFilters;
    },
    async loadCoaches(refresh = false) { 
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something went wrong';
        this.isLoading = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>