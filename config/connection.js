const Sequelize = require('sequelize')
const config = require('./config')

const devDB = new Sequelize(config.development.database, config.development.username, config.development.password, config.development);
const node_redDB = new Sequelize(config.node_red.database, config.node_red.username, config.node_red.password, config.node_red);
const valcalDB = new Sequelize(config.valcal.database, config.valcal.username, config.valcal.password, config.valcal);
const iot_fsb = new Sequelize(config.iot_fsb.database, config.iot_fsb.username, config.iot_fsb.password, config.iot_fsb);
const iot_oci1 = new Sequelize(config.iot_oci1.database, config.iot_oci1.username, config.iot_oci1.password, config.iot_oci1);
const iot_oci2 = new Sequelize(config.iot_oci2.database, config.iot_oci2.username, config.iot_oci2.password, config.iot_oci2);
const iot_qa_kimfis = new Sequelize(config.iot_qa_kimfis.database, config.iot_qa_kimfis.username, config.iot_qa_kimfis.password, config.iot_qa_kimfis);
const qa_tracking_supplier = new Sequelize(config.qa_tracking_supplier.database, config.qa_tracking_supplier.username, config.qa_tracking_supplier.password, config.qa_tracking_supplier);
const iot_lims_fsb = new Sequelize(config.iot_lims_fsb.database, config.iot_lims_fsb.username, config.iot_lims_fsb.password, config.iot_lims_fsb);
const aio_iot_fsb = new Sequelize(config.aio_iot_fsb.database, config.aio_iot_fsb.username, config.aio_iot_fsb.password, config.aio_iot_fsb);
const qa_microbiology = new Sequelize(config.qa_microbiology.database, config.qa_microbiology.username, config.qa_microbiology.password, config.qa_microbiology);
const qa_gmp = new Sequelize(config.qa_gmp.database, config.qa_gmp.username, config.qa_gmp.password, config.qa_gmp);

const login_aio = new Sequelize(config.login_aio.database, config.login_aio.username, config.login_aio.password, config.login_aio);

module.exports = {
    devDB,
    node_redDB,
    valcalDB,
    iot_fsb,
    iot_oci1,
    iot_oci2,
    login_aio,
    iot_qa_kimfis,
    qa_tracking_supplier,
    iot_lims_fsb,
    aio_iot_fsb,
    qa_microbiology,
    qa_gmp
}