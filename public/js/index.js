
$(document).ready(function () {
  console.log("jQuery est prêt !");

  let form = $("form");

  let rgpdCheckbox = $("#checkbox-rgpd");

  $('.formulaire__error-submit').hide();
  $('#telechargement-validation').hide()

  rgpdCheckbox.change(() => {
    displayRgpdCheckboxErrorIfNecessary()
  })

  form.submit((e) => {
    e.preventDefault();
    $(".formulaire__error-submit").hide()
    $(".formulaire__submit-loader").show()
    send().then((res) => {
      download()
      $('.formulaire__error-submit').hide();
      $('#telechargement').hide();
      $('#rappel-mail').text($('#formulaire__input-email').val())
      if ($("#NEWSLETTER").is(':checked')) {
        $('#newsletter-only').show();
      } else {
        $('#newsletter-only').hide();
      }
      $('#telechargement-validation').show();
    }).catch(() => {
      $('.formulaire__error-submit').show();
    }).finally(() => {
      $(".formulaire__submit-loader").hide()
    })

  })

  $('#formulaire__input-prenom').on("keyup", () => {
    verificationPrenom()
  })

  $('#formulaire__input-nom').on("keyup", () => {
    verificationNom()
  })

  $('#formulaire__input-nombresBiens').on("keyup", () => {
    verificationNombreBiens()
  })

  $('#formulaire__input-email').on("keyup", () => {
    verificationEmail()
  })

});

async function send() {
  var formData = new FormData(document.querySelector('form'))

  formData.set("NEWSLETTER", $("#NEWSLETTER").is(':checked'))
  formData.set("RGPD", $("#checkbox-rgpd").is(':checked'))

  return axios.post('/guide-de-survie-du-bailleur/contact', formData)
}

async function download() {
  window.location = '/guide-de-survie-du-bailleur/ZG93bmxvYWQK'
}

const verificationPrenom = () => {
  let prenom = $('#formulaire__input-prenom');
  let inputPrenomError = $('#formulaire__error-prenom')

  if (prenom.val().length === 0) {
    inputPrenomError.show();
  } else {
    inputPrenomError.hide();
  }
}

const verificationNom = () => {
  let nom = $('#formulaire__input-nom');
  let inputNomError = $('#formulaire__error-nom')

  if (nom.val().length === 0) {
    inputNomError.show();
  } else {
    inputNomError.hide();
  }
}

const verificationNombreBiens = () => {
  let nombreBiens = $('#formulaire__input-nombre-biens');
  let inputNombreBiensError = $('#formulaire__error-nombre-biens')

  if (nombreBiens.val().length === 0) {
    inputNombreBiensError.show();
  } else {
    inputNombreBiensError.hide();
  }
}

const verificationEmail = () => {
  let email = $('#formulaire__input-email');
  let inputEmailError = $('#formulaire__error-email')
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (regexEmail.test(email.val())) {
    inputEmailError.hide();
  } else {
    inputEmailError.text("Veuillez renseigner un email valide")
    inputEmailError.show();
  }
}

const displayRgpdCheckboxErrorIfNecessary = () => {
  let rgpdCheckboxError = $(".formulaire__error-rgpd");
  let rgpdCheckbox = $("#checkbox-rgpd");
  if (!rgpdCheckbox.is(':checked')) {
    rgpdCheckboxError.show()
  } else {
    rgpdCheckboxError.hide()
  }
}


