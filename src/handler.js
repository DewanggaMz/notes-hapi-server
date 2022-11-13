/* eslint-disable consistent-return */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const createdAt = new Date().toLocaleString();
  const updatedAt = createdAt;
  const id = nanoid(16);
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);

  const isSucess = notes.filter((node) => node.id === id).length > 0;

  if (isSucess) {
    const response = h.response({
      status: 'sukses',
      message: 'sukses menambahkan notes',
      data: {
        id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal menambahkan note',
  });
  response.code(500);
  return response;
};

const getHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getHandlerId = (req, h) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);

  if (note !== -1) {
    const response = h.response({
      status: 'sukses',
      data: {
        note,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'notes tidak di temukan',
  });
  response.code(500);
  return response;
};

const putHandlerId = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toLocaleString();
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'sukses',
      data: {
        notes,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal update',
    message: 'gagal updates note',
  });

  response.code(500);
  return response;
};

const deleteNote = (res, h) => {
  const { id } = res.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'sukses',
      data: {
        notes,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal delete',
    message: 'gagal meghapus note',
  });

  response.code(500);
  return response;
};

module.exports = {
  addHandler, getHandler, getHandlerId, putHandlerId, deleteNote,
};
