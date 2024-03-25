import React, { useEffect, useState } from 'react';
import { useUserActions } from '../../hooks/user.actions';
import '../../css/authentication.css';
import { validateRegisterPage } from '../../utils/validateField';
import EyeIcon from '../../icons/EyeIcon';
import EyeOffIcon from '../../icons/EyeOffIcon';
import { authErrorToast } from '../../toasts';

export default function RegistrationForm() {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [inputErrors, setInputErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const userActions = useUserActions();

  const handleInputBlur = (
    fieldName: 'email' | 'password' | 'first_name' | 'last_name' | 'confirm_password',
  ) => {
    const errorMessage = validateRegisterPage(form, fieldName, form[fieldName]);
    setInputErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
    if (fieldName === 'password' && form.password.length === 0) {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is required',
      }));
    } else if (fieldName === 'confirm_password' && form.confirm_password.length === 0) {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        confirm_password: 'Confirm Password is required',
      }));
    } else if (
      (fieldName === 'confirm_password' || fieldName === 'password') &&
      form.confirm_password === form.password
    ) {
      setInputErrors(prevErrors => ({
        ...prevErrors,
        confirm_password: '',
        password: '',
      }));
    } else if (
      (fieldName === 'confirm_password' || fieldName === 'password') &&
      form.confirm_password !== form.password
    ) {
      console.log('passwords match');
      setInputErrors(prevErrors => ({
        ...prevErrors,
        confirm_password: 'Passwords do not match',
        password: 'Passwords do not match',
      }));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const registrationForm = event.currentTarget;

    if (!registrationForm.checkValidity()) {
      event.stopPropagation();
      return;
    }

    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
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
        authErrorToast(errorMessages.join(', '));
      }
    }
  };

  useEffect(() => {
    if (
      form.email &&
      form.password &&
      form.confirm_password &&
      form.first_name &&
      form.last_name &&
      !inputErrors.email &&
      !inputErrors.password &&
      !inputErrors.confirm_password &&
      !inputErrors.first_name &&
      !inputErrors.last_name
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [form, inputErrors]);

  return (
    <form noValidate onSubmit={handleSubmit} autoComplete={'true'}>
      <h1>Register</h1>
      <div className='form-group'>
        <input
          type='text'
          className={`form-control ${inputErrors.first_name ? 'input-error' : ''}`}
          id='first_name'
          required
          autoFocus
          onBlur={() => handleInputBlur('first_name')}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
          placeholder='First Name'
        />
        {inputErrors.first_name && <div className='error-message'>{inputErrors.first_name}</div>}
      </div>
      <div className='form-group'>
        <input
          type='text'
          className={`form-control ${inputErrors.last_name ? 'input-error' : ''}`}
          id='last_name'
          required
          onBlur={() => handleInputBlur('last_name')}
          onChange={e => setForm({ ...form, last_name: e.target.value })}
          placeholder='Last Name'
        />
        {inputErrors.last_name && <div className='error-message'>{inputErrors.last_name}</div>}
      </div>
      <div className='form-group'>
        <input
          type='email'
          className={`form-control ${inputErrors.email ? 'input-error' : ''}`}
          id='email'
          required
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
          <button
            type='button'
            className='show-password-btn'
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {inputErrors.password && <div className='error-message'>{inputErrors.password}</div>}
      </div>
      <div className='form-group'>
        <div className={`password-wrapper ${inputErrors.confirm_password ? 'input-error' : ''}`}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className={`form-control`}
            id='confirm-password'
            required
            onBlur={() => handleInputBlur('confirm_password')}
            onChange={e => setForm({ ...form, confirm_password: e.target.value })}
            placeholder='Confirm Password'
          />
          <button
            type='button'
            className='show-password-btn'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {inputErrors.confirm_password && (
          <div className='error-message'>{inputErrors.confirm_password}</div>
        )}
      </div>
      <button className='btn-auth btn' disabled={buttonDisabled}>
        Register
      </button>
      <div className='register-link'>
        <p>
          Already have an account? <a href='/login/'>Sign in</a>
        </p>
      </div>
    </form>
  );
}
