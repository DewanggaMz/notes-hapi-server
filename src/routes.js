const {
  addHandler, getHandler, getHandlerId, putHandlerId, deleteNote,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getHandlerId,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: putHandlerId,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNote,
  },
];

module.exports = routes;
