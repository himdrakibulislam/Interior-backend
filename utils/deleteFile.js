const { unlink } = require('node:fs');
const { access, constants } = require('node:fs');

exports.deleteFile = (destination) => {
  access(destination, constants.F_OK, (err) => {
    if(!err){
      unlink(destination,(err) => {
        if(err) {
          return res.status(400).json({ error: 'Cound not delete Image' })
        }
      });
    }else{
      return res.status(400).json({ error: "File does not exists!" });
    }
  });
     
}