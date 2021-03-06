export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    console.log('newRequest', newRequest)
    const response = await fetch(`${process.env.VUE_APP_DB_URL}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong!');
      throw error;  
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(`${process.env.VUE_APP_DB_URL}/requests/${coachId}.json?auth=${token}`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong!');
      throw error;  
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      }
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
}