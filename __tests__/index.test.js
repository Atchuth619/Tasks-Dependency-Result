const checkResult = require('../index');

//Test case for No Tasks and dependecy
test('No Tasks and dependecy', () => {
    var taskData = [] ,dependenciesData = [];
    expect(checkResult(taskData, dependenciesData)).toEqual([])
});

//Test case for Only Tasks and no dependecy
test('Only Tasks and no dependecy', () => {
    var taskData = ['a','b'] ,dependenciesData = [];
    expect(checkResult(taskData, dependenciesData)).toEqual(['a','b'])
});

//Test case for Having Tasks and  dependecy 
test('Having Tasks and  dependnecy', () => {
    var taskData = ['a','b','c'] ,dependenciesData = ['a:b','b:c'];
    expect(checkResult(taskData, dependenciesData)).toEqual(['c','b','a'])
});

//Test case for Cyclic dependecy
test('Cyclic dependecy', () => {
    var taskData = ['a','b','c'] ,dependenciesData = ['a:b','b:c','c:a'];
    expect(checkResult(taskData, dependenciesData)).toEqual('Cyclic dependency')
});