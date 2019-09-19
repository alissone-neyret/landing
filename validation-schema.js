let yup = require('yup');


let validation = yup.object().shape({
  FNAME: yup.string().required("FNAME requis"),
  LNAME: yup.string().required("LNAME requis"),
  NOMBRE_BIENS: yup.number().min(0).required("NOMBRE_BIENS requis"),
  EMAIL: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "EMAIL n'est pas un mail valide").required("EMAIL requis"),
  RGPD: yup.boolean().test('is-always-true', "RGPD doit être true", (value) => value).required("RGPD requis"),
  NEWSLETTER: yup.boolean().required("NEWSLETTER requis")
})

module.exports = validation