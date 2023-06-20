let { rungeKutta } = require("./integrirovanie/rungeKutta.js");
let { plot } = require("./graphiki/graphic.js");
let {run} = require("./graphiki/graphic.js")
// введем константы

let g = +9.80665; // ускорение свободного падения
let tyagyaVooruj = +15; // тяговооруженность
let m0 = +49; // начальная масса ракеты
let v_k = +375; //  скорость в конце стартого участка траектории
let v_n = +60; //  скорость вылета из тпк
let max_peregr = 20; // максимальная перегрузка
let t_p = +2.5; //  время работы рдтт
let I_ud = +2600; // удельный импульс(тут 2600 для смесевого)
let hi = 0.85; // потери на лобовое сопротивление
let tetta = 10; // угол
let t_0 = 0

// функция для расчета запаса топлива по формуле циалковского

function Mu(v_k, v_n, hi, I_ud) {
  let e = Math.exp(1);
  let mu = Number(1 - e ** (-(v_k - v_n) / (hi * I_ud)));
  return mu;
}
let mass_topl = Mu(v_k, v_n, hi, I_ud) * m0;
let P_kos = tyagyaVooruj*m0*g*Math.cos(20 * Math.PI / 180)
let I_summ = P_kos*t_p
let I_ud_pereschitannoe = I_summ/mass_topl

//Тяга с учетом косопоставленного сопла
console.log(`Тяга с учетом косопоставленного сопла: ${P_kos}`)
console.log(`запас топлива: ${Mu(v_k, v_n, hi, I_ud)}`)
console.log(`масса топлива: ${mass_topl}`)
console.log(`суммарный импульс: ${I_summ}`)
console.log(`удельный импульс: ${I_ud_pereschitannoe}`)



//численное интегрирование
let h = 0.01
function P(tyagyaVooruj) {
  // Ваше уравнение P(tyagyaVooruj)
  return tyagyaVooruj * m0 * g;
}

function m(t, t_p) {
  // Ваше уравнение m(t, t_p)
  return m0 - (mass_topl * t / t_p);
}
function dVdt(t, V) {
  let nx = hi * P(tyagyaVooruj) / m(t, t_p); // расчет продольной перегрузки
  return (nx / g) - Math.sin(tetta); // правая часть дифференциального уравнения
}
function runge_kutta(t_0, v_n, t_p, h) {
  let t = t_0, V = v_n;
  let t_array = [], V_values = [], nx_values = []; // массивы для хранения значений

  
  while (t < t_p) {
    t_array.push(t);
    V_values.push(V);
    // Вычисление коэффициентов k1, k2, k3 и k4
    let k1 = h * dVdt(t, V);
    let k2 = h * dVdt(t + h/2, V + k1/2);
    let k3 = h * dVdt(t + h/2, V + k2/2);
    let k4 = h * dVdt(t + h, V + k3);
    
    // Вычисление значения V(t + h) методом Рунге-Кутты
    V += (k1 + 2*k2 + 2*k3 + k4) / 6;
    let nx = hi * P(tyagyaVooruj) / m(t, t_p);
    nx_values.push(nx); // добавление текущего значени
    // Переход к следующей итерации
    t += h;
  }
  
  return { t_array, V_values, nx_values }; // возвращаем все три массива значений
}
let result = runge_kutta(t_0, v_n, t_p, h)
console.log(Math.max(...result.t_array)); // максимальное значение временных значений
console.log(Math.max(...result.V_values)); // максимальное значение скорости
console.log(Math.max(...result.nx_values));
let data1 = [[...result.V_values],[...result.t_array]]
let data2 = [[...result.nx_values],[...result.t_array]]

const configuration = {
  type: 'line',
  data: {
    labels: [...data1[1]],
    datasets: [{
      label: 'Скорость',
      data: [...data1[0]],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 0.1
    }, {
      label: 'перегрузка',
      data: [...data2[0]],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart Title'
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'время'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'скорость/перегрузка'
        },
        suggestedMin: 0,
        suggestedMax: 200
      }
    }
  }
};
run(configuration)