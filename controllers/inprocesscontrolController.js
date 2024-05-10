const { aio_iot_fsb } = require("../config/connection")
const { iot_lims_fsb } = require("../config/connection")


module.exports = {
    getFsb: async (req, res) => {
        try {
            let date = new Date();
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let jenis_pengujian = req.body.parameter;
            let query;
            
            if(jenis_pengujian == 'Berat - Baking'){
                query = `
            SELECT 
            mp.keterangan ,
            tbbh.lotno,
            tbbh.tgl_pengerjaan,
            mjp.min ,
            mjp.max ,
            tbbd.berat 
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

            }else if(jenis_pengujian == 'Moisture content'){
            query =
            `
            SELECT 
                mp.keterangan ,
                tmh.lotno,
                tmh.create_date ,
                mjp.min ,
                mjp.max ,
                tmd.mos_content as berat
            FROM 
                lims_fsb.tr_moisture_h tmh 
            JOIN aio_iot_fsb.tr_pro tp ON tp.pro = tmh.pro 
            join aio_iot_fsb.mst_product mp on mp.keterangan = tp.produk 
            join lims_fsb.mst_jenis_pengujian mjp on mjp.product = mp.matcode 
            JOIN lims_fsb.tr_moisture_d tmd  ON tmd.id_head = tmh.id 
            WHERE 
            tmh.create_date  BETWEEN '${startDate}' AND '${endDate}'
            and mjp.jenis_pengujian = '${jenis_pengujian}'
            `


        }else if(jenis_pengujian == 'Berat'){
            query =
            `
            SELECT 
                mp.keterangan ,
                tfgh.lotno,
                tfgh.tgl_pengerjaan,
                mjp.min ,
                mjp.max ,
                tfgd.berat
            FROM 
                lims_fsb.tr_finish_good_h tfgh 
            JOIN aio_iot_fsb.tr_pro tp ON tp.pro = tfgh.pro 
            join aio_iot_fsb.mst_product mp on mp.keterangan = tp.produk 
            join lims_fsb.mst_jenis_pengujian mjp on mjp.product = mp.matcode 
            JOIN lims_fsb.tr_finish_good_d tfgd  ON tfgd.id_head  = tfgh.id 
            WHERE 
                tfgh.tgl_pengerjaan BETWEEN '${startDate}' AND '${endDate}'
                and mjp.jenis_pengujian = '${jenis_pengujian}'
            `
            }
            let [data, _] = await iot_lims_fsb.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

}