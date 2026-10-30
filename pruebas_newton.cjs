const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/Interpolacion_Newton.html','utf8').split('<script>')[1].split('// Interfaz:')[0];
const scope=vm.createContext({});vm.runInContext(source,scope);
const close=(a,b)=>assert(Math.abs(a-b)<1e-8*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const check=(name,fn)=>{fn();console.log('OK:',name);};
check('Cúbico, nodos no equidistantes',()=>{
 const model=scope.interpolate(scope.parsePoints('-1, 2\n0, 1\n2, 5\n3, 22'));
 for(const x of [-2,-1,0,.5,1,2,3,4])close(scope.evaluateNewton(model,x),x*x*x-2*x+1);
 [1,-2,0,1].forEach((a,i)=>close(model.expanded[i],a));
});
check('Nodos desordenados y polinomio cuadrático',()=>{
 const model=scope.interpolate(scope.parsePoints('4; 17\n-2;5\n1;2'));
 for(const x of [-3,0,1.5,5])close(scope.evaluateNewton(model,x),x*x+1);
});
check('Un solo punto: constante',()=>{const m=scope.interpolate(scope.parsePoints('2, 7'));close(scope.evaluateNewton(m,-19),7);});
check('Ceros y grado menor al máximo',()=>{const m=scope.interpolate(scope.parsePoints('0,0\n1,0\n2,0'));close(scope.evaluateNewton(m,10),0);assert.equal(scope.polynomialExpanded(m.expanded),'P(x) = 0');});
check('Notación científica, espacios y tabulaciones',()=>{const p=scope.parsePoints('1e-3 2.5\n2e-3\t3.5');close(scope.evaluateNewton(scope.interpolate(p),.0015),3);});
check('Rechazo de x repetida, incluyendo -0',()=>{for(const s of ['1,2\n1,3','0,2\n-0,2'])assert.throws(()=>scope.parsePoints(s),/repetido/);});
check('Rechazo de datos incompletos o no finitos',()=>{for(const s of ['', '1,2,3','1,abc','1,1e309','2'])assert.throws(()=>scope.parsePoints(s));});
check('Polinomio de grado 6 y reconstrucción de todos los nodos',()=>{
 const f=x=>.25*x**6-2*x**4+3*x-7,pts=[-3,-2,-.5,0,.75,2,3].map(x=>({x,y:f(x)}));
 const m=scope.interpolate(pts);for(const x of [-2.3,-.8,.1,1.2,2.8])close(scope.evaluateNewton(m,x),f(x));
 pts.forEach(p=>close(scope.evaluateNewton(m,p.x),p.y));
});
check('Identidad del formato desarrollado x^2 + 1',()=>{const m=scope.interpolate(scope.parsePoints('0,1\n1,2\n2,5'));assert.equal(scope.polynomialExpanded(m.expanded),'P(x) = x^2 + 1');});
console.log('9 pruebas completadas.');
