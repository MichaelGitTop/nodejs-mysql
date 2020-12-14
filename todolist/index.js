const {pool, router, Result} = require('../connect');

router.get('/getList', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM todolist', (e, data) => {
      res.json(new Result({data}))
    })
    conn.release();
  })
})

router.post('/addToDo', (req, res) => {
    if(!req.body.name || !req.body.beginTime || !req.body.endTime || !req.body.object || !req.body.mark ) {
      res.json({
        code: 400,
        msg: '参数有误',
        data: null
      })
    }
  pool.getConnection((err, conn) => {
    console.log(`INSERT INTO todolist (name, beginTime, endTime, object, mark) values(${req.body.name}, ${req.body.beginTime}, ${req.body.endTime}, ${req.body.object}, ${req.body.mark})`);
    conn.query(`INSERT INTO todolist (name, beginTime, endTime, object, mark) values(${req.body.name}, ${req.body.beginTime}, ${req.body.endTime}, ${req.body.object}, ${req.body.mark})`, (e, data) => {
      console.log(data);
      console.log(e);
    })
  })
})

module.exports = router;
