function validate(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false, // Tampilkan semua error, jangan berhenti di error pertama
      allowUnknown: true, // Izinkan field lain di header/query yang tidak dicek
      stripUnknown: true, // Hapus field di body yang tidak ada di schema (bersih-bersih)
    };

    const { error, value } = schema.validate(
      { body: req.body, params: req.params, query: req.query },
      options
    );

    if (error) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
        cid: req.correlationId,
      });
    }

    // Update req dengan data yang sudah dibersihkan/divalidasi
    if (value.body) Object.assign(req.body, value.body);
    if (value.params) Object.assign(req.params, value.params);
    if (value.query) Object.assign(req.query, value.query);

    return next();
  };
}

module.exports = validate;