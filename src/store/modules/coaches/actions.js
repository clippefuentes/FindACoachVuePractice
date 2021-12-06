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
    const response = await fetch(`https://vue-test-project-3674b-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
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
  async loadCoaches(context) {
    const response = await fetch(`https://vue-test-project-3674b-default-rtdb.firebaseio.com/coaches.json`)
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
  },
};