//import Transaction from "../mongooseModel/Transaction";
//const res = await blob.getProperties();
const axios = require('axios');
const excel = require('exceljs');
const router = Router()
router.post("/Data", (req, res, next) => {
    let from = new Date(req.body.from)
    let to = new Date(req.body.to)
    Transaction.find({
        createdAt: {
            $gte: from,
            $lte: to
        },
        $or: [
            {
                fromUser: req.body.memberId
            },
            {
                toUser: req.body.memberId
            }
        ]
    }) .exec(function(err, result){
        console.log("err", err, "result", result );
        if(err){
            callback(err)
        }else{            
          
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('My Transactions');
        worksheet.columns =[
        {header:'_id', key:'_id', width:40},
        {header:'transactionType', key:'transactionType', width:20},
        {header:'fromUser', key:'fromUser', width:40},
        {header:'toUser', key:'toUser', width:40},
        {header:'type', key:'type', width:10},
        {header:'amount', key:'amount', width:10},
        {header:'updatedAt', key:'updatedAt', width:20},
        {header:'createdAt', key:'createdAt', width:20},

        ];
    
        worksheet.addRows(result);
        res.setHeader(
            "Content-Type",
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "Data.xlsx"
        );
    
        workbook.xlsx.write(res).then((data) =>{
            res.end();
        console.log("File Saved!", data)
        })
       
    }
})
        
        
})








export default router
