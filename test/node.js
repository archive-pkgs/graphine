var test = require('tape');
var Node = require('../lib/node');

var fixture = new Node('some_key', {});
var broken = Node('test', {});

function isObject(value) {
  return (typeof value === 'object'
    && value.toString() === '[object Object]');
}

test('node should be a function', function (t) {
  t.plan(1);
  t.ok(typeof Node === 'function');
  t.end();
});

test('node should be proper created', function (t) {
  t.plan(1);
  t.ok(isObject(fixture) && fixture.id === 'some_key');
  t.end();
});

test('correct even called without new', function (t) {
  t.plan(1);
  t.ok(isObject(broken) && broken.id === 'test');
  t.end();
});

test('initial edges should be empty', function (t) {
  t.plan(1);
  t.equal(fixture.edges.length, 0);
  t.end();
});

test('addEdge should be defined', function (t) {
  t.plan(1);
  t.ok(typeof fixture.addEdge === 'function');
  t.end();
});

test('addEdge should add and edge', function (t) {
  t.plan(3);
  var node = new Node('test', {});
  fixture.addEdge(node);
  t.equal(fixture.edges.length, 1);
  t.ok(fixture.edges.indexOf(node) > -1);
  fixture.addEdge(node);
  t.equal(fixture.edges.length, 1, 'should not add same node');
  t.end();
});

test('addEdge should fails', function (t) {
  t.plan(3);
  t.throws(function () { fixture.addEdge('t') });
  t.throws(function () { fixture.addEdge({}) });
  t.throws(function () { fixture.addEdge([]) });
  t.end();
});

test('getConnections should return correct number', function (t) {
  t.plan(2);
  var fixture = new Node('test', {});
  var insert = new Node('second', {});
  fixture.addEdge(insert);
  t.equal(fixture.getConnections().length, 1);
  t.ok(Array.isArray(fixture.getConnections()));
  t.end();
});

test('getId should return correct id', function (t) {
  t.plan(1);
  var fixture = new Node('fixture', {});
  t.equal(fixture.getId(), 'fixture');
  t.end();
});
