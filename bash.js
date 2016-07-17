var parser = require('./pipeline-parser');
var pipeline = require('./pipeline');
var chalk = require('chalk');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  try {
    var commandList = parser(cmd);
    pipeline(commandList, function(err, result){

      if(err)
        process.stdout.write(chalk.red(err));
      else
        process.stdout.write(result.toString());

      process.stdout.write('\nprompt > ');
    });
  }
  catch(e){
    console.log(e);
    process.stdout.write('\nprompt > ');
  
  }


});
