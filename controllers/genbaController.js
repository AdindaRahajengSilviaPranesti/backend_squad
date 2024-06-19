const { qa_gmp } = require("../config/connection")

module.exports = {
    getAllFindingCross: async (req, res) => {
        try {
            let query = `
            SELECT
                tr_laporan_d.id,
                tr_laporan_d.tgl ,
                tr_laporan_d.jenis_inspection ,
                mst_category.category ,
                tr_laporan_d.pic_area ,
                #tr_follow_up_h.status
                case 
                    when tr_follow_up_h.status = 2 then "Close"
                    else "Open"
                end as status
            FROM
                tr_laporan_d
            JOIN
                tr_follow_up_h ON tr_laporan_d.id = tr_follow_up_h.id_temuan
            JOIN
            	mst_category ON mst_category.id = tr_laporan_d.category 
            WHERE
                tr_laporan_d.jenis_inspection = 1
                AND tr_laporan_d.tgl BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND CURDATE()`

            let [data, _] = await qa_gmp.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getAllFindingSelf: async (req, res) => {
        try {
            let query = `
            SELECT
                tr_laporan_d.id,
                tr_laporan_d.tgl ,
                tr_laporan_d.jenis_inspection ,
                mst_category.category ,
                tr_laporan_d.pic_area ,
                #tr_follow_up_h.status
                case 
                    when tr_follow_up_h.status = 2 then "Close"
                    else "Open"
                end as status
            FROM
                tr_laporan_d
            JOIN
                tr_follow_up_h ON tr_laporan_d.id = tr_follow_up_h.id_temuan
            JOIN
            	mst_category ON mst_category.id = tr_laporan_d.category 
            WHERE
                tr_laporan_d.jenis_inspection = 0
                AND tr_laporan_d.tgl BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND CURDATE()`

            let [data, _] = await qa_gmp.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    getAllFindingArea: async (req, res) => {
        try {
            let query = `
            SELECT
                ma.area , 
                case 
                    when tfuh.status = 2 then "Close"
                    else "Open"
                end as status,	
                tld.jenis_inspection,
                COUNT(tld.id) as total
            FROM
                tr_laporan_d tld
                JOIN tr_follow_up_h tfuh ON tld.id = tfuh.id_temuan
                JOIN mst_area ma ON tld.area = ma.id
            WHERE
                tgl BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND CURDATE()
            GROUP BY 
                ma.area , tfuh.status, tld.jenis_inspection `

            let [data, _] = await qa_gmp.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



}
