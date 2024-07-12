import React, {useState, useEffect} from 'react'
import Counter from '../components/Counter.jsx'
import PostItem from '../components/PostItem.jsx'
import InputField from '../components/InputField.jsx'
import ButtonItem from '../components/ButtonItem.jsx'

function Registration(props)
{
    return (
        <div className="Registration">

      <div className="Registration__head">
        <div className="Registration__head__content">
          this is head
        </div>
      </div>

      <div className="Registration__content">
        <InputField className="Registration_content__input_firstName"
          title="Введите имя" 
          hint={<i>Поле обязательно для заполнения*</i>}
        />

        <InputField className="Registration_content__input_lastName"
          title="Введите Фамилию" 
          hint={<i>Поле обязательно для заполнения*</i>}
        />

        <InputField className="Registration_content__input_birthdate"
          title="Введите дату рождения" 
          hint={<i>Поле обязательно для заполнения*</i>}
        />

        <InputField className="Registration_content__input_email"
          title="Введите адрес электронной почты" 
          hint={<i>Поле обязательно для заполнения*</i>}
        />

      </div>

    </div>
    )
}

export default Registration;