import React from "react";

export const TaskBanner = props => (
    <h4 className="taskbanner">
        {props.userName}'s Task {props.taskItems.filter(t => !t.done).length} task to do
    </h4>
)