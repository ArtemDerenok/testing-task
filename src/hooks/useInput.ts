import { useState } from "react";
import useValidate from "./useValidate";

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isEndChanges, setEndChanges] = useState(false);
  
  const values = useValidate(value, validations);
  
  const onChange = (event) => {
    setValue(event.target.value);
    setEndChanges(true);
  }
  
  const resetValue = () => {
    setValue('');
    setEndChanges(false);
  }
  
  return {value, isEndChanges, onChange, resetValue, ...values}
}

export default useInput;
