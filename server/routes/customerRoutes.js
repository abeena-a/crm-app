const router =
  require("express").Router();

const customerController =
  require(
    "../controllers/customerController"
  );


const validateCustomer =
  require(
    "../middleware/validateCustomer"
  );

router.post(
  "/",
  validateCustomer,
  customerController.createCustomer
);

router.post(
  "/",
  customerController.createCustomer
);

router.get(
  "/",
  customerController.getCustomers
);

router.get(
  "/:id",
  customerController.getCustomerById
);

router.put(
  "/:id",
  customerController.updateCustomer
);

router.delete(
  "/:id",
  customerController.deleteCustomer
);

module.exports = router;