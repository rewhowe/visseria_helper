function titleCase(s) {
  return s.split(/ |_/).map( (s) => s[0].toUpperCase() + s.slice(1) ).join(' ');
}

function studlyCase(s) {
  return s.split(/ |_/).map( (s) => s[0].toUpperCase() + s.slice(1) ).join('');
}

function int(i) {
  return parseInt(i) || 0;
}
