import React, { useState } from 'react';
import { useUserActions } from '../../hooks/user.actions';
import '../../css/authentication.css';

export default function LoginForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const userActions = useUserActions();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setErrors([]);

    const loginForm = event.currentTarget;

    if (!loginForm.checkValidity()) {
      const fieldErrors: string[] = [];
      loginForm.querySelectorAll('input, select, textarea').forEach((field: any) => {
        if (!field.checkValidity()) {
          let errorMessage = field.validationMessage;
          if (field.validity.valueMissing) {
            errorMessage = `Please fill out ${field.labels[0].textContent.toLowerCase()} field`;
          }
          fieldErrors.push(errorMessage);
        }
      });
      setErrors(fieldErrors);
      event.stopPropagation();
      return;
    }

    setValidated(true);

    const data = {
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
    };
    try {
      await userActions.login(data);
    } catch (err: any) {
      if (err.response && err.response.data) {
        const { detail } = err.response.data;
        const errorMessages = [];
        if (detail) {
          errorMessages.push(`${detail}`);
        }

        setErrors(errorMessages);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className={`form-control ${errors.length && !form.email ? 'input-error' : ''}`}
          id='email'
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder='Email'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className={`form-control ${errors.length && !form.password ? 'input-error' : ''}`}
          id='password'
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder='Password'
        />
      </div>
      <button className='btn-auth btn'>Register</button>
      {errors && (
        <div className='alert alert-danger'>
          {errors.map((errorMessage, index) => (
            <div key={index}>* {errorMessage}</div>
          ))}
        </div>
      )}
    </form>
  );
}
