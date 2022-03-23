//Fetch Results function
const checkResult = (taskData, dependenciesData) => {
  var tasks = taskData,
    dependencies = dependenciesData,
    result = [];
  // Checking for dependencies are there or not
  if (dependencies.length !== 0) {
    //Logic for cyclic dependency
    var independentList = [], dependentList =[]
    dependencies.map((item) => {
      independentList.push(item.split(":")[0]);
      dependentList.push(item.split(":")[1]);
      independentList = [...new Set(independentList)];
      dependentList = [...new Set(dependentList)];
    })
    if (independentList.sort().toString() === dependentList.sort().toString()) {
      return "Cyclic dependency";
    }
    //Logic for having dependency
    else {
      result = tasks;
      dependencies.map((item) => {
        var dependentItem = item.split(":");
        var independentIndex = result.indexOf(dependentItem[0]);
        var dependentIndex = result.indexOf(dependentItem[1]);
        if (dependentIndex > independentIndex) {
          result.splice(dependentIndex, 1);
          //p1 and p2 are slices or resultant array
          var p1 = result.slice(0, independentIndex);
          var p2 = result.slice(independentIndex);
          p1.push(dependentItem[1]);
          p1 = p1.concat(p2);
          result = p1;
        }
      });
      return result;
    }
  } else {
    result = tasks;
    return result;
  }
};

//Pass taskData and dependenciesData
var taskData = ["a", "b", "c", "d", "e", "f"],
  dependenciesData = ["a:b", "a:c", "b:d", "c:d", "e:f"];

//Calling result function and passing taskData and dependenciesData as params to function
checkResult(taskData, dependenciesData);

module.exports = checkResult;
