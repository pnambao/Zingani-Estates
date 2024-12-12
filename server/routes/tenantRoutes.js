const express = require('express');
const router = express.Router();
const {getAllTenants, createTenant, deleteTenant, assignTenant} = require('../controllers/tenantController');

router.get('/', getAllTenants);
router.post('/', createTenant);
router.delete('/:id', deleteTenant);
router.post('/assign', assignTenant);

module.exports = router;