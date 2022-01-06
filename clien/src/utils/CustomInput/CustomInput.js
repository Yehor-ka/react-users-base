import React from 'react';
import s from './CustomInput.module.scss'

const CustomInput = ({typeInput, text, value, setValue, name}) => {
    const handleChangeInput = (e) => {
        setValue(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <input className={s.input} name={name} value={value} onChange={e => handleChangeInput(e)} type={typeInput} placeholder={text} />
    );
};

export default CustomInput;
