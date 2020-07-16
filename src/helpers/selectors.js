export function getAppointmentsForDay(state, day) {
  if (state.days.length > 0) {
    const dayObject = state.days.find(el => el.name === day);
    if (dayObject) {
      const dayObjectApps = dayObject.appointments;
      const Apps = [];
      dayObjectApps.forEach(id => {
        Apps.push(state.appointments[id])
      })
      return Apps;
    }
    return [];
  }
  return [];
};

export function getInterview(state, interview) {
  if (interview) {
    const interviewerId = interview.interviewer;
    const interviewerObj = state.interviewers[interviewerId];
    const interviewObj = {...interview, interviewer:interviewerObj};
    return interviewObj;
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  if (state.days.length > 0) {
    const dayObject = state.days.find(el => el.name === day);
    if (dayObject) {
      const dayObjectInterviewerIds = dayObject.interviewers;
      const Ints = [];
      dayObjectInterviewerIds.forEach(id => {
        Ints.push(state.interviewers[id])
      });
      return Ints;
    }
    return [];
  };
  return [];
};