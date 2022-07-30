import ErrorMessage from "../ErrorMessage/ErrorMessage";
import React, { useState, useEffect } from "react";
import useInput from '../../hooks/useInput';

const Form = () => {
  
  const name = useInput('', {isName: true})
  const email = useInput('', {isEmpty: true, minLength: 5, isEmail: true});
  const birthday = useInput('', {isEmpty: true});
  const message = useInput('', {minLength: 10, maxLength: 300, isEmpty: true})
  const phoneNumber = useInput('', {isPhone: false});
  const [isButton, setButton] = useState(true);
  const [reqStatus, setReqStatus] = useState();
  
  const handleForm = async (e) => {
    e.preventDefault();
    setButton(true);
    const data: {name: string, email: string, phoneNumber: string, birthday: string, message: string} = {
      name: e.target.name.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      birthday: e.target.birthday.value,
      message: e.target.message.value,
    };
    
    const response = await fetch('http://localhost:3500/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    const result = await response.json();
    setReqStatus(result.status);
    name.resetValue();
    email.resetValue();
    birthday.resetValue();
    message.resetValue();
    phoneNumber.resetValue();
    setButton(false);
  }
  
  useEffect(() => {
    if (!name.isInputValid || !email.isInputValid || !message.isInputValid || !phoneNumber.isInputValid || !birthday.isInputValid) {
      setButton(true);
    } else {
      setButton(false)
    }
  }, [name.isInputValid, email.isInputValid, message.isInputValid, phoneNumber.isInputValid, birthday.isInputValid])
  
  return (
    <form onSubmit={handleForm}>
      <label htmlFor='name'>Имя Фамилия:</label>
      <input type='text' id='name' value={name.value} onChange={name.onChange} />
      {name.isNameError && name.isEndChanges ? <ErrorMessage message='Имя или фамилия введены некоректно.' /> : null}
      
      <label htmlFor='email'>EMAIL:</label>
      <input type='text' id='email' onChange={email.onChange} value={email.value} />
      {email.isEmptyError && email.isEndChanges ? <ErrorMessage message='Поле не может быть пустым.' /> : null}
      {email.minLengthError && email.isEndChanges ? <ErrorMessage message='Минимум 5 символов.' /> : null}
      {email.isEmailError && email.isEndChanges ? <ErrorMessage message='Email введен некоректно.' /> : null}
      
      <label htmlFor='phoneNumber'>Номер телефона:</label>
      <input type='text' id='phoneNumber' value={phoneNumber.value} onChange={phoneNumber.onChange} />
      {phoneNumber.isPhoneNumberError && phoneNumber.isEndChanges ? <ErrorMessage message='Номер введен некоректно.' /> : null}
      
      <label htmlFor='birthday'>День рождения</label>
      <input type='date' id='birthday' onChange={birthday.onChange} value={birthday.value} />
      {birthday.isEmptyError ? <ErrorMessage message='Выберите дату рождения.' /> : null}
      
      <label htmlFor='message'>Сообщение:</label>
      <textarea id='message' placeholder='Введите сообщение' value={message.value} onChange={message.onChange} />
      {message.maxLengthError && message.isEndChanges ? <ErrorMessage message='Максимальная длинна сообщения 300 символов.' /> : null}
      {message.minLengthError && message.isEndChanges ? <ErrorMessage message='Минимальная длинна сообщения 10 символов.' /> : null}
      {message.isEmptyError && message.isEndChanges ? <ErrorMessage message='Оставьте сообщение.' /> : null}
      <button type='submit' disabled={isButton}>Отправить</button>
      {reqStatus === 'success' ? <div>Форма отправлена успешно</div> : reqStatus === 'error' ?  <div>Ошибка в отправке формы</div> : null}
    </form>
  )
};

export default Form;
