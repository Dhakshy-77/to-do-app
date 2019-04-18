const Todos = require('../models').Todos;
const Users = require('../models').Users;

const getAll = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, todos;
  let whereStatement = {};
  if (req.query.name) {
    whereStatement.name = {
      $like: '%' + req.query.name + '%',
    };
  }
  if (req.query.isCompleted) {
    whereStatement.isCompleted = {
      $eq: req.query.isCompleted === 'true',
    };
  }
  whereStatement.userId = {
    $eq: req.user.id,
  };
  [err, todos] = await to(
    Todos.findAll({ where: whereStatement, order: [['orderId', 'ASC']] }),
  );
  if (err) console.log(err.message);
  return res.json(todos);
};
module.exports.getAll = getAll;

const getAllAdmin = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, todos;
  if (req.user.userRoleId !== 1) {
    res.statusCode = 401;
    return res.json({ success: false, error: 'Unauthorized' });
  }
  let whereStatement = {};
  let userWhereStatement = {};
  if (req.query.name) {
    whereStatement.name = {
      $like: '%' + req.query.name + '%',
    };
  }
  if (req.query.isCompleted) {
    whereStatement.isCompleted = {
      $eq: req.query.isCompleted === 'true',
    };
  }

  if (req.query.phone) {
    userWhereStatement.phone = {
      $like: '%' + req.query.phone + '%',
    };
  }
  [err, todos] = await to(
    Todos.findAll({
      include: [{ model: Users, where: userWhereStatement }],
      where: whereStatement,
      order: [['orderId', 'ASC']],
    }),
  );
  if (err) console.log(err.message);
  return res.json(todos);
};
module.exports.getAllAdmin = getAllAdmin;

const get = async function (req, res) {
  let err, todo;
  let todoId = parseInt(req.params.todoId);
  res.setHeader('Content-Type', 'application/json');
  [err, todo] = await to(Todos.findByPk(todoId));
  if (!todo) {
    res.statusCode = 404;
    return res.json({ success: false, error: err });
  }
  return res.json(todo);
};
module.exports.get = get;

const create = async function (req, res) {
  res.setHeader('ContentType', 'application/json');
  const body = req.body;

  [err, orderId] = await to(Todos.max('orderId'));
  if (err) console.log(err.message);

  body.userId = req.user.id;
  body.orderId = orderId || orderId === 0 ? orderId + 1 : 0;
  if (!body.name) {
    return ReE(res, 'Please enter a name', 422);
  } else {
    let err, toDo;

    [err, toDo] = await to(Todos.create(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, toDo, 201);
  }
};
module.exports.create = create;

const update = async function (req, res) {
  let err, toDo;
  toDo = req.body;
  [err, toDo] = await to(
    Todos.update(toDo, {
      where: {
        id: toDo.id,
      },
    }),
  );
  if (err) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    res.statusCode = 422;
    return res.json({ success: false, error: err });
  }

  return res.json(toDo);
};
module.exports.update = update;


const markDone = async function (req, res) {
  let err, todoId;

  todoId = req.params.todoId;
  console.log(todoId);
  [err, todo] = await to(
    Todos.update(
      { isCompleted: true, dateCompleted: new Date() },
      {
        where: {
          id: todoId,
        },
      },
    ),
  );
  if (err) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    res.statusCode = 422;
    return res.json({ success: false, error: err });
  }
  [err, returnTodo] = await to(Todos.findByPk(todoId));
  return res.json(returnTodo);
};
module.exports.markDone = markDone;
