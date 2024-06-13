require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    timezone: "+07:00",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    timezone: "+07:00",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    timezone: "+07:00",
  },

  node_red: {
    username: "intern",
    password: "intern",
    database: "node_red",
    host: "192.168.9.8",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },

  valcal: {
    username: "intern",
    password: "intern",
    database: "valcal",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },

  iot_fsb: {
    username: "intern",
    password: "intern",
    database: "aio_iot_fsb",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 6446,
    timezone: "+07:00",
  },

  iot_oci1: {
    username: "intern",
    password: "intern",
    database: "aio_iot_oci1",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 6446,
    timezone: "+07:00",
  },

  iot_oci2: {
    username: "intern",
    password: "intern",
    database: "aio_iot_oci2",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 6446,
    timezone: "+07:00",
  },


  iot_lims_fsb: {
    username: "intern",
    password: "intern",
    database: "lims_fsb",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 6446,
    timezone: "+07:00",
  },

  aio_iot_fsb: {
    username: "intern",
    password: "intern",
    database: "aio_iot_fsb",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 6446,
    timezone: "+07:00",
  },

  iot_qa_kimfis: {
    username: "intern",
    password: "intern",
    database: "qa_kimfis",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },
  
  qa_tracking_supplier: {
    username: "root",
    password: "Rider>_<",
    database: "qa_tracking_suplier",
    host: "10.10.2.16",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },

  qa_microbiology: {
    username: "iot_prod",
    password: "123456",
    database: "qa_microbiology",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },
  
  qa_gmp: {
    username: "iot_prod",
    password: "123456",
    database: "qa_gmp",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  },

  login_aio: {
    username: "intern",
    password: "intern",
    database: "aio_employee",
    host: "192.168.9.47",
    dialect: "mysql",
    port: 3306,
    timezone: "+07:00",
  }
  

}