import * as yup  from 'yup';

const FormValidationResetPassword = yup.object().shape({
  contrasena: yup
    .string()
    .label('contrasena')
    .required("La contraseña es requerida")
    .min(5, 'La contraseña debe tener mas de 5 digitos'),
  confirmcontrasena: yup
    .string()
    .oneOf([yup.ref('contrasena'), null], 'Las contraseñas no coinciden')
});

export default FormValidationResetPassword;
