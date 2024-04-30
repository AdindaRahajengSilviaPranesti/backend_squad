const { qa_tracking_supplier } = require("../config/connection")
const { iot_qa_kimfis } = require("../config/connection")

module.exports = {
    getAbnormal: async (req, res) => {
        try {
            let date = new Date();
            let query = `select ms.name_vendor, ms.plan, ms.kode_vendor 
            from mst_supplier ms`
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getAbnormalByPlan: async (req, res) => {
        try {
            let date = new Date();
            let plan =  req.params.plan;
            let query = `select ms.name_vendor, ms.plan , ms.kode_vendor
            from mst_supplier ms
            where ms.plan = '${plan}';`
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getAbnormality: async (req, res) => {
        try {
            let date = new Date();
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let name_vendor = req.body.name_vendor;
            let query = 
            `SELECT tc.tgl_complain , mmc.name_vendor , count(mmc.name_vendor) as total
            FROM tr_complan tc
            JOIN mst_material_capa mmc ON mmc.kode_vendor = tc.nama_supplier 
            where date_format(tc.tgl_complain, '%Y-%m') between '${startDate}' and '${endDate}'
            and tc.nama_supplier = '${name_vendor}'
           	group by mmc.name_vendor;`
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getArrival: async (req, res) => {
        try {
            let date = new Date();
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = ` select * 
            from tr_insp_lot_sap insp 
            where insp.vendor_number like '%${kode_vendor}%' 
            and date_format(insp.insp_start_date, '%Y-%m') between '${startDate}' and '${endDate}'
            group by insp.inspection_lot; `
            console.log(query)
            let [data, _] = await iot_qa_kimfis.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
   
    //%Abrnomality
    getRateabnormal: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.abnormal , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getFeedback: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.feedback , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getEffectiveness: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.acceptance_improvement , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getDowntime: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.downtime , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getCuscomplain: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.cc , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getIssue: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let kode_vendor = req.body.kode_vendor;
            let query = `select vfvq.issue , vfvq.bulan , vfvq.tahun , vfvq. kode_vendor, avg(vfvq.abnormal) as avg
            from v_final_value_qc vfvq 
            where date_format(vfvq.tgl, '%Y-%m') between '${startDate}' and '${endDate}'
            and vfvq.kode_vendor  = '${kode_vendor}';`
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    getClosing: async (req, res) => {
        try {
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let supplier_code = req.body.kode_vendor;
            let query = `
            select vtsc.supplier_code , vtsc.tgl_complain , vtsc.status_complain 
            from v_tr_submit_capa vtsc 
            where vtsc.supplier_code = '${supplier_code}'
            and date_format(vtsc.tgl_complain , '%Y-%m') between '${startDate}' and '${endDate}';
            `
            console.log(query)
            let [data, _] = await qa_tracking_supplier.query(query);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getHistorical: async (req, res) => {
        try {
            let date = new Date();
            let startDate = req.body.startDate;
            let name_vendor = req.body.name_vendor;
            let query = 
            `
               SELECT 
                YEAR(tc.tgl_complain) AS tahun,
                MONTH(tc.tgl_complain) AS bulan,
                COUNT(tc.nama_supplier) AS jumlah_transaksi
                FROM tr_complan tc
                inner JOIN mst_material_capa mmc ON mmc.kode_vendor = tc.nama_supplier 
                WHERE YEAR(tc.tgl_complain) = '${startDate}'
                and tc.nama_supplier = ${name_vendor}
                GROUP BY YEAR(tc.tgl_complain), MONTH(tc.tgl_complain)
                ORDER BY tahun, bulan;

            `

            console.log(query);
            let [data, _] = await qa_tracking_supplier.query(query);
            console.log(data)
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



}