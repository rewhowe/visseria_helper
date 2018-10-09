function titleCase(s) {
  return s.split(/ |_/).map( (s) => s[0].toUpperCase() + s.slice(1) ).join(' ');
}
