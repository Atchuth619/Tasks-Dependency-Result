const checkResult = require('../index');

//Test case for No Tasks and dependency
test('No Tasks and dependency', () => {
    var taskData = [] ,dependenciesData = [];
    expect(checkResult(taskData, dependenciesData)).toEqual([])
});

//Test case for Only Tasks and no dependency
test('Only Tasks and no dependency', () => {
    var taskData = ['a','b'] ,dependenciesData = [];
    expect(checkResult(taskData, dependenciesData)).toEqual(['a','b'])
});

//Test case for Having Tasks and  dependency 
test('Having Tasks and  dependnecy', () => {
    var taskData = ['a','b'] ,dependenciesData = ['a=>b'];
    expect(checkResult(taskData, dependenciesData)).toEqual(['b','a'])
});

//Test case for Having Tasks and  dependency 
test('Having Tasks and  dependnecy', () => {
    var taskData = ['a','b','c','d'] ,dependenciesData = ['a=>b','c=>d'];
    expect(checkResult(taskData, dependenciesData)).toEqual(['b','a','d','c'])
});


//Test case for Having Tasks and  dependency 
test('Having Tasks and  dependnecy', () => {
    var taskData = ['a','b','c'] ,dependenciesData = ['a=>b','b=>c'];
    expect(checkResult(taskData, dependenciesData)).toEqual(['c','b','a'])
});

//Test case for Cyclic dependency
test('Cyclic dependency', () => {
    var taskData = ['a','b','c','d'] ,dependenciesData = ['a=>b','b=>c','c=>a'];
    expect(checkResult(taskData, dependenciesData)).toEqual('Cyclic dependency')
});