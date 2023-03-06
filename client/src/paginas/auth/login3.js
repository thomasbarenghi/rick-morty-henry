import { useState } from 'react';
import { validateForm } from './validation';
//import './LoginForm.css';

function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length === 0) {
            onLogin(formData);
        } else {
            setErrors(formErrors);
        }
    }

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Nombre de usuario:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <div className="error">{errors.username}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <button type="submit">Ingresar</button>
        </form>
    );
}

export default LoginForm;
