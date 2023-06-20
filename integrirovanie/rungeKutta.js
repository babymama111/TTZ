function rungeKutta(dydx, xi, yi, stepSize, numOfSteps, t_p) {
  var xs = [xi];
  var ys = [yi];

  for (let i = 1; i <= numOfSteps; i++) {
    if (xs[i] >= t_p) {
        break;
      }
    var k1 = stepSize * dydx(xi, yi);
    var k2 = stepSize * dydx(xi + stepSize / 2, yi + k1 / 2);
    var k3 = stepSize * dydx(xi + stepSize / 2, yi + k2 / 2);
    var k4 = stepSize * dydx(xi + stepSize, yi + k3);

    yi = yi + (1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    xi = xi + stepSize;
    xs.push(xi);
    ys.push(yi);
  }
  return [xs, ys];
}
module.exports = { rungeKutta };
// function rungeKutta(dydt, t0, y0, stepSize, numOfSteps) {
//   let t = [t0];
//   let y = [y0];
//   let h = stepSize;

//   for (let i = 0; i < numOfSteps; i++) {

//     let k1 = dydt(t[i], y[i]);
//     let k2 = dydt(t[i] + 0.5 * h, y[i] + 0.5 * h * k1);
//     let k3 = dydt(t[i] + 0.5 * h, y[i] + 0.5 * h * k2);
//     let k4 = dydt(t[i] + h, y[i] + h * k3);

//     y[i + 1] = y[i] + (1 / 6) * h * (k1 + 2 * k2 + 2 * k3 + k4);
//     t[i + 1] = t[i] + h;
//   }

//   return [t, y];
// }
