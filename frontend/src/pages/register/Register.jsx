import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import './Register.css';

const Register = () => {
    return (
        <div className="flex align-items-center justify-content-center bg-yellow-100">
            <Card className="m-5 sm:w-30rem md:w-40rem lg:w-50rem xl:w-60rem flex flex-column align-items-center justify-content-center text-center">
            <Image src="./images/logo.png" alt="Logo" width="250" className="logo mb-3" />
                <h2>Register</h2>
                <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
                    <InputText className="w-full" />
                    <label htmlFor="first-name">First Name</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <InputText className="w-full" />
                    <label htmlFor="last-name">Last Name</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <Calendar className="w-full" />
                    <label htmlFor="birthday">Birthday</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <InputText keyfilter="email" className="w-full" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <InputText keyfilter="int" className="w-full" />
                    <label htmlFor="phone">Phone</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <Password toggleMask className="w-full" />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-5">
                    <Password toggleMask className="w-full" />
                    <label htmlFor="confirm-password">Confirm Password</label>
                </FloatLabel>
                <Button label="Cancel" className="mb-4 mt-5 w-full bg-red-500 border-red-500" />
                <Button label="Submit" className="mb-4 w-full bg-green-500 border-green-500" />
            </Card>
        </div>
    );
};

export default Register;