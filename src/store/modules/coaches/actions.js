export default {
  async registerCoach(context, data) {
    console.log(context.rootGetter)
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const token = context.rootGetters.token;
    const response = await fetch(`${process.env.VUE_APP_DB_URL}/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });
    // const responseData = await response.json();
    if (!response.ok) {
      // Error
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(`${process.env.VUE_APP_DB_URL}/coaches.json`)
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Error loading coaches');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      }
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp')
  },
};