const express = require('express');
const router = express.Router();
const {getAllTenants, createTenant, deleteTenant} = require('../controllers/tenantController');

router.get('/', getAllTenants);
router.post('/', createTenant);
router.delete('/:id', deleteTenant);

module.exports = router;