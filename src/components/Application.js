import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios"; 
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js"

export default function Application(props) {
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

    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => setState({...state, appointments}))
      .catch((error) => { return Promise.reject(error)})
  }

  // return (       axios.delete(`/api/appointments/${id}`)         .then((response) => {           setState({...state, appointments})         })         .catch((error) => {           return Promise.reject(error);         })     )

  function cancelInterview(id) {
    const appointment = {
        ...state.appointments[id],
        interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
      .catch(error => { return Promise.reject(error)})
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then(all => { // with curly braces, setState is not being returned. But its not supposed to be returned. 
      setState({
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  const appointmentElements = interviewers && appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentElements}
      </section>
    </main>
  );
}

