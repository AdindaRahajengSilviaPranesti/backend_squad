const { iot_oci1 } = require("../config/connection");
const { iot_oci2 } = require("../config/connection");
const { iot_fsb } = require("../config/connection");

const lotno = [];
const prod_order = [];
const product = [];
const mst_prodidentity = [];

const getMstProidentity = async (req, res) => {
  try {
    let query = await iot_oci1.query(`
       SELECT 
       a.tgl,
       a.lotno,
       a.prod_order,
       a.product,
       UNIX_TIMESTAMP(date_format((a.prod_start),'%Y-%m-%d %H:%i:%s')) as prod_start,
       (
           select datediff(
               (select 
               IF(COUNT(id) = 0, now(), created_at) as created_at
                 FROM tr_perilisan_h
                 where prod_order = a.prod_order), from_unixtime(UNIX_TIMESTAMP(date_format((a.prod_start),'%Y-%m-%d %H:%i:%s'))) 
           )	
       ) as fg_quarantine
       from mst_prodidentity a
       GROUP BY a.tgl, a.lotno, a.prod_order, a.product, a.prod_start
       ORDER BY a.tgl DESC
       `);
    // console.log(res);
     for (const row of query[0]) {
       lotno.push(row.lotno);
       prod_order.push(row.prod_order);
       product.push(row.product);
     }  
  } catch (error) {
    res.send(error);
  }
};

const getCCP = async (req,res) => {
    try {
        let query = await iot_oci1.query(`
        SELECT 
        a.prod_order1,
        IF(COUNT(a.id) > 1 AND 
           ((c.product LIKE '%IW%' AND (TIA413 BETWEEN 103 AND 107)) OR 
            (c.product NOT LIKE '%IW%' AND (TIA413 BETWEEN 108 AND 112))), 1, 0) AS jumlah
    FROM 
        scada_db1.ppi_ilbfiller1 a
    INNER JOIN 
        aio_iot_oci1.mst_prodidentity c ON a.prod_order1 = c.prod_order
    GROUP BY 
        prod_order1

    UNION

    SELECT 
        pif.prod_order1,
        IF(COUNT(pif.id) > 1, 1, 0) AS jumlah
    FROM 
        scada_db1.ppi_ilbfiller1 pif
    WHERE 
        (
            (FICA411 > 17952 OR FICA411 < 10772)
            OR 
            (FICA411 > 22609 OR FICA411 < 13566)
            OR 
            (FICA411 > 30011.01 OR FICA411 < 18006.61)
        )
    GROUP BY 
        pif.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Pressure_Filling_Chamber < 1
    GROUP BY 
        cpaf.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Pressure_Transfer_Table < 1
    GROUP BY 
        cpaf.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Pressure_Cap_Cool < 1
    GROUP BY 
        cpaf.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Pressure_Cap_Steam < 1
    GROUP BY 
        cpaf.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Rotary_Speed > 49.5
    GROUP BY 
        cpaf.prod_order1

    union

    SELECT 
        cpaf.prod_order1,
        IF(COUNT(cpaf.id)>1, 1, 0) AS jumlah
    from 
        scada_db1.cttn_prod_area_filling1 cpaf
    where 
        cpaf.Press_Steam < 100 OR cpaf.Press_Steam > 150
    GROUP BY 
        cpaf.prod_order1

) combined_data
GROUP BY 
prod_order1
        `)
        console.log(query);
        res.status(200).json({
            data: query[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMstProidentity,
    getCCP
}
