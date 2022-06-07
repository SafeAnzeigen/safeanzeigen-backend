const AdvertisementsService = require('./advertisements-service');

const getAllAdvertisements = (req, res) =>
  AdvertisementsService.find()
    .then((advertisements) => res.status(200).json({ advertisements }))
    .catch((error) => {
      console.log('Fehler beim Erhalten von aller Anzeigen. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von aller Anzeigen.',
      });
    });

const getAllPublicAdvertisements = (req, res) =>
  AdvertisementsService.findAllPublicAdvertisements()
    .then((advertisements) =>
      advertisements
        ? res.status(200).json({ advertisements })
        : res.status(404).json({ message: 'Es wurden keine Anzeigen gefunden.' })
    )
    .catch((error) => {
      console.log('Fehler beim Erhalten von aller öffentlichen Anzeigen. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von aller öffentlichen Anzeigen.',
      });
    });

const getAdvertisementById = (req, res) => {
  const { advertisement_id } = req.params;

  console.log('Advertisement ID: ', advertisement_id);

  if (advertisement_id) {
    AdvertisementsService.findById(advertisement_id)
      .then((advertisement) => {
        advertisement
          ? res.status(200).json({ advertisement })
          : res.status(404).json({ message: 'Diese Anzeige wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von dieser Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Anzeige, da Angaben fehlen.',
    });
  }
};

const getPublicAdvertisementById = (req, res) => {
  const { advertisement_id } = req.params;

  if (advertisement_id) {
    AdvertisementsService.findPublicById(advertisement_id)
      .then((advertisement) => {
        advertisement
          ? res.status(200).json({ advertisement })
          : res.status(404).json({ message: 'Diese Anzeige wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von dieser Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Anzeige, da Angaben fehlen.',
    });
  }
};

const getAllAdvertisementsByUserId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    AdvertisementsService.findAdvertisementsByUserId(clerk_user_id)
      .then((advertisements) => {
        advertisements?.length
          ? res.status(200).json({ advertisements })
          : res.status(404).json({ message: 'Es konnten keine Anzeigen gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Anzeigen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Anzeigen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Anzeigen, da Angaben fehlen.',
    });
  }
};

const getAllAdvertisementsByClerkUserId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    AdvertisementsService.findAdvertisementsByClerkUserId(clerk_user_id)
      .then((advertisements) => {
        advertisements?.length
          ? res.status(200).json({ advertisements })
          : res.status(404).json({ message: 'Es konnten keine Anzeigen gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Anzeigen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Anzeigen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Anzeigen, da Angaben fehlen.',
    });
  }
};

const getAllAdvertisementsByCategoryId = (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    AdvertisementsService.findAdvertisementsByCategoryId(category_id)
      .then((advertisements) => {
        advertisements?.length
          ? res.status(200).json({ advertisements })
          : res.status(404).json({ message: 'Es konnten keine Anzeigen gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Anzeigen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Anzeigen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Anzeigen, da Angaben fehlen.',
    });
  }
};

const addAdvertisement = (req, res) => {
  const advertisementDTO = ({
    clerk_user_id,
    category_name,
    subcategory_name,
    type,
    title,
    price,
    price_type,
    description,
    verification_image,
    verification_qr_code,
    validation_success_token,
    is_verified,
    article_image_1,
    article_image_2,
    article_image_3,
    article_image_4,
    article_image_5,
    article_video,
    show_name,
    show_address,
    show_phone,
    show_user_photo,
    location_street,
    location_street_number,
    location_city,
    location_zip,
    location_county,
    location_country,
  } = req.body);

  console.log('BODY2', req.body);

  if (
    clerk_user_id &&
    category_name &&
    type &&
    title &&
    price &&
    price_type &&
    description &&
    verification_image &&
    verification_qr_code &&
    validation_success_token &&
    is_verified &&
    location_street &&
    location_street_number &&
    location_city &&
    location_zip &&
    location_county &&
    location_country &&
    (article_image_1 ||
      article_image_2 ||
      article_image_3 ||
      article_image_4 ||
      article_image_5 ||
      article_video)
  ) {
    AdvertisementsService.add(advertisementDTO)
      .then((newAdvertisement) =>
        res.status(201).json({
          advertisement_id: newAdvertisement.advertisement_id,
          fk_user_id: newAdvertisement.fk_user_id,
          fk_category_id: newAdvertisement.fk_category_id,
          is_active: newAdvertisement.is_active,
          is_published: newAdvertisement.is_published,
          settlement_status: newAdvertisement.settlement_status,
          type: newAdvertisement.type,
          title: newAdvertisement.title,
          price: newAdvertisement.price,
          price_type: newAdvertisement.price_type,
          description: newAdvertisement.description,
          verification_image: newAdvertisement.verification_image,
          is_verified: newAdvertisement.is_verified,
          article_image_1: newAdvertisement.article_image_1,
          article_image_2: newAdvertisement.article_image_2,
          article_image_3: newAdvertisement.article_image_3,
          article_image_4: newAdvertisement.article_image_4,
          article_image_5: newAdvertisement.article_image_5,
          article_video: newAdvertisement.article_video,
          show_name: newAdvertisement.show_name,
          show_address: newAdvertisement.show_address,
          show_phone: newAdvertisement.show_phone,
          show_user_photo: newAdvertisement.show_user_photo,
          location_street: newAdvertisement.location_street,
          location_street_number: newAdvertisement.location_street_number,
          location_city: newAdvertisement.location_city,
          location_zip: newAdvertisement.location_zip,
          location_county: newAdvertisement.location_county,
          location_country: newAdvertisement.location_country,
          created_at: newAdvertisement.created_at,
          updated_at: newAdvertisement.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieser Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieser Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieser Anzeige, da Angaben fehlen.',
    });
  }
};

const updateAdvertisement = (req, res) => {
  const updateAdvertisementDTO = ({
    fk_category_id,
    type,
    title,
    price,
    price_type,
    description,
    is_verified,
    article_image_1,
    article_image_2,
    article_image_3,
    article_image_4,
    article_image_5,
    article_video,
    show_name,
    show_address,
    show_phone,
    show_user_photo,
    location_street,
    location_street_number,
    location_city,
    location_zip,
    location_county,
    location_country,
  } = req.body);

  if (
    req.body.advertisement_id &&
    (fk_category_id ||
      type ||
      title ||
      price ||
      price_type ||
      description ||
      is_verified ||
      article_image_1 ||
      article_image_2 ||
      article_image_3 ||
      article_image_4 ||
      article_image_5 ||
      article_video ||
      show_name ||
      show_address ||
      show_phone ||
      show_user_photo ||
      location_street ||
      location_street_number ||
      location_city ||
      location_zip ||
      location_county ||
      location_country)
  ) {
    AdvertisementsService.update(req.body.advertisement_id, updateAdvertisementDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({ message: 'Die Anzeige wurde aktualisiert.' })
          : res.status(500).json({
              message:
                'Fehler bei der Aktualisierung der Anzeige, da Fehler in der Datenbank auftraten.',
            })
      )
      .catch((error) => {
        console.log('Fehler bei der Aktualisierung der Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler bei der Aktualisierung der Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler bei der Aktualisierung der Anzeige, da Angaben fehlen.',
    });
  }
};

const deactivateAdvertisement = (req, res) => {
  const { advertisement_id } = req.params;

  if (advertisement_id) {
    AdvertisementsService.deactivate(advertisement_id, { is_active: false })
      .then(() => res.status(200).json({ message: 'Die Anzeige wurde deaktiviert.' }))
      .catch((error) => {
        console.log('Fehler beim Deaktivieren der Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler beim Deaktivieren der Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Deaktivieren der Anzeige, da Angaben fehlen.',
    });
  }
};

const toggleReservationAdvertisement = (req, res) => {
  const { advertisement_id } = req.params;

  if (advertisement_id) {
    AdvertisementsService.toggleReservation(advertisement_id)
      .then((returnValue) => {
        console.log('RETURN VALUE', returnValue);
        returnValue
          ? res.status(200).json({ message: 'Die Anzeige wurde reserviert.' })
          : res.status(404).json({ message: 'Die Anzeige konnte nicht gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Reservieren der Anzeige. ', error);
        return res.status(500).json({
          message: 'Fehler beim Reservieren der Anzeige.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Reservieren der Anzeige, da Angaben fehlen.',
    });
  }
};

const generateVerificationImage = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    AdvertisementsService.generateVerificationImage(clerk_user_id)
      .then((token) => res.status(200).json({ token }))
      .catch((error) => {
        console.log('Fehler beim Generieren des Verifikations-QR-Codes.', error);
        return res.status(500).json({
          message: 'Fehler beim Generieren des Verifikations-QR-Codes.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Generieren des Verifikations-QR-Codes, da Angaben fehlen.',
    });
  }
};

const validateVerificationImage = (req, res) => {
  const { clerk_user_id } = req.params;
  const { verification_url, verification_code } = req.body;

  if (clerk_user_id && verification_url && verification_code) {
    AdvertisementsService.validateVerificationImage(
      clerk_user_id,
      verification_url,
      verification_code
    )
      .then((validationResponse) =>
        validationResponse[0] === 'notfound'
          ? res.status(404).json({ message: 'Der QR-Code konnte nicht gefunden werden.' })
          : validationResponse[0] === 'invalid'
          ? res.status(400).json({ message: 'Der QR-Code ist ungültig.' })
          : res.status(200).json({
              message: 'Der QR-Code wurde erfolgreich validiert.',
              decodedtoken: validationResponse[0],
              validationsuccesstoken: validationResponse[1],
            })
      )
      .catch((error) => {
        console.log('Fehler beim Validieren des Verifikations-QR-Codes.', error);
        return res.status(500).json({
          message: 'Fehler beim Validieren des Verifikations-QR-Codes.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Validieren des Verifikations-QR-Codes, da Angaben fehlen.',
    });
  }
};

const increaseViewCount = (req, res) => {
  const { advertisement_id } = req.params;

  if (advertisement_id) {
    AdvertisementsService.increaseViewCount(advertisement_id)
      .then((increaseViewCountResponse) =>
        increaseViewCountResponse
          ? res.status(200).json({ message: 'Der ViewCount dieser Anzeige wurde erhöht.' })
          : res.status(404).json({ message: 'Die Kleinanzeige konnte nicht gefunden werden.' })
      )
      .catch((error) => {
        console.log('Fehler beim Erhöhen der Viewcount.', error);
        return res.status(500).json({
          message: 'Fehler beim Erhöhen der Viewcount.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhöhen der Viewcount, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllAdvertisements,
  getAllPublicAdvertisements,
  getAdvertisementById,
  getPublicAdvertisementById,
  getAllAdvertisementsByUserId,
  getAllAdvertisementsByClerkUserId,
  getAllAdvertisementsByCategoryId,
  addAdvertisement,
  updateAdvertisement,
  deactivateAdvertisement,
  toggleReservationAdvertisement,
  generateVerificationImage,
  validateVerificationImage,
  increaseViewCount,
};
