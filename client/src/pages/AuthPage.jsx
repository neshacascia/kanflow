import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { baseURL } from '../api';

import kanflowImg from '../../public/assets/kanflow-img.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AuthPage() {
  const authValue = localStorage.getItem('authValue');
  const { changeAuthValue } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validationSchema = {
    email: value => value.trim() !== '' && value.includes('@'),
    password: value => value.trim() !== '' && value.length >= 8,
    confirmPassword: (value, formInputs) => value === formInputs.password,
  };

  function validateField(name, value, formInputs) {
    return validationSchema[name](value, formInputs);
  }

  function isFieldNotValid(name, value, formInputs, touched) {
    return !validateField(name, value, formInputs) && touched[name];
  }

  const emailNotValid = isFieldNotValid(
    'email',
    formInputs.email,
    formInputs,
    formTouched
  );

  const passwordNotValid = isFieldNotValid(
    'password',
    formInputs.password,
    formInputs,
    formTouched
  );

  const confirmPasswordLengthValid =
    formInputs.confirmPassword.trim() !== '' &&
    formInputs.confirmPassword.length >= 8;

  const confirmPasswordNotValid =
    !confirmPasswordLengthValid && formTouched.confirmPassword;

  const formIsValid =
    authValue === 'login'
      ? validateField('email', formInputs.email, formInputs) &&
        validateField('password', formInputs.password, formInputs)
      : validateField('email', formInputs.email, formInputs) &&
        validateField('password', formInputs.password, formInputs) &&
        validateField(
          'confirmPassword',
          formInputs.confirmPassword,
          formInputs
        );

  const [passwordsMatch, setPasswordsMatch] = useState();

  useEffect(() => {
    setPasswordsMatch(formInputs.password === formInputs.confirmPassword);
  }, [formInputs.password, formInputs.confirmPassword]);

  const [errorMessages, setErrorMessages] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormInputs(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleInputTouched(e) {
    const { name } = e.target;

    setFormTouched(prevState => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  function changeAuthMethod() {
    setPasswordsMatch(true);
    changeAuthValue(authValue);
  }

  function handleTogglePassword(name) {
    setPasswordVisibility(prevState => {
      return {
        ...prevState,
        [name]: !prevState[name],
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseURL}/${authValue}`,
        {
          email: formInputs.email,
          password: formInputs.password,
          confirmPassword: formInputs.confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        navigate('/board');
      }
    } catch (err) {
      console.error(err);
      setErrorMessages(err.response.data.msg);
    }
  }

  return (
    <section className="h-screen relative flex flex-col items-center justify-center pt-44 mb-28 md:flex-row md:justify-between lg:justify-between md:pt-20 md:-mb-28">
      <img src={kanflowImg} className="h-44 md:h-60 md:pl-4 lg:h-80 xl:pl-20" />
      <div className="md:bg-[#E6E6E6] md:w-[45%] md:h-full flex flex-col items-center md:items-center justify-center gap-3 rounded-lg py-5 md:py-8 md:px-4">
        <h2 className="text-xl font-home md:text-3xl font-bold tracking-wide">
          {authValue === 'login' ? 'Login' : 'Create an Account'}
        </h2>

        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col items-center gap-4 pt-2 md:gap-5 md:pt-2 max-w-[400px]"
        >
          <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
            Email Address
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              onChange={handleInputChange}
              onBlur={handleInputTouched}
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 border-[1px] rounded py-[10px] px-4 focus:outline-none focus:ring-1 focus:ring-mainPurple ${
                emailNotValid ? 'border-deleteRed' : 'border-gray-300'
              }`}
            />
            {emailNotValid && (
              <span className="text-deleteRed text-xs flex pb-1">
                Please enter a valid email.
              </span>
            )}
          </label>
          <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
            Password
            <div
              className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 flex items-center justify-between border-[1px] rounded focus-within:ring-1 focus-within:ring-mainPurple ${
                passwordNotValid ||
                (!passwordsMatch &&
                  formTouched.password &&
                  formTouched.confirmPassword)
                  ? 'border-deleteRed'
                  : 'border-gray-300'
              }`}
            >
              <input
                type={passwordVisibility.password ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                onChange={handleInputChange}
                onBlur={handleInputTouched}
                className="w-full h-full rounded py-[13px] px-4 focus:outline-none"
              />
              <FontAwesomeIcon
                icon={passwordVisibility.password ? faEyeSlash : faEye}
                onClick={() => handleTogglePassword('password')}
                className="text-gray-400 pr-4 cursor-pointer"
              />
            </div>
            {passwordNotValid && (
              <span className="text-deleteRed text-xs flex pb-1">
                Password must have a minimum of 8 characters.
              </span>
            )}
          </label>
          {authValue === 'signup' && (
            <label className="text-veryDarkGrey text-[13px] font-semibold w-72 flex flex-col gap-2 md:w-full">
              Confirm Password
              <div
                className={`bg-white text-veryDarkGrey placeholder:text-gray text-[13px] font-light leading-6 flex items-center justify-between border-[1px] rounded focus-within:ring-1 focus-within:ring-mainPurple ${
                  confirmPasswordNotValid ||
                  (!passwordsMatch &&
                    formTouched.password &&
                    formTouched.confirmPassword)
                    ? 'border-deleteRed'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type={
                    passwordVisibility.confirmPassword ? 'text' : 'password'
                  }
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleInputChange}
                  onBlur={handleInputTouched}
                  className="w-full h-full rounded py-[13px] px-4 focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={passwordVisibility.confirmPassword ? faEyeSlash : faEye}
                  onClick={() => handleTogglePassword('confirmPassword')}
                  className="text-gray-400 pr-4 cursor-pointer"
                />
              </div>
              {confirmPasswordNotValid && (
                <span className="text-deleteRed text-xs flex">
                  Password must have a minimum of 8 characters.
                </span>
              )}
            </label>
          )}
          {authValue === 'signup' &&
            !passwordsMatch &&
            formTouched.password &&
            formTouched.confirmPassword && (
              <span className="text-deleteRed text-xs font-semibold">
                Uh oh! The passwords you entered do not match.
              </span>
            )}
          {errorMessages && (
            <p className="text-deleteRed text-xs font-semibold">
              {errorMessages}
            </p>
          )}
          <button
            type="submit"
            disabled={!formIsValid}
            className="text-white bg-mainPurple font-semibold tracking-wide leading-6 py-3 enabled:hover:bg-mainPurpleHover mt-5 w-full"
          >
            {authValue === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="text-gray-700 text-sm pt-2 md:pt-6">
          {authValue === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <Link
            className="text-black font-semibold"
            to={authValue === 'signup' ? '/login' : '/signup'}
            onClick={changeAuthMethod}
          >
            {authValue === 'signup' ? 'Login' : 'Signup'} Now
          </Link>
        </p>
      </div>
    </section>
  );
}
