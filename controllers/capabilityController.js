const { al4_skb } = require("../config/connection");

module.exports = {
    getMstJenisPengujian: async (req, res) => {
        try {
        let query;
        query = await al4_skb.query(`
                SELECT 
                    *
                FROM 
                    mst_jenispengujian
                GROUP BY 
                    jenis_uji
                `);

        res.status(200).json({
            message: "Get All Data mst_jenispengujian Success",
            data: query[0],
        });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Get All Data mst_jenispengujian Failed",
            });
        }
    },

    countCapability: async (req, res) => {
        const obj = {
            type_analisa : 'Pengambilan Sample Finish Good',
            jenis_uji : req.body.jenis_uji,
            group_pengujian : 'Produk',
            category : 'Pocari',
            start:req.body.start_date,
            end:req.body.end_date
        }

        if (obj.jenis_uji === 'Internal Pressure (kPa)') {
            obj.lsl = 30;
            obj.usl = 90;

        } else if(obj.jenis_uji === 'Filling volume'){
            obj.lsl = 501;
            obj.usl = 507;

        }

        let val1 = await al4_skb.query(
            `SELECT
                ROUND(AVG(a.hasil2),2) AS mean,
                ROUND(MIN(a.hasil2),2) AS min,
                ROUND(MAX(a.hasil2),2) AS max,
                ROUND(max(a.hasil2)-(min(a.hasil2)),2) AS 'range'
            FROM 
                tr_ipc_d a LEFT JOIN tr_ipc_h b ON a.id_head = b.id
                LEFT JOIN mst_jenispengujian c ON a.id_jenis_uji = c.id
                LEFT JOIN mst_product_copy d ON c.product = d.id
                LEFT JOIN mst_group_pengujian e ON a.group_uji = e.id
            WHERE 
                b.type_analisa = :type_analisa
                AND c.jenis_uji = :jenis_uji
                AND e.group_pengujian = :group_pengujian
                AND d.category = :category
                AND b.tgl_update >= :start
                AND b.tgl_update <= :end `, {
              type: al4_skb.QueryTypes.SELECT,
              replacements:obj
            }
        ).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Count Mean Failed",
            });
        })
        
        let val2 = await al4_skb.query(
            `SELECT
                ROUND(stddev(a.hasil2),2) AS stdev,
                (( :usl - :lsl )/(6*(STDDEV(a.hasil2)))) AS cp,
                least((((AVG(a.hasil2)) - :lsl)/(3*STDDEV(a.hasil2))),
                (( :usl - (AVG(a.hasil2)))/(3*STDDEV(a.hasil2)))) AS cpk    
            FROM 
                tr_ipc_d a LEFT JOIN tr_ipc_h b ON a.id_head = b.id
                LEFT JOIN mst_jenispengujian c ON a.id_jenis_uji = c.id
                LEFT JOIN mst_product_copy d ON c.product = d.id
                LEFT JOIN mst_group_pengujian e ON a.group_uji = e.id
            WHERE 
                b.type_analisa = :type_analisa
                AND c.jenis_uji = :jenis_uji
                AND e.group_pengujian = :group_pengujian
                AND d.category = :category
                AND b.tgl_pengerjaan >= :start
                AND b.tgl_pengerjaan <= :end `, {
              type: al4_skb.QueryTypes.SELECT,
              replacements:obj
            }
        ).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Count Mean Failed",
            });
        })

        
        const combinedArray = val1.concat(val2);

        console.log(combinedArray);
        // try {
        // let query;
        // query = await al4_skb.query(`
        //         SELECT 
        //             *
        //         FROM 
        //             mst_jenispengujian
        //         GROUP BY 
        //             jenis_uji
        //         `);

        // res.status(200).json({
        //     message: "Get All Data mst_jenispengujian Success",
        //     data: query[0],
        // });
        // } catch (error) {
        // console.log(error);
        // res.status(500).json({
        //     message: "Get All Data mst_jenispengujian Failed",
        // });
        // }
    },

};
