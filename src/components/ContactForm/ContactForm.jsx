import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import s from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();

 const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(50, 'Максимум 50 символів')
      .required('Необхідно заповнити'),
    number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Недійсний номер телефону')
      .min(3, 'Мінімум 3 цифри')
      .max(50, 'Максимум 50 цифр')
      .required('Необхідно заповнити'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Ім'я
          <Field className={s.input} name="name" />
          <ErrorMessage className={s.error} name="name" component="div" />
        </label>
        <label className={s.label}>
          Номер телефону
          <Field className={s.input} name="number" />
          <ErrorMessage className={s.error} name="number" component="div" />
        </label>
        <button className={s.button} type="submit">Додати</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;