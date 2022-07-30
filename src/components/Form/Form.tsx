import React from "react";
import useInputWithValidate from './../../hooks/useInputWithValidate';

const Form = () => {
  
  const name = useInputWithValidate('', {isName: true})
  const email = useInputWithValidate('', {isEmpty: true, minLength: 5, isEmail: true});
  const birthday = useInputWithValidate('', {isEmpty: true});
  const message = useInputWithValidate('', {minLength: 10, maxLength: 300, isEmpty: true})
  const phoneNumber = useInputWithValidate('', {isPhone: false});
  
  return (
    <form>
      <label htmlFor='name'>Имя Фамилия:</label>
      <input type='text' id='name' value={name.value} onChange={name.onChange} />
      {name.isNameError && name.isEndChanges ? <div>Имя или фамилия введены некоректно</div> : null}
      
      <label htmlFor='email'>EMAIL:</label>
      <input type='text' id='email' onChange={email.onChange} value={email.value} />
      {email.isEmptyError && email.isEndChanges ? <div>Поле не может быть пустым.</div> : null}
      {email.minLengthError && email.isEndChanges ? <div>Минимум 5 символов.</div> : null}
      {email.isEmailError && email.isEndChanges ? <div>Email введен некоректно.</div> : null}
      
      <label htmlFor='phoneNumber'>Номер телефона:</label>
      <input type='text' id='phoneNumber' value={phoneNumber.value} onChange={phoneNumber.onChange} />
      {phoneNumber.isPhoneNumberError && phoneNumber.isEndChanges ? <div>Номер введен некоректно</div> : null}
      
      <label htmlFor='birthday'>День рождения</label>
      <input type='date' id='birthday' onChange={birthday.onChange} value={birthday.value} />
      {birthday.isEmptyError ? <div>Выберите дату рождения.</div> : null}
      
      <label htmlFor='message'>Сообщение:</label>
      <textarea id='message' placeholder='Введите сообщение' value={message.value} onChange={message.onChange} />
      {message.maxLengrhError && message.isEndChanges ? <div>Максимальная длинна сообщения 300 символов</div> : null}
      {message.minLengthError && message.isEndChanges ? <div>Минимальная длинна сообщения 10 символов</div> : null}
      <input type='submit' disabled={!name.isInputValid} />
    </form>
  )
};

export default Form;
