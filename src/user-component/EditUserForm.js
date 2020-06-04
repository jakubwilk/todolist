import React from "react";
import styled from "styled-components";
import InputForm from "./../utils/FormInput";
import FormFile from "../utils/FormFile";
import FormTextarea from "./../utils/FormTextarea";

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(5, auto);

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, auto);
    }
`;

const UserAvatar = styled.div`
    text-align: center;
    margin-bottom: 1.5rem;

    @media screen and (min-width: 768px) {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > img {
        width: 125px;
        height: 125px;
        border-radius: 50%;
    }
`;

const EditUserForm = ({ first_name, last_name, email, avatar, description, updateData, updateFile }) => {
    return (
        <FormGrid>
            <UserAvatar>
                <img src={avatar} alt={first_name} />
            </UserAvatar>
            <FormFile 
                labelFor="file" 
                labelName="Change your photo" 
                type="file" 
                name="file" 
                id="file" 
                groupClass="editprofile editprofile-file"
                handleChange={updateFile} />
            <InputForm 
                labelFor="email" 
                labelName="Email Address" 
                type="text" 
                name="email" 
                id="email" 
                groupClass="editprofile editprofile-email"
                value={email} 
                handleChange={updateData} 
                placeholder="Enter your email address" />
            <FormTextarea 
                labelFor="description" 
                labelName="Description" 
                name="description" 
                id="description" 
                groupClass="editprofile editprofile-description"
                value={description} 
                handleChange={updateData} 
                placeholder="Write something about yourself" />
            <InputForm 
                labelFor="first_name" 
                labelName="First name" 
                type="text" 
                name="first_name" 
                id="first_name" 
                groupClass="editprofile editprofile-first-name"
                value={first_name} 
                handleChange={updateData} 
                placeholder="Enter your first name" />
            <InputForm 
                labelFor="last_name" 
                labelName="Last name" 
                type="text" 
                name="last_name" 
                id="last_name" 
                groupClass="editprofile editprofile-last-name"
                value={last_name} 
                handleChange={updateData} 
                placeholder="Enter your last name" />
        </FormGrid>
    );
}

export default EditUserForm;