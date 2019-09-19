const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const router = express.Router();
const config = require('./config')
let multer = require('multer');
let validationSchema = require('./validation-schema');
let upload = multer();
let zip = require('express-zip');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html')); 
});

router.get('/confirmation-newsletter', function (req, res) {
  res.sendFile(path.join(__dirname + '/confirmation-newsletter.html'));  
});

app.use('/', router);
app.use(express.static('public'));
app.listen(process.env.port || 3000);
console.log('App is running')

router.post('/contact', upload.fields([]),

function(req, res, next) {
  validationSchema.validate(req.body)
  .then(() => next())
  .catch((err) => {
    console.log(err)
    res.status(400)
    res.json(err)
  })
},
async function (req, res) {
  try {
    await addContact(req.body)
    res.status(200)
    res.send("Inscription prise en compte")
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

router.get('/ZG93bmxvYWQK', function(req, res) {
  res.zip([   
    { path: './private/annexe-1-decret-n-2015981.pdf', name: 'annexe-1-decret-n-2015981.pdf' },
    { path: './private/annexe-2a-bail-location-nu.docx', name: 'annexe-2a-bail-location-nu.docx' },
    { path: './private/annexe-2b-bail-location-meuble.docx', name: 'annexe-2b-bail-location-meuble.docx' },
    { path: './private/annexe-2c-bail-commun-colocation-nu.docx', name: 'annexe-2c-bail-commun-colocation-nu.docx' },
    { path: './private/annexe-2d-bail-commun-colocation-meuble.docx', name: 'annexe-2d-bail-commun-colocation-meuble.docx' },
    { path: './private/annexe-2e-bail-individuel-colocation-nu.docx', name: 'annexe-2e-bail-individuel-colocation-nu.docx' },
    { path: './private/annexe-2f-bail-individuel-colocation-meuble.docx', name: 'annexe-2f-bail-individuel-colocation-meuble.docx' },
    { path: './private/annexe-3-procedure-loyer-sous-evalue-renouvellement.pdf', name: 'annexe-3-procedure-loyer-sous-evalue-renouvellement.pdf' },
    { path: './private/annexe-4-decret-n-20151437.pdf', name: 'annexe-4-decret-n-20151437.pdf' },
    { path: './private/annexe-5-acte-cautionnement.docx', name: 'annexe-5-acte-cautionnement.docx' },
    { path: './private/annexe-5a-decret-n-2016382.pdf', name: 'annexe-5a-decret-n-2016382.pdf' },
    { path: './private/annexe-6a-edl-entree.docx', name: 'annexe-6a-edl-entree.docx' },
    { path: './private/annexe-6b-edl-sortie.docx', name: 'annexe-6b-edl-sortie.docx' },
    { path: './private/annexe-7a-inventaire-entree.docx', name: 'annexe-7a-inventaire-entree.docx' },
    { path: './private/annexe-7b-inventaire-sortie.docx', name: 'annexe-7b-inventaire-sortie.docx' },
    { path: './private/annexe-8-notice-informative.pdf', name: 'annexe-8-notice-informative.pdf' },
    { path: './private/annexe-9-decret-n-2002120.pdf', name: 'annexe-9-decret-n-2002120.pdf' },
    { path: './private/annexe-10-decret-n-87713.pdf', name: 'annexe-10-decret-n-87713.pdf' },
    { path: './private/annexe-11-decret-n-87712.pdf', name: 'annexe-11-decret-n-87712.pdf' },
    { path: './private/annexe-12a-quittance-de-loyer.docx', name: 'annexe-12a-quittance-de-loyer.docx' },
    { path: './private/annexe-12b-recu.docx', name: 'annexe-12b-recu.docx' },
    { path: './private/annexe-13a-preavis-reprise-bail-nu.docx', name: 'annexe-13a-preavis-reprise-bail-nu.docx' },
    { path: './private/annexe-13b-preavis-vendre-bail-nu.docx', name: 'annexe-13b-preavis-vendre-bail-nu.docx' },
    { path: './private/annexe-13c-preavis-motif-legitime-serieux-bail-nu.docx', name: 'annexe-13c-preavis-motif-legitime-serieux-bail-nu.docx' },
    { path: './private/annexe-14a-preavis-reprise-bail-meuble.docx', name: 'annexe-14a-preavis-reprise-bail-meuble.docx' },
    { path: './private/annexe-14b-preavis-vendre-bail-meuble.docx', name: 'annexe-14b-preavis-vendre-bail-meuble.docx' },
    { path: './private/annexe-14c-preavis-motif-legitime-serieux-bail-meuble.docx', name: 'annexe-14c-preavis-motif-legitime-serieux-bail-meuble.docx' },
    { path: './private/guide-de-survie-du-bailleur-hellia.pdf', name: 'guide-de-survie-du-bailleur-hellia.pdf' },

  ]);
})

function addContact(formData) {

  let options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/contacts',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'api-key': config.access.author,
      Origin: 'http://localhost:3000'
    },
    data: {
      "updateEnabled": true,
      'email': formData['EMAIL'],
      'attributes': {
        PRENOM: formData.FNAME.charAt(0).toUpperCase() + formData.FNAME.slice(1),
        NOM: formData.LNAME.toUpperCase(),
        NOMBRE_BIENS: formData.NOMBRE_BIENS,
        NEWSLETTER: formData.NEWSLETTER === "true",
        RGPD: formData.RGPD === "true",
      },
      listIds: [2]
    }
  };

  return axios(options);
}
