const { qa_gmp } = require("../config/connection")

module.exports = {
    getAllFinding: async (req, res) => {
        try {
            let query = `
            SELECT
                *
            from tr_laporan_d
            join tr_follow_up_h on tr_laporan_d.id = tr_follow_up_h.id_temuan
            WHERE
                tr_laporan_d.jenis_inspection = 1
                AND tr_laporan_d.tgl BETWEEN "2024-01-01" AND "2024-06-01"`

            let [data, _] = await qa_gmp.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



}