const { qa_microbiology } = require("../config/connection")

module.exports = {
    getRedAll: async (req, res) => {
        let result = [];
        let table = [
            "tr_swab_al4_d",
            "tr_swab_can_d",
            "tr_swab_enmix_d",
            "tr_swab_oc3_d",
            "tr_swab_pet_d",
        ]
        try {

            for (let tableName of table) {
                let query = `
                select 
                    "${tableName}" as "table",
                    year(b.tanggal_sampling) as 'year',
                    a.*
                from 
                    ${tableName} a 
                    join tr_swab_al4_h b on a.id_head = b.id 
                where 
                    a.ket_bacteria > 2
                    or a.ket_yeast > 2
                    or a.ket_mold  > 2`

                let [data, _] = await qa_microbiology.query(query);
                if(data.length != 0){
                    for(let eachData of data){
                        result.push(eachData);
                    }
                }
            }

            
            console.log('red', result)

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getYellowAll: async (req, res) => {
        let result = [];
        let table = [
            "tr_swab_al4_d",
            "tr_swab_can_d",
            "tr_swab_enmix_d",
            "tr_swab_oc3_d",
            "tr_swab_pet_d",
        ]
        try {

            for (let tableName of table) {
                let query = `
                select 
                    "${tableName}" as "table",
                    year(b.tanggal_sampling) as 'year',
                    a.*
                from 
                    ${tableName} a 
                    join tr_swab_al4_h b on a.id_head = b.id 
                where 
                    a.ket_bacteria = 2
                    or a.ket_yeast = 2
                    or a.ket_mold  = 2`

                let [data, _] = await qa_microbiology.query(query);
                if(data.length != 0){
                    for(let eachData of data){
                        result.push(eachData);
                    }
                }
            }

            
            console.log('yellow', result)

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    postTarget: async (req, res) => {
        try {
            let query = `
            SELECT
                *
            FROM
                mst_target_red_area
            WHERE
                tahun = ${req.body.year}
            ORDER BY
                area`

            let [data, _] = await qa_microbiology.query(query);
            res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    postArea: async (req, res) => {
        let line = req.body.line
        let id_line;

        if (line === "tr_swab_al4") {
            id_line = 4
        } else if(line === "tr_swab_can"){
            id_line = 1
        } else if(line === "tr_swab_pet"){
            id_line = 2
        } else if(line === "tr_swab_enmix"){
            id_line = 5
        } else if(line === "tr_swab_oc3"){
            id_line = 3
        }

        try {
            let query = `
            SELECT
                id,
                sub_area
            FROM
                mst_swab_subarea
            WHERE
                id_area = ${id_line}`

            let [data, _] = await qa_microbiology.query(query);
            res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
    postResultSwab: async (req, res) => {
        try {
            let query = `
            SELECT
                a.detail_area,
                a.${req.body.micro},
                b.tanggal_sampling,
                CONCAT('W',WEEK(b.tanggal_sampling)+1) AS week
            FROM
                ${req.body.line}_d a
                LEFT JOIN ${req.body.line}_h b ON a.id_head = b.id
            WHERE
                (b.tanggal_sampling >= '${req.body.start}' AND b.tanggal_sampling <= '${req.body.end}')
                #AND (a.${req.body.micro} > 0)
                AND id_area = '${req.body.area}'
            ORDER BY
                b.tanggal_sampling`

            let [data, _] = await qa_microbiology.query(query);
            res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },



}