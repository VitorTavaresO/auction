import './Login.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Image } from 'primereact/image';
import logo from './logo.png';

const Login = () => {
    return (
        <div className="login flex align-items-center justify-content-center">
            <Card className="md:w-25rem flex flex-column align-items-center justify-content-center text-center">
                <Image src={logo} alt="Logo" width="250" className="logo mb-3" />
                <h2>Login</h2>
                <FloatLabel className="w-full mb-3 margin-label">
                    <InputText className="w-full" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className="w-full mb-3 margin-label">
                    <Password toggleMask className="w-full" />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <Button label="Forget Password?" link onClick={() => window.open('#', '_blank')} className="mb-3" />
                <Button label="Submit" className="w-full" />
            </Card>
        </div>
    );
};

export default Login;