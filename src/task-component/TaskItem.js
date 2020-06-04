import React from "react";
import styled from "styled-components";

const InputGrid = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20px auto 70px;
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const TaskCheckbox = styled.input`
    margin-top: auto;
    margin-bottom: auto;
`;

const TaskTitle = styled.p`
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-bottom: 0;

    &.finished {
        user-select: none;
		pointer-events: none;
		opacity: .6;
    }
`;

const DeleteButton = styled.button`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 5px;
    background-color: #e74c3c;
    color: #fff;
    height: 26px;
    width: 70px;
    font-size: 14px;
	transition: all .1s ease-in-out;

	&:hover,
	&:focus {
		outline: none;
		background-color: #c0392b;
	}
`;

const TaskItem = ({ taskId, title, finished, markTask, deleteTask }) => {
    return (
        <InputGrid>
            <TaskCheckbox type="checkbox" name="task" checked={finished ? "checked" : null} data-id={taskId} onChange={markTask} />
            <TaskTitle className={finished ? "finished" : null}>{title}</TaskTitle>
            <DeleteButton data-id={taskId} onClick={deleteTask}>Delete</DeleteButton>
        </InputGrid>
    );
}
export default TaskItem;