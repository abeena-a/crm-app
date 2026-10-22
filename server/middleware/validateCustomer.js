module.exports = (
  req,
  res,
  next
) => {

  const {
    name,
    email,
    phone,
    company
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !company
  ) {
    return res.status(400).json({
      message:
        "All fields are required"
    });
  }

  next();
};