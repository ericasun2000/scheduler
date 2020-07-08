import React, { useState } from "react";
import InterviewerList from "../InterviewerList.js"
import Button from "../Button.js"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // each setInterview function is different (id is changing and its not available here. Its available in child component)
  // const setInterviewHelper = id => {
  //   setInterviewer(id);
  // }
  
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            onChange={event => setName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => props.onSave(name, props.interviewers.find((item) => item.id === interviewer).name)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};
