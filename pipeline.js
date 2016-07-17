module.exports = function(commandList, done){
  function next(err, result){
    if(err)
      return done(err);
    if(commandList.length)
      process(result);
    else
      done(null, result);
  }

  function process(start){
    var command = commandList.shift();
    command.fn(start, command.args, next);
  }

  process();

}
