export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId
    console.log(coaches)
    console.log(userId)
    console.log(coaches.some(coach => coach.id === userId))
    return coaches.some(coach => coach.id === userId);
  },

};