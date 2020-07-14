import { useState, useEffect } from "react";
import axios from "axios"; 

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => { setState({...state, day}) }; // curly bc dont need it to be returned. want effects of setState. Return keyword without curly is overkill (bascially two return words, should be error)

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayObj = state.days.find(day => day.appointments.includes(id));
    const dayObjIndex = state.days.indexOf(dayObj);
    const days = state.days;
    days[dayObjIndex] = {...days[dayObjIndex], spots: dayObj.spots - 1};
    
    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => setState({...state, days, appointments}))
      .catch((error) => { return Promise.reject(error)})
  }

  function cancelInterview(id) {
    const appointment = {
        ...state.appointments[id],
        interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayObj = state.days.find(day => day.appointments.includes(id));
    const dayObjIndex = state.days.indexOf(dayObj);
    const days = state.days;
    days[dayObjIndex] = {...days[dayObjIndex], spots: dayObj.spots + 1};

    return axios.delete(`api/appointments/${id}`)
      .then(() => setState({...state, days, appointments}))
      .catch(error => { return Promise.reject(error)})
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(all => { // with curly braces, setState is not being returned. But its not supposed to be returned. 
      setState({
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);
  
  return { state: state, setDay, bookInterview, cancelInterview }
}

