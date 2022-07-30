import { useEffect, useState } from "react";

const useValidate = (value, validations) => {
  const [isEmptyError, setEmptyError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengrhError, setMaxLengthError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPhoneNumberError, setPhoneNumberError] = useState(false);
  const [isNameError, setNameError] = useState(false);
  const [isInputValid, setInputValid] = useState(false);
  
  useEffect(() => {
    for (const validation in validations) {
      switch(validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmptyError(false) : setEmptyError(true);
          break;
        case 'isEmail':
          const reg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          reg.test(value) === false ? setEmailError(true) : setEmailError(false)
          break;
        case 'isPhone': 
          const regPhone = /^((\+7|7|8)+([0-9]){10})$/;
          regPhone.test(value) === false ? setPhoneNumberError(true) : setPhoneNumberError(false);
          break; 
        case 'isName':
          const regName = /^([a-zA-Z]{3,30})+ ([a-zA-Z]{3,30})$/;
          regName.test(value) === false ? setNameError(true) : setNameError(false);
          break;
      }
    }
  }, [value])
  
  useEffect(() => {
    if (isEmptyError || isEmailError || maxLengrhError || maxLengrhError || isPhoneNumberError || isNameError) {
      setInputValid(false); 
    } else {
      setInputValid(true);
    }
  }, [isEmptyError, isEmailError, maxLengrhError, minLengthError, isPhoneNumberError, isNameError])
  
  return {isEmptyError, isEmailError, maxLengrhError, minLengthError, isPhoneNumberError, isNameError, isInputValid}
};

export default useValidate;
