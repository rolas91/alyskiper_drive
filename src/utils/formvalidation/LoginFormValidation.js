import * as yup  from 'yup';

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label('Usuario')
      .email("Ingrese un correo valido")
      .required("El correo es requerido"),
    password: yup
      .string()
      .label('Password')
      .required("La contraseña es requerida")
      .min(5, 'La contraseña debe tener mas de 5 digitos')
});

export default validationSchema;

// function getValidationSchema(values) {
//     return Yup.object().shape({
//       password: Yup.string()
//       .required('Ingresa la contrasena'),
//       username: Yup.string()
//       .email('Correo invalido')
//       .required('Ingrese el usuario')
//     });
// }

// function getErrorsFromValidationError(validationError) {
//     const FIRST_ERROR = 0;
//     return validationError.inner.reduce((errors, error) => {
//       return {
//         ...errors,
//         [error.path]: error.errors[FIRST_ERROR]
//       };
//     }, {});
// }

// export default function validate(values) {
//     const validationSchema = getValidationSchema(values);
//     try {
//       validationSchema.validateSync(values, { abortEarly: false });
//       return {};
//     } catch (error) {
//       return getErrorsFromValidationError(error);
//     }
// }
