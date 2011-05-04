// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

var assert = require('assert');

var dirsum = require('../lib/dirsum');

dirsum.digest(process.cwd() + '/tst/openldap', function(err, hashes) {
  assert.ok(!err);
  assert.ok(hashes);
  console.log(JSON.stringify(hashes, null, 2));
});
