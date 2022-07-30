import { useState } from "react";
import useValidate from "./useValidate";

const useInputWithValidate = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isEndChanges, setEndChanges] = useState(false);
  
  const values = useValidate(value, validations);
  
  const onChange = (event) => {
    setValue(event.target.value);
    setEndChanges(true);
  }
  
  
  return {value, isEndChanges, onChange, ...values}
}

export default useInputWithValidate;
