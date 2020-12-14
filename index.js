const {app, pool, Result} = require('./connect');
const login = require('./login/index');
const toDoList = require('./todolist/index');

app.all('*', (req, res, next) => {
    // 这里处理全局拦截，一定要写在最上面，不然会被别的接口匹配到而没有执行next导致捕捉不到
    next();
})

app.get('/get', (req, res) => {
    res.json(new Result({a: 'aaa'}))
})

app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        let curr = new Date();
        curr = '' + curr.getTime();
        console.log(typeof curr)
        conn.query(`update enum set value=${curr} where name='operationTime'`, (e, data) => {
            console.log(data)
            res.json(new Result({data}))
        })
        conn.release();
    })
})

app.all('/getTime', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from enum', (e, data) => {
            res.json(new Result({data}))
        })
        conn.release();
    })
})

app.use('/login', login);
app.use('/toDoList', toDoList);

const port = 80;
app.listen(port, () => {
    console.log(`服务启动，端口号：${port}`)
})
