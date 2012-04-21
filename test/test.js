console.log("-- Test 1 (multiple implementations) --");
(function(){
  var 
    transportation,
    travelFare,
    travelTime,
    tripToGrandma,
    costOfTripToGrandma,
    timeOfTripToGrandma;

  transportation = adt('car','train','plane');
  console.log("transportation: ", transportation);
  travelFare = adt({
    car: function(miles) { return miles * 0.3; },
    train: function(miles,speed) { return miles * 0.1 + 0.2 * speed; },
    plane: function(miles) { return miles * miles * 0.3 + 22.0; }
  });
  travelTime = adt({
    car: function(miles) { return miles / 55.3; },
    train: function(miles,speed) { return 0.5 + miles / 60.0; },
    plane: function(miles) { return (miles < 600? 2.5 : 4.0) + miles / 300.0; }
  });
  tripToGrandma = transportation.train(52, 0.6);
  console.log("trip to grandma: ", tripToGrandma);
  costOfTripToGrandma = travelFare(tripToGrandma);
  console.log("cost of trip to grandma: ", costOfTripToGrandma);
  timeOfTripToGrandma = travelTime(tripToGrandma);
  console.log("time of trip to grandma: ", timeOfTripToGrandma);
})();

console.log("-- Test 2 (nested expressions) --");
(function(){
  var
    math = adt('plus', 'mul'),
    calc = adt({
      plus: function(a,b) { return a + b; },
      mul: function(a,b) { return a * b; }
    }),
    serialize = adt({
      plus: function(a,b) { return "(" + String(a) + " + " + String(b) + ")"; },
      mul: function(a,b) { return "(" + String(a) + " * " + String(b) + ")"; }
    }),
    expr = math.mul(math.plus(5, 9), math.plus(33, math.mul(20, 1))),
    answer = calc(expr),
    detailedAnswer = serialize(expr) + " = " + String(answer);
  console.log("detailed answer: ", detailedAnswer)
})();

console.log("-- Test 3 (automatic constructors) --");
(function(){
  var
    mathOps = {
      plus: function(a,b) { return a + b; },
      mul: function(a,b) { return a * b; }
    },
    mathEval = adt(mathOps),
    mathCons = adt.constructors(mathOps),
    // or equivalently: mathCons = adt.constructors(mathEval)
    expr = mathCons.mul(mathCons.plus(5, 9), mathCons.plus(33, mathCons.mul(20, 1))),
    answer = mathEval(expr);
  console.log("answer: ", answer);
})();

console.log("-- Test 4 (non-enumerable api's) --");
(function(){
  var
    MathCons = adt.own.constructors(Math),
    MathEval = adt.own(Math),
    formula = MathCons.pow(MathCons.random(), MathCons.cos(0.1)),
    result = MathEval(formula);
  console.log(result);
})();
