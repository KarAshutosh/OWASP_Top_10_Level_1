var yaml = require('js-yaml');

x = "test: !!js/function > \n  function f() { \n    console.log(1); \n  }();"

yaml.load(x);