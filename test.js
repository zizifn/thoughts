console.log(/SPXW*$/.test('spx'));

let name = 'SPX';
let rule = 'W';
let regex = 'SPXW*';
console.log(new RegExp(regex, 'gmi').test('spx'));