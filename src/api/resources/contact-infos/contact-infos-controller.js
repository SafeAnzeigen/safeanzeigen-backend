const contactInfosService = require('./contact-infos-service');

const getAllContactInfos = (req, res) =>
  contactInfosService
    .find()
    .then((contactInfos) => res.status(200).json({ contactInfos }))
    .catch((error) => {
      console.log('Fehler beim Erhalten von allen Kontaktinformationen. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von allen Kontaktinformationen.',
      });
    });

const getContactInfoById = (req, res) => {
  const { contact_info_id } = req.params;

  if (contact_info_id) {
    contactInfosService
      .findById(contact_info_id)
      .then((contactInfo) => {
        contactInfo
          ? res.status(200).json({ contactInfo })
          : res.status(404).json({ message: 'Dieser Kontaktinformation wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von dieser Kontaktinformation. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Kontaktinformation.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Kontaktinformation, da Angaben fehlen.',
    });
  }
};

const getAllContactInfosByUserId = async (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    contactInfosService
      .findContactInfoByUserId(user_id)
      .then((contactInfos) => {
        contactInfos?.length
          ? res.status(200).json({ contactInfos })
          : res
              .status(404)
              .json({ message: 'Es konnten keine Kontaktinformationen gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Kontaktinformationen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Kontaktinformationen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Kontaktinformationen, da Angaben fehlen.',
    });
  }
};

const getAllContactInfosByUserEmail = async (req, res) => {
  const { user_email } = req.params;

  if (user_email) {
    contactInfosService
      .findContactInfoByUserEmail(user_email)
      .then((contactInfos) => {
        contactInfos?.length
          ? res.status(200).json({ contactInfos })
          : res
              .status(404)
              .json({ message: 'Es konnten keine Kontaktinformationen gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Kontaktinformationen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Kontaktinformationen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Kontaktinformationen, da Angaben fehlen.',
    });
  }
};

const addContactInfo = (req, res) => {
  const contactInfoDTO = ({ fk_user_id, street, street_number, city, zip, county, country } =
    req.body);

  if (fk_user_id && street && street_number && city && zip && county && country) {
    contactInfosService
      .add(contactInfoDTO)
      .then((newContactInfo) =>
        res.status(201).json({
          contact_info_id: newContactInfo.contact_info_id,
          user_id: newContactInfo.fk_user_id,
          is_active: newContactInfo.is_active,
          street: newContactInfo.street,
          street_number: newContactInfo.street_number,
          city: newContactInfo.city,
          zip: newContactInfo.zip,
          county: newContactInfo.county,
          country: newContactInfo.country,
          created_at: newContactInfo.created_at,
          updated_at: newContactInfo.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieser Kontaktinformation. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieser Kontaktinformation.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieser Kontaktinformation, da Angaben fehlen.',
    });
  }
};

const updateContactInfo = (req, res) => {
  const updateContactInfoDTO = ({ fk_user_id, street, street_number, city, zip, county, country } =
    req.body);

  if (
    req.body
      .contact_info_id /* fk_user_id || */ /* TODO: fk_user_id will be required to auth middleware to check it belongs to user itself but contact_info cannot be updated to another use */ &&
    (street || street_number || city || zip || county || country)
  ) {
    contactInfosService
      .update(req.body.contact_info_id, updateContactInfoDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({ message: 'Die Kontaktinformation wurden aktualisiert.' })
          : res.status(500).json({
              message:
                'Fehler bei der Aktualisierung der Kontaktinformationen, da Fehler in der Datenbank auftraten.',
            })
      )
      .catch((error) => {
        console.log('Fehler bei der Aktualisierung der Kontaktinformationen. ', error);
        return res.status(500).json({
          message: 'Fehler bei der Aktualisierung der Kontaktinformationen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler bei der Aktualisierung der Kontaktinformationen, da Angaben fehlen.',
    });
  }
};

const deactivateContactInfo = (req, res) => {
  const { contact_info_id } = req.params;

  if (contact_info_id) {
    contactInfosService
      .deactivate(contact_info_id, { is_active: false })
      .then(() => res.status(200).json({ message: 'Die Kontaktinformationen wurde deaktiviert.' }))
      .catch((error) => {
        console.log('Fehler beim Deaktivieren der Kontaktinformationen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Deaktivieren der Kontaktinformationen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Deaktivieren der Kontaktinformationen, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllContactInfos,
  getContactInfoById,
  getAllContactInfosByUserId,
  getAllContactInfosByUserEmail,
  addContactInfo,
  updateContactInfo,
  deactivateContactInfo,
};
