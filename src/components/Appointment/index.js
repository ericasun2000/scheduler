import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import useVisualMode from "../../hooks/useVisualMode.js"
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) { 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(err => alert(err));
  }
 
  return (
  <article key={props.id} className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        id = {props.id}
        onDelete={cancel}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />
    )}
    {mode === SAVING && (
      <Status message="Saving" />
    )}
    {mode === DELETING && (
      <Status message="Deleting" />
    )}
    {mode === CONFIRM && (
      <Confirm message="Are yoou sure you would like to delete?" />
    )}
  </article>
  )
}