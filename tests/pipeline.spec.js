// cat a file
const commands = require('../commands');
const cat = commands.cat;
const wc = commands.wc;
const head = commands.head;
const tail = commands.tail;
const pipeline = require('../pipeline');
const expect = require('chai').expect;

var fooData = [];
var i = 1;
while(fooData.length < 20){
  fooData.push(i++);
}

var barData = fooData.slice(0).reverse();

describe('pipeline', function(){
  describe('using the cat command', function(){

    describe('with a valid file foo.txt', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'foo.txt' }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns the contents of the file', function(){
        expect(result).to.equal(fooData.join('\n'));
      });
    
    });

    describe('with a valid file bar.txt', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'bar.txt' }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns the contents of the file', function(){
        expect(result).to.equal(barData.join('\n'));
      });
    
    });

    describe('with two files foo.txt bar.txt', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'foo.txt bar.txt' }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns the contents of the two file', function(){
        expect(result).to.equal(fooData.concat(barData).join('\n'));
      });
    
    });

    describe('with an invalid file', function(){
      var err;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'x.txt' }], function(_err, _result){
          err = _err;
          done();
        });
      });
      it('returns an error', function(){
        expect(err).to.equal('Error reading file x.txt');
      });
    
    });
  
  });

  describe('using the cat command with the wc', function(){

    describe('with a valid file', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'foo.txt' }, { fn: wc }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns 20', function(){
        expect(result).to.equal(20);
      });
    
    });

    describe('with an invalid file', function(){
      var err;
      beforeEach(function(done){
        pipeline([{ fn: cat, args: 'x.txt' }, { fn: wc }], function(_err, _result){
          err = _err;
          done();
        });
      });
      it('returns an error', function(){
        expect(err).to.equal('Error reading file x.txt');
      });
    
    });
  
  });

  describe('using the head command with the wc', function(){

    describe('with a valid file', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: head, args: 'foo.txt' }, { fn: wc }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns 10', function(){
        expect(result).to.equal(10);
      });
    
    });

  });

  describe('using the head command', function(){

    describe('with a valid file', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: head, args: 'foo.txt' }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns foo\nbar', function(){
        expect(result).to.equal(fooData.slice(0, 10).join('\n'));
      });
    
    });

  });

  describe('using the tail command', function(){

    describe('with a valid file', function(){
      var result;
      beforeEach(function(done){
        pipeline([{ fn: tail, args: 'foo.txt' }], function(err, _result){
          result = _result;
          done();
        });
      });
      it('returns bar\nbazz', function(){
        expect(result).to.equal(fooData.slice(10).join('\n'));
      });
    
    });

  });

});
