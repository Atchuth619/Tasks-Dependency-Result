//Fetch Results function
const checkResult = (taskData, dependenciesData) => {
  var tasks = taskData,
    dependencies = dependenciesData,
    result = [];
  // Checking for dependencies are there or not
  if (dependencies.length !== 0) {
    //Logic for cyclic dependency
    var leftdependencies = [],
      rightdependencies = [];
    dependencies.map((item) => {
      leftdependencies.push(item.split("=>")[0]);
      rightdependencies.push(item.split("=>")[1]);
    });
    if (checkCyclic(leftdependencies, rightdependencies)) {
      return "Cyclic dependency";
    }
    //Logic for having dependency
    else {
      result = tasks;
      dependencies.map((item) => {
        var dependentItem = item.split("=>");
        var independentIndex = result.indexOf(dependentItem[0]);
        var dependentIndex = result.indexOf(dependentItem[1]);
        if (dependentIndex > independentIndex) {
          result.splice(dependentIndex, 1);
          var leftresultarray = result.slice(0, independentIndex);
          var rightresultarray = result.slice(independentIndex);
          leftresultarray.push(dependentItem[1]);
          leftresultarray = leftresultarray.concat(rightresultarray);
          result = leftresultarray;
        }
      });
      return result;
    }
  } else {
    result = tasks;
    return result;
  }
};

//check for cyclic or not
const checkCyclic = (leftdependencies, rightdependencies) => {
  //previous value is denoted by 'r', curreny value is denoted by 'v' and 'i' is Index
  const nodes = leftdependencies.reduce(
    (r, v, i) => ((r[v] = r[v] || []).push(rightdependencies[i]), r),
    {}
  );
  for (let n of leftdependencies) {
    const queue = [[n, []]];
    while (queue.length) {
      const [node, seen] = queue.shift();
      if (!(node in nodes)) continue;
      if (seen.includes(node)) {
        return true;
      }
      seen.push(node);
      queue.push(...nodes[node].map((a) => [a, [...seen]]));
    }
  }
  return false;
};

module.exports = checkResult;
