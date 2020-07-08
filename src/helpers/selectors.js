import React from "react";

export function getAppointmentsForDay(state, day) {
  if (state.days.length > 0) {
    const dayObject = state.days.find(el => el.name === day);
    if (dayObject) {
      const dayObjectApps = dayObject.appointments;
      const Apps = [];
      dayObjectApps.forEach(id => {
        Apps.push(state.appointments[id])
      })
      console.log(Apps)
      return Apps;
    }
    return [];
  }
  return [];
}