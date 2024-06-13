const { iot_lims_fsb} = require("../config/connection");
const { iot_oci1} = require("../config/connection");
const { getParameter } = require("./radarvisualController");

module.exports = {
    getParameter: async (req, res) => {
        try {
            let date = new Date();
            let query = `select *
            from tr_micro_h tmh `
            let [data, _] = await iot_lims_fsb.query(query);
            console.log('getParameter',query)

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getProduct: async (req, res) => {
        try {
            let kode_produk= req.params.kode_produk;
            let lotno= req.params.lotno;
            let date = new Date();
            let query = `select tmh.lotno, tmh.pro , tmh.product , vpf.kode_produk , vpf.produk 
            from tr_micro_h tmh 
            join v_pro_fg vpf on vpf.kode_produk  = tmh.product 
            where tmh.lotno = '${lotno}'
            and vpf.kode_produk ='${kode_produk}'
            group by vpf.produk `
            let [data, _] = await iot_lims_fsb.query(query);

            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

//FSB WITH FILTER
    getTypeParameter: async (req, res) => {
        try {
            let kode_produk= req.body.kode_product;
            let lotno= req.body.lotno;
            let date = new Date();
            let query = 
            `
            WITH Variations AS (
    SELECT
        tmh.lotno,
        tmh.pro,
        tmh.product,
        vpf.kode_produk,
        vpf.produk,
        COUNT(DISTINCT tmd.total_bacteria) AS cnt_total_bacteria,
        COUNT(DISTINCT tmd.mold_yeast) AS cnt_mold_yeast,
        COUNT(DISTINCT tmd.coliform) AS cnt_coliform,
        COUNT(DISTINCT tmd.salmonella) AS cnt_salmonella,
        COUNT(DISTINCT tmd.enterobacter) AS cnt_enterobacter
    FROM
        tr_micro_d tmd
    JOIN
        tr_micro_h tmh ON tmh.id = tmd.id_head
    JOIN
        v_pro_fg vpf ON vpf.kode_produk = tmh.product
    WHERE
        tmh.lotno = '${lotno}'
        AND vpf.kode_produk = '${kode_produk}'
    GROUP BY
        tmh.lotno,
        tmh.pro,
        tmh.product,
        vpf.kode_produk,
        vpf.produk
)
SELECT
    tmh.lotno,
    tmh.pro,
    tmh.product,
    vpf.kode_produk,
    vpf.produk,
    TRIM(TRAILING '.0' FROM ROUND(CASE WHEN v.cnt_total_bacteria > 1 THEN AVG(tmd.total_bacteria) ELSE MAX(tmd.total_bacteria) END, 1)) AS avg_total_bacteria,
    TRIM(TRAILING '.0' FROM ROUND(CASE WHEN v.cnt_mold_yeast > 1 THEN AVG(tmd.mold_yeast) ELSE MAX(tmd.mold_yeast) END, 1)) AS avg_mold_yeast,
    TRIM(TRAILING '.0' FROM ROUND(CASE WHEN v.cnt_coliform > 1 THEN AVG(tmd.coliform) ELSE MAX(tmd.coliform) END, 1)) AS avg_coliform,
    TRIM(TRAILING '.0' FROM ROUND(CASE WHEN v.cnt_salmonella > 1 THEN AVG(tmd.salmonella) ELSE MAX(tmd.salmonella) END, 1)) AS avg_salmonella,
    TRIM(TRAILING '.0' FROM ROUND(CASE WHEN v.cnt_enterobacter > 1 THEN AVG(tmd.enterobacter) ELSE MAX(tmd.enterobacter) END, 1)) AS avg_enterobacter
FROM
    tr_micro_d tmd
JOIN
    tr_micro_h tmh ON tmh.id = tmd.id_head
JOIN
    v_pro_fg vpf ON vpf.kode_produk = tmh.product
JOIN
    Variations v ON v.lotno = tmh.lotno AND v.kode_produk = vpf.kode_produk
WHERE
    tmh.lotno = '${lotno}'
    AND vpf.kode_produk = '${kode_produk}'
GROUP BY
    tmh.lotno,
    tmh.pro,
    tmh.product,
    vpf.kode_produk,
    vpf.produk,
    v.cnt_total_bacteria,
    v.cnt_mold_yeast,
    v.cnt_coliform,
    v.cnt_salmonella,
    v.cnt_enterobacter;

            `
            let [data, _] = await iot_lims_fsb.query(query);


            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    //progressAnalysis FSB
    getPanalysisfsb: async (req, res) => {
        try {
            let query = `  
                SELECT *, DATEDIFF(CURDATE(), tmh.tgl_pengerjaan) AS Hplus
                FROM tr_micro_h tmh
                WHERE tmh.status_approve IN ('1', '0')
                AND tmh.tgl_pengerjaan >= '2021-01-01'`
            let [data, _] = await iot_lims_fsb.query(query);

            console.log(query)
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },




//OC LINEE
    getParameteroc: async (req, res) => {
        try {
            let date = new Date();
            let query = `select *
            from tr_micro_h tmh `
            let [data, _] = await iot_oci1.query(query);

            

            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getProductoc: async (req, res) => {
        try {
            let product= req.params.product;
            let lotno= req.params.lotno;
            let date = new Date();
            let query = `select tmh.lotno,tmh.material_code , tmh.product as product_t , vtm.product as product_v  , vtm.product_name 
            from tr_micro_h tmh 
            join v_tr_micro vtm on vtm.product  = tmh.product  
            where tmh.lotno = '${lotno}'
            and vtm.product = '${product}'
            group by vtm.product `
            let [data, _] = await iot_oci1.query(query);

            console.log(query)
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    // OCLINE --> years
    getYearOc: async (req, res) => {
        try {
            console.log(req.body)
            let query = 
            `
            select *
            from v_tr_micro vtm 
            `
            let [data, _] = await iot_oci1.query(query);
    
    
            console.log(query)
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    // OCLINE --> Paramater & result
    getTypeParameterOc: async (req, res) => {
        try {
            console.log(req.body)
            let product= req.body.product;
            let lotno= req.body.lotno;
            let year = req.body.year;
            let query = 
            `select tmh.lotno,tmh.material_code , tmh.product as product_t , vtm.product as product_v  , vtm.product_name , vtm.id_group , vtm.group_pengujian , vtm.jenis_uji, vtm.ket_hasil 
            from tr_micro_d tmd 
            join tr_micro_h tmh on tmh.id = tmd.id_head 
            join v_tr_micro vtm on vtm.product  = tmh.product  
            where tmh.lotno = '${lotno}'
            and vtm.product = '${product}'
            and vtm.id_group = '60'
            limit 10`
            let [data, _] = await iot_oci1.query(query);


            console.log('getTypeParameterOc',query)
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    // OCLINE --> Water & result
    getTypeParameterOcWater: async (req, res) => {
        try {
            console.log(req.body)
            let product= req.body.product;
            let lotno= req.body.lotno;
            let id_group= req.body.id_group;
            let date = new Date();
            let query = 
            `
    SELECT 
    tmh.lotno,
    tmh.material_code,
    tmh.product AS product_t,
    vtm.product AS product_v,
    vtm.product_name,
    vtm.standard,
    vtm.id_group,
    vtm.group_pengujian,
    vtm.jenis_uji,
    CASE 
        WHEN vtm.ket_hasil != 'positive' THEN 'passed'
        ELSE vtm.ket_hasil
    END AS ket_hasil
    FROM 
    tr_micro_d tmd 
    JOIN 
    tr_micro_h tmh ON tmh.id = tmd.id_head 
    JOIN 
    v_tr_micro vtm ON vtm.product = tmh.product  
    WHERE 
    tmh.lotno = '${lotno}'
    AND vtm.product = '${product}'
    AND vtm.id_group NOT IN ('60')
    LIMIT 10;
    `
            let [data, _] = await iot_oci1.query(query);


            console.log(query)
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    //waiting approval,progress analysis OC
    getProwaitingoc: async (req, res) => {
        try {
            let query = `
            SELECT *, DATEDIFF(CURDATE(), tmh.samplingdate2) AS Hplus
            FROM tr_micro_h tmh
            WHERE tmh.status IN ('1', '0')
            AND tmh.samplingdate2 >= '2021-01-01'`
            let [data, _] = await iot_oci1.query(query);

            console.log(query)
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },


    getChart: async (req, res) => {
        try {
            let tgl_prod= req.body.tgl_prod;
            let query = 
            `
               SELECT 
                EXTRACT(YEAR FROM tgl_prod) AS tahun,
                EXTRACT(MONTH FROM tgl_prod) AS bulan,
                COUNT(CASE WHEN lotno LIKE '%K1' THEN 1 END) AS oc1,
                COUNT(CASE WHEN lotno LIKE '%K2' THEN 1 END) AS oc2
                FROM 
                v_tr_micro
                WHERE 
                EXTRACT(YEAR FROM tgl_prod) = ${tgl_prod}
                GROUP BY 
                EXTRACT(YEAR FROM tgl_prod),
                EXTRACT(MONTH FROM tgl_prod)
                ORDER BY 
                tahun,
                bulan
            `
            let [data, _] = await iot_oci1.query(query);

            console.log(query)
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
}