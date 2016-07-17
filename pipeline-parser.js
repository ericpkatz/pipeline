const commands = require('./commands');
module.exports = function(input){
  var commandStrings = input.split('|');
  return commandStrings.reduce(function(memo, commandString){
    var parts = commandString.trim().split(' ');
    var command = commands[parts[0]]; 
    if(!command)
      throw new Error('bad command ' + parts[0]);
    var args = parts.slice(1).join(' ');
    memo.push({ fn: command, args: args });
    return memo;
  }, []);
  return input;
};
