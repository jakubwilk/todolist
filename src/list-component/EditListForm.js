import React from "react";
import styled from "styled-components";
import InputForm from "./../utils/FormInput";
import FormTextarea from "./../utils/FormTextarea";

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(2, auto);
`;

const EditListForm = ({ title, description, updateData }) => {
    return (
        <FormGrid>
            <InputForm 
                labelFor="title" 
                labelName="Title" 
                type="text" 
                name="title" 
                id="title" 
                groupClass="editlist editlist-title"
                value={title} 
                handleChange={updateData} 
                placeholder="List title" />
            <FormTextarea 
                labelFor="description" 
                labelName="Description" 
                name="description" 
                id="description" 
                groupClass="editlist editlist-description"
                value={description} 
                handleChange={updateData} 
                placeholder="Write something about this list yourself" />
        </FormGrid>
    );
}

export default EditListForm;