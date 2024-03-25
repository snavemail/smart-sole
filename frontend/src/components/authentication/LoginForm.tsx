import React, { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/user.actions';
import '../../css/authentication.css';
import { validateLoginPage } from '../../utils/validateField';
import EyeIcon from '../../icons/EyeIcon';
import EyeOffIcon from '../../icons/EyeOffIcon';
import { authErrorToast } from '../../toasts';

export default function LoginForm() {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [inputErrors, setInputErrors] = useState({
    email: '',
    password: '',
  });

  const userActions = useUserActions();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleInputBlur = (fieldName: 'email' | 'password') => {
    const errorMessage = validateLoginPage(form, fieldName, form[fieldName]);
    setInputErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const loginForm = event.currentTarget;

    if (!loginForm.checkValidity()) {
      event.stopPropagation();
      return;
    }

    const data = {
      email: form.email,
      password: form.password,
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
        authErrorToast(errorMessages.join(', '));
      }
    }
  };

  useEffect(() => {
    if (form.email && form.password && !inputErrors.email && !inputErrors.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [form, inputErrors]);

  return (
    <form noValidate onSubmit={handleSubmit} action='#'>
      <h1>Login</h1>
      <div className='form-group'>
        <input
          type='email'
          className={`form-control ${inputErrors.email ? 'input-error' : ''}`}
          id='email'
          required
          autoFocus
          onBlur={() => handleInputBlur('email')}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder='Email'
        />
        {inputErrors.email && <div className='error-message'>{inputErrors.email}</div>}
      </div>
      <div className='form-group'>
        <div className={`password-wrapper ${inputErrors.password ? 'input-error' : ''}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control `}
            id='password'
            required
            onBlur={() => handleInputBlur('password')}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder='Password'
          />
          <button type='button' className='show-password-btn' onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {inputErrors.password && <div className='error-message'>{inputErrors.password}</div>}
      </div>
      <div className='remember-forgot'>
        <label htmlFor=''>
          <input type='checkbox' />
          Remember me
        </label>
        <a href='#'>Forgot Password?</a>
      </div>
      <button className={`btn-auth btn`} disabled={buttonDisabled}>
        Sign In
      </button>
      <div className='register-link'>
        <p>
          Don't have an account? <a href='/register'>Register</a>
        </p>
      </div>
    </form>
  );
}
