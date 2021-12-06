<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        The page you are looking for does not exist.
        Check <router-link to="/">home</router-link> page.
      </p>
    </base-card>
  </section>
</template>

<script>
import BaseCard from '../components/ui/BaseCard.vue';
export default {
  components: { BaseCard },
};
</script>

<style>
</style>