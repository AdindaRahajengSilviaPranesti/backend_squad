const { aio_iot_fsb } = require("../config/connection")
const { iot_lims_fsb } = require("../config/connection")


module.exports = {
    getFsb: async (req, res) => {
        try {
            let date = new Date();
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let jenis_pengujian= req.body.parameter;
            let query = `
            SELECT 
            mp.keterangan ,
            tbbh.lotno,
            tbbh.tgl_pengerjaan,
            mjp.min ,
            mjp.max 
            FROM 
            lims_fsb.tr_berat_baking_h tbbh 
            JOIN aio_iot_fsb.tr_pro tp ON tp.pro = tbbh.pro 
            join aio_iot_fsb.mst_product mp on mp.keterangan = tp.produk 
            join lims_fsb.mst_jenis_pengujian mjp on mjp.product = mp.matcode 
            JOIN lims_fsb.tr_berat_baking_d tbbd ON tbbd.id_header = tbbh.id 
            WHERE 
            tbbh.tgl_pengerjaan BETWEEN '${startDate}' AND '${endDate}'
            and mjp.jenis_pengujian = '${jenis_pengujian}'
            `
            let [data, _] = await iot_lims_fsb.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getResult: async (req, res) => {
        try {
            let date = new Date();
            let query = ``
            let [data, _] = await aio_iot_fsb.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },





}