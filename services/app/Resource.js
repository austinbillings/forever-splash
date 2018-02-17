const express = require('express');
const bodyParser = require('body-parser');
const trolley = require('trolley')({ enabled: false });
const { unimplemented } = require('./Utils');

class Resource {
  constructor () {
    this.mount = this.mount.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handlePut = this.handlePut.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleGet (req, res) {
    trolley.crash(res, {
      code: 501,
      message: unimplemented('handleGet')
    });
  }

  handlePut (req, res) {
    trolley.crash(res, {
      code: 501,
      message: unimplemented('handlePut')
    });
  }

  handlePost (req, res) {
    trolley.crash(res, {
      code: 501,
      message: unimplemented('handlePost')
    });
  }

  handleDelete (req, res) {
    trolley.crash(res, {
      code: 501,
      message: unimplemented('handleDelete')
    });
  }

  getRoutes () {
    return [
      { type: 'get', url: '/', handler: this.handleGet },
      { type: 'put', url: '/', handler: this.handlePut },
      { type: 'post', url: '/', handler: this.handlePost },
      { type: 'delete', url: '/', handler: this.handleDelete }
    ];
  }

  mount () {
    const routes = this.getRoutes();
    const router = express.Router();
    const parser = bodyParser.json({ limit: '10mb' });

    router.use(parser);
    routes.forEach(({ type, url, handler }) => router[type](url, handler));
    return router;
  }
};

module.exports = Resource;
