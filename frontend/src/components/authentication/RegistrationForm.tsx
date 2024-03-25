import React, { useState } from 'react';
import { useUserActions } from '../../hooks/user.actions';
import '../../css/authentication.css';

export default function RegistrationForm() {
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

    const registrationForm = event.currentTarget;

    if (!registrationForm.checkValidity()) {
      const fieldErrors: string[] = [];
      registrationForm.querySelectorAll('input, select, textarea').forEach((field: any) => {
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
      await userActions.register(data);
    } catch (err: any) {
      if (err.response && err.response.data) {
        const { email, password } = err.response.data;
        const errorMessages = [];
        if (email) {
          errorMessages.push(`Email: ${email.join(', ')}`);
        }

        if (password) {
          errorMessages.push(`Password: ${password.join(', ')}`);
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
      <div className='form-group'>
        <label htmlFor='first_name'>First Name</label>
        <input
          type='text'
          className={`form-control ${errors.length && !form.first_name ? 'input-error' : ''}`}
          id='first_name'
          required
          onChange={e => setForm({ ...form, first_name: e.target.value })}
          placeholder='First Name'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='last_name'>Last Name</label>
        <input
          type='text'
          className={`form-control ${errors.length && !form.last_name ? 'input-error' : ''}`}
          id='last_name'
          required
          onChange={e => setForm({ ...form, last_name: e.target.value })}
          placeholder='Last Name'
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
