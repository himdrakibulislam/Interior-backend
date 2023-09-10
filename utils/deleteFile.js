const { unlink } = require('node:fs');

exports.deleteFile = (destination) => {
    unlink(destination,(err) => {
      if(err) {
        return res.status(400).json({ error: 'Cound not delete Image' })
      }
    })
}