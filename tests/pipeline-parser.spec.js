//cat foo.txt | tail
const expect = require('chai').expect;
const pipelineParser = require('../pipeline-parser');
const commands = require('../commands');

describe('The pipeline parser', function(){

  describe('cat foo.txt', function(){
    var commandList;
    beforeEach(function(){
      commandList = pipelineParser('cat foo.txt');
    
    });

    it('creates commandList of { fn: cat, args: "foo.txt" }', function(){
      expect(commandList.length).to.equal(1);
      expect(commandList[0].fn).to.equal(commands.cat);
    });
  
  });
  
  describe('cat foo.txt | wc', function(){
    var commandList;
    beforeEach(function(){
      commandList = pipelineParser('cat foo.txt | wc');
    
    });

    it('creates commandList of { fn: cat, args: "foo.txt" }', function(){
      expect(commandList.length).to.equal(2);
      expect(commandList[1].fn).to.equal(commands.wc);
    });
  
  });

  describe('cat foo.txt | fizz', function(){
    var commandList;

    it('throws an exception', function(){
      expect(function(){ pipelineParser('cat foo.txt | fizz'); }).to.throw('bad command fizz');
    });
  
  });

});
