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
            let query = `select *
            from mst_jenis mj;`
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
            let typeid=req.params.typeid;
            let id = req.params.id;
            console.log(typeid, id);
            let date = new Date();
            let query = `
            select mp.group_id, mp.jenis, mp.parameter , mp.standart 
            from mst_pengujian mp 
            where group_id = ${typeid}  and jenis = ${id}  and type_value = 'numeric';
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
            let id = req.body.id;
            let parameter= req.body.parameterData;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let query;
            
            if(group_id == 1){
                query = `
                select turh.*, turd.item , turd.result as result_d, tils.insp_start_date as startDate
                from tr_uji_rm_h turh 
                join tr_uji_rm_d turd on turh.id = turd.id_header 
                join tr_insp_lot_sap tils  on tils.material_number  = turh.material_code
                join mst_pengujian mp on mp.parameter  = turd.item
                where turh.group_id = ${group_id}
                and turh.jenis = ${id}
                and turd.item = '${parameter}'
                and plant = 1203
                and mp.type_value = 'numeric'
                and date_format(tils.insp_start_date, '%Y-%m') between '${startDate}' and '${endDate}'
                group by turh.id `
            }else if(group_id == 2){
                query = `select tuph.*, tupd.item , tupd.result as result_d, tils.insp_start_date as startDate
                from tr_uji_pm_h tuph 
                join tr_uji_pm_d tupd  on tuph.id = tupd.id_header 
                join tr_insp_lot_sap tils  on tils.material_number  = tuph.material_code
                join mst_pengujian mp on mp.parameter  = tupd.item
                where tuph.group_id = ${group_id}
                and tuph.jenis = ${id}
                and tupd.item = '${parameter}'
                and tils.plant = 1203
                and mp.type_value = 'numeric'
                and date_format(tils.insp_start_date, '%Y-%m') between '${startDate}' and '${endDate}'
                group by tuph.id `
            }
            
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
            let id = req.body.id;
            let parameter= req.body.parameterData;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let query ;
            if(group_id == 1){
                query = `       
            select a.*, count(a.id) as total
            from 
            (select turh.*, turd.item , turd.result as result_d , tils.insp_start_date as startDate , mp.max , mp.min
            from tr_uji_rm_h turh 
            join tr_uji_rm_d turd on turh.id = turd.id_header 
            join tr_insp_lot_sap tils  on tils.material_number  = turh.material_code
            join mst_pengujian mp on mp.parameter  = turd.item
            where turh.group_id = ${group_id}
            and turh.jenis = ${id}
            and turd.item = '${parameter}'
            and plant = 1203
            and mp.type_value = 'numeric'
            and date_format(tils.insp_start_date, '%Y-%m') between '${startDate}' and '${endDate}'
            group by turh.id ) a
            group  by a.result_d
            `

        }else if(group_id == 2){
            query = 
            `
            select a.*, count(a.id) as total
            from 
            (select tuph.*, tupd.item , tupd.result as result_d , tils.insp_start_date as startDate , , mp.max , mp.min
            from tr_uji_pm_h tuph 
            join tr_uji_pm_d tupd  on tuph.id = tupd.id_header 
            join tr_insp_lot_sap tils  on tils.material_number  = tuph.material_code
            join mst_pengujian mp on mp.parameter  = tupd.item
            where tuph.group_id = ${group_id}
            and tuph.jenis = ${id}
            and tupd.item = '${parameter}'
            and tils.plant = 1203
            and mp.type_value = 'numeric'
            and date_format(tils.insp_start_date, '%Y-%m') between '${startDate}' and '${endDate}'
            group by tuph.id ) a
            group  by a.result_d

            `

        }
            let [data, _] = await iot_qa_kimfis.query(query);

            // const countData = data.filter(item => itemm)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


}