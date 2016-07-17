var fs = require('fs');

module.exports = {
  cat: function(start, args, next){
    var files = args.split(' ');
    var results = [];
    var counter = 0;
    function processFile(err, result, idx){
      if(err)
        return next('Error reading file ' + files[idx], null);
      results[idx] = result; 
      counter++;
      if(counter === files.length){
        var lines = results.reduce(function(memo, result){
          memo = memo.concat(result.split('\n'));
          return memo;
        }, []);
        next(null, lines.join('\n'));
      }
    }
    files.forEach(function(file, index){
      fs.readFile(file, function(err, result){
        if(err)
          return processFile(err, null, index);
        var data = result.toString().trim();
        processFile(null, data, index);
      });
    });
  },
  head: function(start, args, next){
    function process(result){
      var lines = result.trim().split('\n');
      next(null, lines.slice(0, 10).join('\n'));
    }
    if(start)
      return process(start);
    fs.readFile(args, function(err, result){
      if(err)
        next('Error reading file ' + args);
      else
        process(result.toString());
    });
  },
  tail: function(start, args, next){
    function process(result){
      var lines = result.trim().split('\n');
      next(null, lines.slice(lines.length - 10).join('\n'));
    }
    if(start)
      return process(start); 
    fs.readFile(args, function(err, result){
      if(err)
        next('Error reading file ' + args);
      else {
        process(result.toString());
      }
    });
  },
  wc: function(start, args, next){
    var lines = start.trim().split('\n');
    next(null, lines.length);
  }
};
