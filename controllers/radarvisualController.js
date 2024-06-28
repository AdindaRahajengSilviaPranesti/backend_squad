const { iot_qa_kimfis } = require("../config/connection")

module.exports = {
    getMaterial: async (req, res) => {
        try {
            let date = new Date();
            let query = `SELECT tils.insp_object , tils.batch_number , tils.insp_qty , tils.unit , ta.status_analisis , ta.status 
            FROM tr_insp_lot_sap tils
            INNER JOIN trans_analisis ta ON tils.inspection_lot  = ta.inspection_lot
            where plant = 1203
            and insp_start_date = curdate()`
            let [data, _] = await iot_qa_kimfis.query(query);
            console.log('getMaterial', query)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getMaterialByDate: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            // console.log(date);
            let query = `SELECT tils.insp_object , tils.batch_number , tils.insp_qty , tils.unit , ta.status_analisis , ta.status 
            FROM tr_insp_lot_sap tils
            INNER JOIN trans_analisis ta ON tils.inspection_lot  = ta.inspection_lot
            where plant = 1203 and insp_start_date between '${startDate}' and '${endDate}'`
            let [data, _] = await iot_qa_kimfis.query(query);
            console.log(data)
            console.log(query)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    getType: async (req, res) => {
        try {
            let date = new Date();
            let query = `SELECT *
            FROM mst_jenis mj 
            WHERE mj.group_id  IN (1, 2)
            order by jenis;`
            let [data, _] = await iot_qa_kimfis.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    getSupplier: async (req, res) => {
        try {
            let id = req.params.id;
            let date = new Date();
            let query = `select *
            from mst_manufacture mm 
            where jenis = ${id};`
            let [data, _] = await iot_qa_kimfis.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getParameter: async (req, res) => {
        try {
            let typeid = req.params.typeid;
            let id = req.params.id;
            console.log(typeid, id);
            let date = new Date();
            let query = `
            select mp.group_id, mp.jenis, mp.parameter , mp.standart 
            from mst_pengujian mp 
            where group_id = ${typeid}  and jenis = ${id}  and type_value = 'numeric'
            and mp.radar_visual in ('1','2','3');
            `
            let [data, _] = await iot_qa_kimfis.query(query);
            console.log(data)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



    getDataAnalysisByDate: async (req, res) => {
        try {
            let group_id = req.body.group_id;
            let jenis = req.body.jenis;
            let id = req.body.id;
            let parameter = req.body.parameterData;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let query;

            if (group_id == 1) {
                query = `
                select turh.id, turh.tanggal , turh.jenis, turh.material_code, turd.item, turd.result,mp.max, mp.min, count(turd.result) as total
                from tr_uji_rm_h turh 
                join tr_uji_rm_d turd on turh.id = turd.id_header 
                join tr_insp_lot_sap tils  on tils.material_number  = turh.material_code
                join mst_pengujian mp on mp.parameter  = turd.item
                where turd.item = '${parameter}'
                and (turh.jenis = '${id}' or turh.jenis = '${jenis}')
                and date_format(turh.tanggal, '%Y-%m') between '${startDate}' and '${endDate}'
                and turd.result is not null and turd.result not like "passed"
                group by turd.result
                ORDER BY turh.tanggal ASC;`
            } else if (group_id == 2) {
                query = `
                select tuph.id, tuph.tanggal , tuph.jenis, tuph.material_code, tupd.item, tupd.result, mp.max, mp.min, count(tupd.result) as total
                from tr_uji_pm_h tuph 
                join tr_uji_pm_d tupd  on tuph.id = tupd.id_header 
                join tr_insp_lot_sap tils  on tils.material_number  = tuph.material_code
                join mst_pengujian mp on mp.parameter  = tupd.item
                where tupd.item = '${parameter}'
                and (tuph.jenis = '${id}' or tuph.jenis = '${jenis}')
                and date_format(tuph.tanggal, '%Y-%m') between '${startDate}' and '${endDate}'
                and tupd.result is not null and tupd.result not like "passed"
                group by tupd.result 
                ORDER BY turh.tanggal ASC;  `
            }

            console.log(query)

            let [data, _] = await iot_qa_kimfis.query(query);
            console.log(data)
            console.log(query)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getDataChart: async (req, res) => {
        try {
            let group_id = req.body.group_id;
            let jenis = req.body.jenis;
            let id = req.body.id;
            let parameter = req.body.parameterData;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let query;
            if (group_id == 1) {
                query = `       
                select turh.id, turh.tanggal , turh.jenis, turh.material_code, turd.item, turd.result, mp.max, mp.min, count(turd.result) as total
                from tr_uji_rm_h turh
                join tr_uji_rm_d turd on turh.id = turd.id_header 
                join mst_pengujian mp on mp.parameter = turd.item 
                where turd.item = '${parameter}'
                and (turh.jenis = '${id}' or turh.jenis = '${jenis}')
                and date_format(turh.tanggal, '%Y-%m') between '${startDate}' and '${endDate}'
                and turd.result is not null and turd.result not like "passed"
                group by turd.result 
                ORDER BY turh.tanggal ASC;
            `
            } else if (group_id == 2) {
                query =
                    `
                select tuph.id, tuph.tanggal , tuph.jenis, tuph.material_code, tupd.item, tupd.result, mp.max, mp.min, count(tupd.result) as total
                from tr_uji_pm_h tuph 
                join tr_uji_pm_d tupd on tuph.id = tupd.id_header 
                join mst_pengujian mp on mp.parameter = tupd.item 
                where tupd.item = '${parameter}'
                and (tuph.jenis = '${id}' or tuph.jenis =  '${jenis}')
                and date_format(tuph.tanggal, '%Y-%m') between '${startDate}' and '${endDate}'
                and tupd.result is not null and tupd.result not like "passed"
                group by tupd.result
                ORDER BY turh.tanggal ASC;
            `

            }
            let [data, _] = await iot_qa_kimfis.query(query);
            console.log(data)
            console.log(query)
            // const countData = data.filter(item => itemm)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



}