import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import useVisualMode from "../../hooks/useVisualMode.js"
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) { 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, isEdit) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, isEdit)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  };

  function destroy(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };
 
  return (
  <article key={props.id} className="appointment" data-testid="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
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
      <Confirm 
        message="Are you sure you would like to delete?"
        id = {props.id}
        onDeleteConfirm={destroy}
        onDeleteCancel={() => back()}
     />
    )}
    {mode === EDIT && (
      <Form 
        interviewers={props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={(name, interviewer) => save(name, interviewer, true)}
        onCancel={() => back()}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message="Could not save appointment."
        onClose={() => back()}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Could not delete appointment."
        onClose={() => back()}
      />
    )}
  </article>
  );
};