var k;
k ||= typeof Immolate != 'undefined' ? Immolate : {};
var aa = "object" == typeof window, ba = "undefined" != typeof WorkerGlobalScope, ca = "object" == typeof process && process.versions?.node && "renderer" != process.type, da = !aa && !ca && !ba, ea = "./this.program", fa = (a, b) => {
  throw b;
}, ha = "undefined" != typeof document ? document.currentScript?.src : void 0;
"undefined" != typeof __filename ? ha = __filename : ba && (ha = self.location.href);
var ia = "", ja, ka;
if (ca) {
  if ("object" != typeof process || !process.versions?.node || "renderer" == process.type) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var la = process.versions.node, ma = la.split(".").slice(0, 3);
  ma = 10000 * ma[0] + 100 * ma[1] + 1 * ma[2].split("-")[0];
  if (160000 > ma) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + la + ")");
  }
  var fs = require("fs");
  ia = __dirname + "/";
  ka = a => {
    a = na(a) ? new URL(a) : a;
    a = fs.readFileSync(a);
    p(Buffer.isBuffer(a));
    return a;
  };
  ja = async a => {
    a = na(a) ? new URL(a) : a;
    a = fs.readFileSync(a, void 0);
    p(Buffer.isBuffer(a));
    return a;
  };
  1 < process.argv.length && (ea = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
  "undefined" != typeof module && (module.exports = k);
  fa = (a, b) => {
    process.exitCode = a;
    throw b;
  };
} else if (da) {
  if ("object" == typeof process && process.versions?.node && "renderer" != process.type || "object" == typeof window || "undefined" != typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
} else if (aa || ba) {
  try {
    ia = (new URL(".", ha)).href;
  } catch {
  }
  if ("object" != typeof window && "undefined" == typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  ba && (ka = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  ja = async a => {
    if (na(a)) {
      return new Promise((c, d) => {
        var e = new XMLHttpRequest();
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = () => {
          200 == e.status || 0 == e.status && e.response ? c(e.response) : d(e.status);
        };
        e.onerror = d;
        e.send(null);
      });
    }
    var b = await fetch(a, {credentials:"same-origin"});
    if (b.ok) {
      return b.arrayBuffer();
    }
    throw Error(b.status + " : " + b.url);
  };
} else {
  throw Error("environment detection error");
}
var r = console.log.bind(console), u = console.error.bind(console);
p(!da, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var oa;
"object" != typeof WebAssembly && u("no native wasm support detected");
var pa = !1;
function p(a, b) {
  a || v("Assertion failed" + (b ? ": " + b : ""));
}
var na = a => a.startsWith("file://");
function qa() {
  var a = ra();
  p(0 == (a & 3));
  0 == a && (a += 4);
  w[a >> 2] = 34821223;
  w[a + 4 >> 2] = 2310721022;
  w[0] = 1668509029;
}
function sa() {
  if (!pa) {
    var a = ra();
    0 == a && (a += 4);
    var b = w[a >> 2], c = w[a + 4 >> 2];
    34821223 == b && 2310721022 == c || v(`Stack overflow! Stack cookie has been overwritten at ${ta(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ta(c)} ${ta(b)}`);
    1668509029 != w[0] && v("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var ua = new Int16Array(1), va = new Int8Array(ua.buffer);
ua[0] = 25459;
if (115 !== va[0] || 99 !== va[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
function wa(a) {
  Object.getOwnPropertyDescriptor(k, a) || Object.defineProperty(k, a, {configurable:!0, set() {
    v(`Attempt to set \`Module.${a}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function C(a) {
  return () => p(!1, `call to '${a}' via reference taken before Wasm module initialization`);
}
function xa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_preloadFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
function ya(a, b) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    b();
  }});
}
function za(a, b) {
  ya(a, () => {
    E(`\`${a}\` is no longer defined by emscripten. ${b}`);
  });
}
za("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
za("asm", "Please use wasmExports instead");
function Aa(a) {
  Object.getOwnPropertyDescriptor(k, a) || Object.defineProperty(k, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    xa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    v(b);
  }});
}
var Ba, H, I, Ca, Da, Fa, w, Ga, Ha, Ia, Ja, Ka = !1;
p("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
function v(a) {
  k.onAbort?.(a);
  a = "Aborted(" + a + ")";
  u(a);
  pa = !0;
  throw new WebAssembly.RuntimeError(a);
}
function La(a, b) {
  return (...c) => {
    p(Ka, `native function \`${a}\` called before runtime initialization`);
    var d = J[a];
    p(d, `exported native function \`${a}\` not found`);
    p(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var Ma;
async function Na(a) {
  if (!oa) {
    try {
      var b = await ja(a);
      return new Uint8Array(b);
    } catch {
    }
  }
  if (a == Ma && oa) {
    a = new Uint8Array(oa);
  } else {
    if (ka) {
      a = ka(a);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  return a;
}
async function Oa(a, b) {
  try {
    var c = await Na(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    u(`failed to asynchronously prepare wasm: ${d}`), na(Ma) && u(`warning: Loading from a file URI (${Ma}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), v(d);
  }
}
async function Pa(a) {
  var b = Ma;
  if (!oa && !na(b) && !ca) {
    try {
      var c = fetch(b, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      u(`wasm streaming compile failed: ${d}`), u("falling back to ArrayBuffer instantiation");
    }
  }
  return Oa(b, a);
}
class Qa {
  name="ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Ra = a => {
  for (; 0 < a.length;) {
    a.shift()(k);
  }
}, Sa = [], Ta = [], Ua = () => {
  var a = k.preRun.shift();
  Ta.push(a);
}, K = 0, Va = null, Wa = {}, L = null, Xa = a => {
  K--;
  k.monitorRunDependencies?.(K);
  p(a, "removeRunDependency requires an ID");
  p(Wa[a]);
  delete Wa[a];
  0 == K && (null !== L && (clearInterval(L), L = null), Va && (a = Va, Va = null, a()));
}, Ya = a => {
  K++;
  k.monitorRunDependencies?.(K);
  p(a, "addRunDependency requires an ID");
  p(!Wa[a]);
  Wa[a] = 1;
  null === L && "undefined" != typeof setInterval && (L = setInterval(() => {
    if (pa) {
      clearInterval(L), L = null;
    } else {
      var b = !1, c;
      for (c in Wa) {
        b || (b = !0, u("still waiting on run dependencies:")), u(`dependency: ${c}`);
      }
      b && u("(end of list)");
    }
  }, 10000), L.unref?.());
}, Za = !0, ta = a => {
  p("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, E = a => {
  E.ka || (E.ka = {});
  E.ka[a] || (E.ka[a] = 1, ca && (a = "warning: " + a), u(a));
};
class $a {
  constructor(a) {
    this.j = a - 24;
  }
}
var ab = 0, M = a => {
  for (var b = "";;) {
    var c = I[a++];
    if (!c) {
      return b;
    }
    b += String.fromCharCode(c);
  }
}, bb = {}, cb = {}, db = {}, N = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
}, eb = a => {
  throw new N(a);
};
function fb(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new N(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (cb.hasOwnProperty(a)) {
    if (c.Ca) {
      return;
    }
    throw new N(`Cannot register type '${d}' twice`);
  }
  cb[a] = b;
  delete db[a];
  bb.hasOwnProperty(a) && (b = bb[a], delete bb[a], b.forEach(e => e()));
}
function O(a, b, c = {}) {
  return fb(a, b, c);
}
var gb = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => H[d] : d => I[d];
    case 2:
      return c ? d => Ca[d >> 1] : d => Da[d >> 1];
    case 4:
      return c ? d => Fa[d >> 2] : d => w[d >> 2];
    case 8:
      return c ? d => Ia[d >> 3] : d => Ja[d >> 3];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, hb = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, ib = (a, b, c, d) => {
  if (b < c || b > d) {
    throw new TypeError(`Passing a number "${hb(b)}" from JS side to C/C++ side to an argument of type "${a}", which is outside the valid range [${c}, ${d}]!`);
  }
}, jb = a => {
  throw new N(a.g.o.m.name + " instance already deleted");
}, kb = !1, lb = () => {
}, mb = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.B) {
    return null;
  }
  a = mb(a, b, c.B);
  return null === a ? null : c.za(a);
}, nb = {}, ob = {}, pb = (a, b) => {
  if (void 0 === b) {
    throw new N("ptr should not be undefined");
  }
  for (; a.B;) {
    b = a.Z(b), a = a.B;
  }
  return ob[b];
}, qb = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
}, sb = (a, b) => {
  if (!b.o || !b.j) {
    throw new qb("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.D !== !!b.A) {
    throw new qb("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return rb(Object.create(a, {g:{value:b, writable:!0}}));
};
function tb(a) {
  function b() {
    return this.aa ? sb(this.m.O, {o:this.Na, j:c, D:this, A:a}) : sb(this.m.O, {o:this, j:a});
  }
  var c = this.Ba(a);
  if (!c) {
    return this.na(a), null;
  }
  var d = pb(this.m, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.j = c, d.g.A = a, d.clone();
    }
    d = d.clone();
    this.na(a);
    return d;
  }
  d = this.m.Aa(c);
  d = nb[d];
  if (!d) {
    return b.call(this);
  }
  d = this.$ ? d.ya : d.pointerType;
  var e = mb(c, this.m, d.m);
  return null === e ? b.call(this) : this.aa ? sb(d.m.O, {o:d, j:e, D:this, A:a}) : sb(d.m.O, {o:d, j:e});
}
var rb = a => {
  if ("undefined" === typeof FinalizationRegistry) {
    return rb = b => b, a;
  }
  kb = new FinalizationRegistry(b => {
    console.warn(b.Ga);
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.A ? b.D.P(b.A) : b.o.m.P(b.j));
  });
  rb = b => {
    var c = b.g;
    if (c.A) {
      var d = {g:c};
      c = Error(`Embind found a leaked C++ instance ${c.o.m.name} <${ta(c.j)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(c, tb);
      d.Ga = c.stack.replace(/^Error: /, "");
      kb.register(b, d, b);
    }
    return b;
  };
  lb = b => {
    kb.unregister(b);
  };
  return rb(a);
}, ub = [];
function vb() {
}
var wb = (a, b) => Object.defineProperty(b, "name", {value:a}), xb = (a, b, c) => {
  if (void 0 === a[b].v) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].v.hasOwnProperty(e.length)) {
        throw new N(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].v})!`);
      }
      return a[b].v[e.length].apply(this, e);
    };
    a[b].v = [];
    a[b].v[d.U] = d;
  }
}, yb = (a, b, c) => {
  if (k.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== k[a].v && void 0 !== k[a].v[c]) {
      throw new N(`Cannot register public name '${a}' twice`);
    }
    xb(k, a, a);
    if (k[a].v.hasOwnProperty(c)) {
      throw new N(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    k[a].v[c] = b;
  } else {
    k[a] = b, k[a].U = c;
  }
}, zb = a => {
  p("string" === typeof a);
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function Ab(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.constructor = b;
  this.O = c;
  this.P = d;
  this.B = e;
  this.Aa = f;
  this.Z = g;
  this.za = h;
  this.Oa = [];
}
var Bb = (a, b, c) => {
  for (; b !== c;) {
    if (!b.Z) {
      throw new N(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.Z(a);
    b = b.B;
  }
  return a;
};
function Cb(a, b) {
  if (null === b) {
    if (this.ha) {
      throw new N(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new N(`Cannot pass "${hb(b)}" as a ${this.name}`);
  }
  if (!b.g.j) {
    throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Bb(b.g.j, b.g.o.m, this.m);
}
function Db(a, b) {
  if (null === b) {
    if (this.ha) {
      throw new N(`null is not a valid ${this.name}`);
    }
    if (this.aa) {
      var c = this.Pa();
      null !== a && a.push(this.P, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new N(`Cannot pass "${hb(b)}" as a ${this.name}`);
  }
  if (!b.g.j) {
    throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.$ && b.g.o.$) {
    throw new N(`Cannot convert argument of type ${b.g.D ? b.g.D.name : b.g.o.name} to parameter type ${this.name}`);
  }
  c = Bb(b.g.j, b.g.o.m, this.m);
  if (this.aa) {
    if (void 0 === b.g.A) {
      throw new N("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.Ra) {
      case 0:
        if (b.g.D === this) {
          c = b.g.A;
        } else {
          throw new N(`Cannot convert argument of type ${b.g.D ? b.g.D.name : b.g.o.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        c = b.g.A;
        break;
      case 2:
        if (b.g.D === this) {
          c = b.g.A;
        } else {
          var d = b.clone();
          c = this.Qa(c, Eb(() => d["delete"]()));
          null !== a && a.push(this.P, c);
        }
        break;
      default:
        throw new N("Unsupporting sharing policy");
    }
  }
  return c;
}
function Fb(a, b) {
  if (null === b) {
    if (this.ha) {
      throw new N(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new N(`Cannot pass "${hb(b)}" as a ${this.name}`);
  }
  if (!b.g.j) {
    throw new N(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.o.$) {
    throw new N(`Cannot convert argument of type ${b.g.o.name} to parameter type ${this.name}`);
  }
  return Bb(b.g.j, b.g.o.m, this.m);
}
function Gb(a) {
  return this.u(w[a >> 2]);
}
function Hb(a, b, c, d, e, f, g, h, l, q, m) {
  this.name = a;
  this.m = b;
  this.ha = c;
  this.$ = d;
  this.aa = e;
  this.Na = f;
  this.Ra = g;
  this.wa = h;
  this.Pa = l;
  this.Qa = q;
  this.P = m;
  e || void 0 !== b.B ? this.C = Db : (this.C = d ? Cb : Fb, this.F = null);
}
var Ib = (a, b, c) => {
  if (!k.hasOwnProperty(a)) {
    throw new qb("Replacing nonexistent public symbol");
  }
  void 0 !== k[a].v && void 0 !== c ? k[a].v[c] = b : (k[a] = b, k[a].U = c);
}, Jb = [], Kb, P = (a, b, c = !1) => {
  p(!c, "Async bindings are only supported with JSPI.");
  a = M(a);
  (c = Jb[b]) || (Jb[b] = c = Kb.get(b));
  p(Kb.get(b) == c, "JavaScript-side Wasm function table mirror is out of date!");
  if ("function" != typeof c) {
    throw new N(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
};
class Lb extends Error {
}
var Nb = a => {
  a = Mb(a);
  var b = M(a);
  Q(a);
  return b;
}, Ob = (a, b) => {
  function c(f) {
    e[f] || cb[f] || (db[f] ? db[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Lb(`${a}: ` + d.map(Nb).join([", "]));
}, R = (a, b, c) => {
  function d(h) {
    h = c(h);
    if (h.length !== a.length) {
      throw new qb("Mismatched type converter count");
    }
    for (var l = 0; l < a.length; ++l) {
      O(a[l], h[l]);
    }
  }
  a.forEach(h => db[h] = b);
  var e = Array(b.length), f = [], g = 0;
  b.forEach((h, l) => {
    cb.hasOwnProperty(h) ? e[l] = cb[h] : (f.push(h), bb.hasOwnProperty(h) || (bb[h] = []), bb[h].push(() => {
      e[l] = cb[h];
      ++g;
      g === f.length && d(e);
    }));
  });
  0 === f.length && d(e);
}, Pb = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(w[b + 4 * d >> 2]);
  }
  return c;
}, Qb = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function Rb(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].F) {
      return !0;
    }
  }
  return !1;
}
function Sb(a, b, c, d, e) {
  (a < b || a > c) && e(`function ${d} called with ${a} arguments, expected ${b == c ? b : `${b} to ${c}`}`);
}
function Tb(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new N("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  p(!f, "Async bindings are only supported with JSPI.");
  var h = null !== b[1] && null !== c, l = Rb(b);
  c = !b[0].pa;
  var q = g - 2;
  var m = b.length - 2;
  for (var n = b.length - 1; 2 <= n && b[n].optional; --n) {
    m--;
  }
  n = b[0];
  var t = b[1];
  d = [a, eb, d, e, Qb, n.u.bind(n), t?.C.bind(t)];
  for (e = 2; e < g; ++e) {
    n = b[e], d.push(n.C.bind(n));
  }
  if (!l) {
    for (e = h ? 1 : 2; e < b.length; ++e) {
      null !== b[e].F && d.push(b[e].F);
    }
  }
  d.push(Sb, m, q);
  l = Rb(b);
  q = b.length - 2;
  m = [];
  e = ["fn"];
  h && e.push("thisWired");
  for (g = 0; g < q; ++g) {
    m.push(`arg${g}`), e.push(`arg${g}Wired`);
  }
  m = m.join(",");
  e = e.join(",");
  m = `return function (${m}) {\n` + "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  l && (m += "var destructors = [];\n");
  t = l ? "destructors" : "null";
  n = "humanName throwBindingError invoker fn runDestructors fromRetWire toClassParamWire".split(" ");
  h && (m += `var thisWired = toClassParamWire(${t}, this);\n`);
  for (g = 0; g < q; ++g) {
    var y = `toArg${g}Wire`;
    m += `var arg${g}Wired = ${y}(${t}, arg${g});\n`;
    n.push(y);
  }
  m += (c || f ? "var rv = " : "") + `invoker(${e});\n`;
  if (l) {
    m += "runDestructors(destructors);\n";
  } else {
    for (g = h ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].F && (m += `${f}_dtor(${f});\n`, n.push(`${f}_dtor`));
    }
  }
  c && (m += "var ret = fromRetWire(rv);\nreturn ret;\n");
  m += "}\n";
  n.push("checkArgCount", "minArgs", "maxArgs");
  m = `if (arguments.length !== ${n.length}){ throw new Error(humanName + "Expected ${n.length} closure arguments " + arguments.length + " given."); }\n${m}`;
  b = (new Function(n, m))(...d);
  return wb(a, b);
}
var Ub = a => {
  a = a.trim();
  const b = a.indexOf("(");
  if (-1 === b) {
    return a;
  }
  p(a.endsWith(")"), "Parentheses for argument names should match.");
  return a.slice(0, b);
}, Vb = (a, b, c) => {
  if (!(a instanceof Object)) {
    throw new N(`${c} with invalid "this": ${a}`);
  }
  if (!(a instanceof b.m.constructor)) {
    throw new N(`${c} incompatible with "this" of type ${a.constructor.name}`);
  }
  if (!a.g.j) {
    throw new N(`cannot call emscripten binding method ${c} on deleted object`);
  }
  return Bb(a.g.j, a.g.o.m, b.m);
}, Wb = [], S = [0, 1, , 1, null, 1, !0, 1, !1, 1], Xb = a => {
  9 < a && 0 === --S[a + 1] && (p(void 0 !== S[a], "Decref for unallocated handle."), S[a] = void 0, Wb.push(a));
}, Yb = a => {
  if (!a) {
    throw new N(`Cannot use deleted val. handle = ${a}`);
  }
  p(2 === a || void 0 !== S[a] && 0 === a % 2, `invalid handle: ${a}`);
  return S[a];
}, Eb = a => {
  switch(a) {
    case void 0:
      return 2;
    case null:
      return 4;
    case !0:
      return 6;
    case !1:
      return 8;
    default:
      const b = Wb.pop() || S.length;
      S[b] = a;
      S[b + 1] = 1;
      return b;
  }
}, Zb = {name:"emscripten::val", u:a => {
  var b = Yb(a);
  Xb(a);
  return b;
}, C:(a, b) => Eb(b), L:Gb, F:null}, $b = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.u(Ga[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.u(Ha[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, ac = Object.assign({optional:!0}, Zb), bc = (a, b, c, d) => {
  p("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.codePointAt(f);
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else if (2047 >= g) {
      if (c + 1 >= d) {
        break;
      }
      b[c++] = 192 | g >> 6;
      b[c++] = 128 | g & 63;
    } else if (65535 >= g) {
      if (c + 2 >= d) {
        break;
      }
      b[c++] = 224 | g >> 12;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
    } else {
      if (c + 3 >= d) {
        break;
      }
      1114111 < g && E("Invalid Unicode code point " + ta(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      b[c++] = 240 | g >> 18;
      b[c++] = 128 | g >> 12 & 63;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
      f++;
    }
  }
  b[c] = 0;
  return c - e;
}, cc = (a, b, c) => {
  p("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return bc(a, I, b, c);
}, dc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, ec = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, fc = (a, b, c, d) => {
  c = b + c;
  if (d) {
    return c;
  }
  for (; a[b] && !(b >= c);) {
    ++b;
  }
  return b;
}, gc = (a, b = 0, c, d) => {
  c = fc(a, b, c, d);
  if (16 < c - b && a.buffer && ec) {
    return ec.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && E("Invalid UTF-8 leading byte " + ta(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, hc = (a, b, c) => {
  p("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? gc(I, a, b, c) : "";
}, ic = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, jc = (a, b, c) => {
  p(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  a >>= 1;
  b = fc(Da, a, b / 2, c);
  if (16 < b - a && ic) {
    return ic.decode(Da.subarray(a, b));
  }
  for (c = ""; a < b; ++a) {
    c += String.fromCharCode(Da[a]);
  }
  return c;
}, kc = (a, b, c) => {
  p(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  p("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    Ca[b >> 1] = a.charCodeAt(e), b += 2;
  }
  Ca[b >> 1] = 0;
  return b - d;
}, lc = a => 2 * a.length, mc = (a, b, c) => {
  p(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var d = "";
  a >>= 2;
  for (var e = 0; !(e >= b / 4); e++) {
    var f = w[a + e];
    if (!f && !c) {
      break;
    }
    d += String.fromCodePoint(f);
  }
  return d;
}, nc = (a, b, c) => {
  p(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  p("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.codePointAt(e);
    65535 < f && e++;
    Fa[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  Fa[b >> 2] = 0;
  return b - d;
}, oc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    65535 < a.codePointAt(c) && c++, b += 4;
  }
  return b;
}, pc = [], qc = a => {
  var b = pc.length;
  pc.push(a);
  return b;
}, rc = (a, b) => {
  for (var c = Array(a), d = 0; d < a; ++d) {
    var e = d, f = w[b + 4 * d >> 2], g = cb[f];
    if (void 0 === g) {
      throw a = `${`parameter ${d}`} has unknown type ${Nb(f)}`, new N(a);
    }
    c[e] = g;
  }
  return c;
}, sc = (a, b, c) => {
  var d = [];
  a = a(d, c);
  d.length && (w[b >> 2] = Eb(d));
  return a;
}, tc = {}, uc = a => {
  var b = tc[a];
  return void 0 === b ? M(a) : b;
}, vc = {}, xc = () => {
  if (!wc) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:ea || "./this.program"}, b;
    for (b in vc) {
      void 0 === vc[b] ? delete a[b] : a[b] = vc[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    wc = c;
  }
  return wc;
}, wc, yc = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, zc = a => {
  var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
  (a = yc(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Ac = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.slice(0, -1);
  return a + b;
}, Bc = a => a && a.match(/([^\/]+|\/)\/*$/)[1], Cc = () => {
  if (ca) {
    var a = require("crypto");
    return b => a.randomFillSync(b);
  }
  return b => crypto.getRandomValues(b);
}, Dc = a => {
  (Dc = Cc())(a);
}, Ec = (...a) => {
  for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
    c = 0 <= d ? a[d] : "/";
    if ("string" != typeof c) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!c) {
      return "";
    }
    b = c + "/" + b;
    c = "/" === c.charAt(0);
  }
  b = yc(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, Fc = [], Gc = a => {
  var b = Array(dc(a) + 1);
  a = bc(a, b, 0, b.length);
  b.length = a;
  return b;
}, Hc = [];
function Ic(a, b) {
  Hc[a] = {input:[], output:[], T:b};
  Jc(a, Kc);
}
var Kc = {open(a) {
  var b = Hc[a.node.rdev];
  if (!b) {
    throw new T(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close(a) {
  a.tty.T.fsync(a.tty);
}, fsync(a) {
  a.tty.T.fsync(a.tty);
}, read(a, b, c, d) {
  if (!a.tty || !a.tty.T.oa) {
    throw new T(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.T.oa(a.tty);
    } catch (h) {
      throw new T(29);
    }
    if (void 0 === g && 0 === e) {
      throw new T(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.atime = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.tty || !a.tty.T.ja) {
    throw new T(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.T.ja(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new T(29);
  }
  d && (a.node.mtime = a.node.ctime = Date.now());
  return e;
}}, Lc = {oa() {
  a: {
    if (!Fc.length) {
      var a = null;
      if (ca) {
        var b = Buffer.alloc(256), c = 0, d = process.stdin.fd;
        try {
          c = fs.readSync(d, b, 0, 256);
        } catch (e) {
          if (e.toString().includes("EOF")) {
            c = 0;
          } else {
            throw e;
          }
        }
        0 < c && (a = b.slice(0, c).toString("utf-8"));
      } else {
        "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
      }
      if (!a) {
        a = null;
        break a;
      }
      Fc = Gc(a);
    }
    a = Fc.shift();
  }
  return a;
}, ja(a, b) {
  null === b || 10 === b ? (r(gc(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (r(gc(a.output)), a.output = []);
}, $a() {
  return {Va:25856, Xa:5, Ua:191, Wa:35387, Ta:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, ab() {
  return 0;
}, bb() {
  return [24, 80];
}}, Mc = {ja(a, b) {
  null === b || 10 === b ? (u(gc(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (u(gc(a.output)), a.output = []);
}}, Nc = () => {
  v("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}, U = {H:null, K() {
  return U.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new T(63);
  }
  U.H || (U.H = {dir:{node:{N:U.i.N, I:U.i.I, lookup:U.i.lookup, ba:U.i.ba, rename:U.i.rename, unlink:U.i.unlink, rmdir:U.i.rmdir, readdir:U.i.readdir, symlink:U.i.symlink}, stream:{G:U.l.G}}, file:{node:{N:U.i.N, I:U.i.I}, stream:{G:U.l.G, read:U.l.read, write:U.l.write, ia:U.l.ia, va:U.l.va}}, link:{node:{N:U.i.N, I:U.i.I, readlink:U.i.readlink}, stream:{}}, ma:{node:{N:U.i.N, I:U.i.I}, stream:Oc}});
  c = Pc(a, b, c, d);
  V(c.mode) ? (c.i = U.H.dir.node, c.l = U.H.dir.stream, c.h = {}) : 32768 === (c.mode & 61440) ? (c.i = U.H.file.node, c.l = U.H.file.stream, c.s = 0, c.h = null) : 40960 === (c.mode & 61440) ? (c.i = U.H.link.node, c.l = U.H.link.stream) : 8192 === (c.mode & 61440) && (c.i = U.H.ma.node, c.l = U.H.ma.stream);
  c.atime = c.mtime = c.ctime = Date.now();
  a && (a.h[b] = c, a.atime = a.mtime = a.ctime = c.atime);
  return c;
}, Za(a) {
  return a.h ? a.h.subarray ? a.h.subarray(0, a.s) : new Uint8Array(a.h) : new Uint8Array(0);
}, i:{N(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  V(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.s : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.atime);
  b.mtime = new Date(a.mtime);
  b.ctime = new Date(a.ctime);
  b.blksize = 4096;
  b.blocks = Math.ceil(b.size / b.blksize);
  return b;
}, I(a, b) {
  for (var c of ["mode", "atime", "mtime", "ctime"]) {
    null != b[c] && (a[c] = b[c]);
  }
  void 0 !== b.size && (b = b.size, a.s != b && (0 == b ? (a.h = null, a.s = 0) : (c = a.h, a.h = new Uint8Array(b), c && a.h.set(c.subarray(0, Math.min(b, a.s))), a.s = b)));
}, lookup() {
  throw new T(44);
}, ba(a, b, c, d) {
  return U.createNode(a, b, c, d);
}, rename(a, b, c) {
  try {
    var d = Qc(b, c);
  } catch (f) {
  }
  if (d) {
    if (V(a.mode)) {
      for (var e in d.h) {
        throw new T(55);
      }
    }
    Rc(d);
  }
  delete a.parent.h[a.name];
  b.h[c] = a;
  a.name = c;
  b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
}, unlink(a, b) {
  delete a.h[b];
  a.ctime = a.mtime = Date.now();
}, rmdir(a, b) {
  var c = Qc(a, b), d;
  for (d in c.h) {
    throw new T(55);
  }
  delete a.h[b];
  a.ctime = a.mtime = Date.now();
}, readdir(a) {
  return [".", "..", ...Object.keys(a.h)];
}, symlink(a, b, c) {
  a = U.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new T(28);
  }
  return a.link;
}}, l:{read(a, b, c, d, e) {
  var f = a.node.h;
  if (e >= a.node.s) {
    return 0;
  }
  a = Math.min(a.node.s - e, d);
  p(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  p(!(b instanceof ArrayBuffer));
  if (!d) {
    return 0;
  }
  a = a.node;
  a.mtime = a.ctime = Date.now();
  if (b.subarray && (!a.h || a.h.subarray)) {
    if (f) {
      return p(0 === e, "canOwn must imply no weird position inside the file"), a.h = b.subarray(c, c + d), a.s = d;
    }
    if (0 === a.s && 0 === e) {
      return a.h = b.slice(c, c + d), a.s = d;
    }
    if (e + d <= a.s) {
      return a.h.set(b.subarray(c, c + d), e), d;
    }
  }
  f = e + d;
  var g = a.h ? a.h.length : 0;
  g >= f || (f = Math.max(f, g * (1048576 > g ? 2.0 : 1.125) >>> 0), 0 != g && (f = Math.max(f, 256)), g = a.h, a.h = new Uint8Array(f), 0 < a.s && a.h.set(g.subarray(0, a.s), 0));
  if (a.h.subarray && b.subarray) {
    a.h.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.h[e + f] = b[c + f];
    }
  }
  a.s = Math.max(a.s, e + d);
  return d;
}, G(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.s);
  if (0 > b) {
    throw new T(28);
  }
  return b;
}, ia(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new T(43);
  }
  a = a.node.h;
  if (e & 2 || !a || a.buffer !== H.buffer) {
    d = !0;
    e = Nc();
    if (!e) {
      throw new T(48);
    }
    if (a) {
      if (0 < c || c + b < a.length) {
        a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
      }
      H.set(a, e);
    }
  } else {
    d = !1, e = a.byteOffset;
  }
  return {j:e, xa:d};
}, va(a, b, c, d) {
  U.l.write(a, b, 0, d, c, !1);
  return 0;
}}}, Sc = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, Tc = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, Uc = async a => {
  var b = await ja(a);
  p(b, `Loading data file "${a}" failed (no arrayBuffer).`);
  return new Uint8Array(b);
}, Vc = [], Wc = async(a, b) => {
  if ("undefined" != typeof Browser) {
    var c = Browser;
    w[c.j + 16 >> 2] = 0;
    w[c.j + 4 >> 2] = void 0;
    w[c.j + 8 >> 2] = void 0;
  }
  for (var d of Vc) {
    if (d.canHandle(b)) {
      return p("AsyncFunction" === d.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), d.handle(a, b);
    }
  }
  return a;
}, Xc = null, Yc = {}, Zc = [], $c = 1, W = null, ad = !1, bd = !0, cd = {}, T = class extends Error {
  name="ErrnoError";
  constructor(a) {
    super(Ka ? hc(dd(a)) : "");
    this.M = a;
    for (var b in Tc) {
      if (Tc[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, ed = class {
  J={};
  node=null;
  get object() {
    return this.node;
  }
  set object(a) {
    this.node = a;
  }
  get flags() {
    return this.J.flags;
  }
  set flags(a) {
    this.J.flags = a;
  }
  get position() {
    return this.J.position;
  }
  set position(a) {
    this.J.position = a;
  }
}, fd = class {
  i={};
  l={};
  X=null;
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.K = a.K;
    this.id = $c++;
    this.name = b;
    this.mode = c;
    this.rdev = d;
    this.atime = this.mtime = this.ctime = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }
  get Ea() {
    return V(this.mode);
  }
  get Da() {
    return 8192 === (this.mode & 61440);
  }
};
function X(a, b = {}) {
  if (!a) {
    throw new T(44);
  }
  b.da ?? (b.da = !0);
  "/" === a.charAt(0) || (a = "//" + a);
  var c = 0;
  a: for (; 40 > c; c++) {
    a = a.split("/").filter(h => !!h);
    for (var d = Xc, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) {
        break;
      }
      if ("." !== a[f]) {
        if (".." === a[f]) {
          if (e = Ac(e), d === d.parent) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else {
            d = d.parent;
          }
        } else {
          e = zc(e + "/" + a[f]);
          try {
            d = Qc(d, a[f]);
          } catch (h) {
            if (44 === h?.M && g && b.Ia) {
              return {path:e};
            }
            throw h;
          }
          !d.X || g && !b.da || (d = d.X.root);
          if (40960 === (d.mode & 61440) && (!g || b.W)) {
            if (!d.i.readlink) {
              throw new T(52);
            }
            d = d.i.readlink(d);
            "/" === d.charAt(0) || (d = Ac(e) + "/" + d);
            a = d + "/" + a.slice(f + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:e, node:d};
  }
  throw new T(32);
}
function gd(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.K.ua, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function hd(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % W.length;
}
function Rc(a) {
  var b = hd(a.parent.id, a.name);
  if (W[b] === a) {
    W[b] = a.S;
  } else {
    for (b = W[b]; b;) {
      if (b.S === a) {
        b.S = a.S;
        break;
      }
      b = b.S;
    }
  }
}
function Qc(a, b) {
  var c = V(a.mode) ? (c = jd(a, "x")) ? c : a.i.lookup ? 0 : 2 : 54;
  if (c) {
    throw new T(c);
  }
  for (c = W[hd(a.id, b)]; c; c = c.S) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.i.lookup(a, b);
}
function Pc(a, b, c, d) {
  p("object" == typeof a);
  a = new fd(a, b, c, d);
  b = hd(a.parent.id, a.name);
  a.S = W[b];
  return W[b] = a;
}
function V(a) {
  return 16384 === (a & 61440);
}
function kd(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function jd(a, b) {
  if (bd) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function ld(a, b) {
  if (!V(a.mode)) {
    return 54;
  }
  try {
    return Qc(a, b), 20;
  } catch (c) {
  }
  return jd(a, "wx");
}
function md(a) {
  a = Zc[a];
  if (!a) {
    throw new T(8);
  }
  return a;
}
function nd(a, b) {
  var c = null?.l.I, d = c ? null : a;
  c ??= a.i.I;
  if (!c) {
    throw new T(63);
  }
  c(d, b);
}
var Oc = {open(a) {
  a.l = Yc[a.node.rdev].l;
  a.l.open?.(a);
}, G() {
  throw new T(70);
}};
function Jc(a, b) {
  Yc[a] = {l:b};
}
function od(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Xc) {
    throw new T(10);
  }
  if (!c && !d) {
    var e = X(b, {da:!1});
    b = e.path;
    e = e.node;
    if (e.X) {
      throw new T(10);
    }
    if (!V(e.mode)) {
      throw new T(54);
    }
  }
  b = {type:a, cb:{}, ua:b, Ha:[]};
  a = a.K(b);
  a.K = b;
  b.root = a;
  c ? Xc = a : e && (e.X = b, e.K && e.K.Ha.push(b));
}
function pd(a, b, c) {
  var d = X(a, {parent:!0}).node;
  a = Bc(a);
  if (!a) {
    throw new T(28);
  }
  if ("." === a || ".." === a) {
    throw new T(20);
  }
  var e = ld(d, a);
  if (e) {
    throw new T(e);
  }
  if (!d.i.ba) {
    throw new T(63);
  }
  return d.i.ba(d, a, b, c);
}
function qd(a, b = 438) {
  return pd(a, b & 4095 | 32768, 0);
}
function Y(a) {
  return pd(a, 16895, 0);
}
function rd(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  return pd(a, b | 8192, c);
}
function sd(a, b) {
  if (!Ec(a)) {
    throw new T(44);
  }
  var c = X(b, {parent:!0}).node;
  if (!c) {
    throw new T(44);
  }
  b = Bc(b);
  var d = ld(c, b);
  if (d) {
    throw new T(d);
  }
  if (!c.i.symlink) {
    throw new T(63);
  }
  c.i.symlink(c, b, a);
}
function td(a) {
  var b = X(a, {parent:!0}).node;
  if (!b) {
    throw new T(44);
  }
  a = Bc(a);
  var c = Qc(b, a);
  a: {
    try {
      var d = Qc(b, a);
    } catch (f) {
      d = f.M;
      break a;
    }
    var e = jd(b, "wx");
    d = e ? e : V(d.mode) ? 31 : 0;
  }
  if (d) {
    throw new T(d);
  }
  if (!b.i.unlink) {
    throw new T(63);
  }
  if (c.X) {
    throw new T(10);
  }
  b.i.unlink(b, a);
  Rc(c);
}
function ud(a, b) {
  a = "string" == typeof a ? X(a, {W:!0}).node : a;
  nd(a, {mode:b & 4095 | a.mode & -4096, ctime:Date.now(), Ya:void 0});
}
function vd(a, b) {
  var c = 438;
  if ("" === a) {
    throw new T(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? c & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    d = a;
  } else {
    var e = a.endsWith("/");
    a = X(a, {W:!(b & 131072), Ia:!0});
    d = a.node;
    a = a.path;
  }
  var f = !1;
  if (b & 64) {
    if (d) {
      if (b & 128) {
        throw new T(20);
      }
    } else {
      if (e) {
        throw new T(31);
      }
      d = pd(a, c | 511, 0);
      f = !0;
    }
  }
  if (!d) {
    throw new T(44);
  }
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && !V(d.mode)) {
    throw new T(54);
  }
  if (!f && (e = d ? 40960 === (d.mode & 61440) ? 32 : V(d.mode) && ("r" !== kd(b) || b & 576) ? 31 : jd(d, kd(b)) : 44)) {
    throw new T(e);
  }
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? X(e, {W:!0}).node : e;
    if (V(e.mode)) {
      throw new T(31);
    }
    if (32768 !== (e.mode & 61440)) {
      throw new T(28);
    }
    var g = jd(e, "w");
    if (g) {
      throw new T(g);
    }
    nd(e, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = {node:d, path:gd(d), flags:b, seekable:!0, position:0, l:d.l, Sa:[], error:!1};
  g = -1;
  p(-1 <= g);
  e = Object.assign(new ed(), e);
  if (-1 == g) {
    a: {
      for (g = 0; 4096 >= g; g++) {
        if (!Zc[g]) {
          break a;
        }
      }
      throw new T(33);
    }
  }
  e.fd = g;
  Zc[g] = e;
  e.l.open && e.l.open(e);
  f && ud(d, c & 511);
  !k.logReadFiles || b & 1 || a in cd || (cd[a] = 1);
  return e;
}
function wd(a) {
  if (null === a.fd) {
    throw new T(8);
  }
  a.ea && (a.ea = null);
  try {
    a.l.close && a.l.close(a);
  } catch (b) {
    throw b;
  } finally {
    Zc[a.fd] = null;
  }
  a.fd = null;
}
function xd(a, b, c) {
  if (null === a.fd) {
    throw new T(8);
  }
  if (!a.seekable || !a.l.G) {
    throw new T(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new T(28);
  }
  a.position = a.l.G(a, b, c);
  a.Sa = [];
}
function yd(a, b, c, d, e, f) {
  p(0 <= c);
  if (0 > d || 0 > e) {
    throw new T(28);
  }
  if (null === a.fd) {
    throw new T(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new T(8);
  }
  if (V(a.node.mode)) {
    throw new T(31);
  }
  if (!a.l.write) {
    throw new T(28);
  }
  a.seekable && a.flags & 1024 && xd(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new T(70);
  }
  b = a.l.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}
function zd(a, b) {
  a = "string" == typeof a ? a : gd(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      var d = zc(a + "/" + c);
      try {
        Y(d);
      } catch (e) {
        if (20 != e.M) {
          throw e;
        }
      }
      a = d;
    }
  }
  return d;
}
function Ad(a, b, c, d) {
  a = zc(("string" == typeof a ? a : gd(a)) + "/" + b);
  return qd(a, Sc(c, d));
}
function Bd(a, b, c, d, e, f) {
  var g = b;
  a && (a = "string" == typeof a ? a : gd(a), g = b ? zc(a + "/" + b) : a);
  a = Sc(d, e);
  g = qd(g, a);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) {
        b[d] = c.charCodeAt(d);
      }
      c = b;
    }
    ud(g, a | 146);
    b = vd(g, 577);
    yd(b, c, 0, c.length, 0, f);
    wd(b);
    ud(g, a);
  }
}
function Z(a, b, c, d) {
  a = zc(("string" == typeof a ? a : gd(a)) + "/" + b);
  b = Sc(!!c, !!d);
  Z.ta ?? (Z.ta = 64);
  var e = Z.ta++ << 8 | 0;
  Jc(e, {open(f) {
    f.seekable = !1;
  }, close() {
    d?.buffer?.length && d(10);
  }, read(f, g, h, l) {
    for (var q = 0, m = 0; m < l; m++) {
      try {
        var n = c();
      } catch (t) {
        throw new T(29);
      }
      if (void 0 === n && 0 === q) {
        throw new T(6);
      }
      if (null === n || void 0 === n) {
        break;
      }
      q++;
      g[h + m] = n;
    }
    q && (f.node.atime = Date.now());
    return q;
  }, write(f, g, h, l) {
    for (var q = 0; q < l; q++) {
      try {
        d(g[h + q]);
      } catch (m) {
        throw new T(29);
      }
    }
    l && (f.node.mtime = f.node.ctime = Date.now());
    return q;
  }});
  return rd(a, b, e);
}
function Cd(a) {
  if (!(a.Da || a.Ea || a.link || a.h)) {
    if ("undefined" != typeof XMLHttpRequest) {
      throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    }
    try {
      a.h = ka(a.url);
    } catch (b) {
      throw new T(29);
    }
  }
}
function Dd(a, b, c, d, e) {
  function f(n, t, y, x, z) {
    n = n.node.h;
    if (z >= n.length) {
      return 0;
    }
    x = Math.min(n.length - z, x);
    p(0 <= x);
    if (n.slice) {
      for (var A = 0; A < x; A++) {
        t[y + A] = n[z + A];
      }
    } else {
      for (A = 0; A < x; A++) {
        t[y + A] = n.get(z + A);
      }
    }
    return x;
  }
  class g {
    ga=!1;
    J=[];
    fa=void 0;
    ra=0;
    qa=0;
    get(n) {
      if (!(n > this.length - 1 || 0 > n)) {
        var t = n % this.chunkSize;
        return this.fa(n / this.chunkSize | 0)[t];
      }
    }
    Ja(n) {
      this.fa = n;
    }
    sa() {
      var n = new XMLHttpRequest();
      n.open("HEAD", c, !1);
      n.send(null);
      if (!(200 <= n.status && 300 > n.status || 304 === n.status)) {
        throw Error("Couldn't load " + c + ". Status: " + n.status);
      }
      var t = Number(n.getResponseHeader("Content-length")), y, x = (y = n.getResponseHeader("Accept-Ranges")) && "bytes" === y;
      n = (y = n.getResponseHeader("Content-Encoding")) && "gzip" === y;
      var z = 1048576;
      x || (z = t);
      var A = this;
      A.Ja(D => {
        var B = D * z, G = (D + 1) * z - 1;
        G = Math.min(G, t - 1);
        if ("undefined" == typeof A.J[D]) {
          var Ea = A.J;
          if (B > G) {
            throw Error("invalid range (" + B + ", " + G + ") or no bytes requested!");
          }
          if (G > t - 1) {
            throw Error("only " + t + " bytes available! programmer error!");
          }
          var F = new XMLHttpRequest();
          F.open("GET", c, !1);
          t !== z && F.setRequestHeader("Range", "bytes=" + B + "-" + G);
          F.responseType = "arraybuffer";
          F.overrideMimeType && F.overrideMimeType("text/plain; charset=x-user-defined");
          F.send(null);
          if (!(200 <= F.status && 300 > F.status || 304 === F.status)) {
            throw Error("Couldn't load " + c + ". Status: " + F.status);
          }
          B = void 0 !== F.response ? new Uint8Array(F.response || []) : Gc(F.responseText || "");
          Ea[D] = B;
        }
        if ("undefined" == typeof A.J[D]) {
          throw Error("doXHR failed!");
        }
        return A.J[D];
      });
      if (n || !t) {
        z = t = 1, z = t = this.fa(0).length, r("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.ra = t;
      this.qa = z;
      this.ga = !0;
    }
    get length() {
      this.ga || this.sa();
      return this.ra;
    }
    get chunkSize() {
      this.ga || this.sa();
      return this.qa;
    }
  }
  if ("undefined" != typeof XMLHttpRequest) {
    if (!ba) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var h = new g();
    var l = void 0;
  } else {
    l = c, h = void 0;
  }
  var q = Ad(a, b, d, e);
  h ? q.h = h : l && (q.h = null, q.url = l);
  Object.defineProperties(q, {s:{get:function() {
    return this.h.length;
  }}});
  var m = {};
  Object.keys(q.l).forEach(n => {
    var t = q.l[n];
    m[n] = (...y) => {
      Cd(q);
      return t(...y);
    };
  });
  m.read = (n, t, y, x, z) => {
    Cd(q);
    return f(n, t, y, x, z);
  };
  m.ia = (n, t, y) => {
    Cd(q);
    var x = Nc();
    if (!x) {
      throw new T(48);
    }
    f(n, H, x, t, y);
    return {j:x, xa:!0};
  };
  q.l = m;
  return q;
}
var Ed = {};
(() => {
  let a = vb.prototype;
  Object.assign(a, {isAliasOf:function(c) {
    if (!(this instanceof vb && c instanceof vb)) {
      return !1;
    }
    var d = this.g.o.m, e = this.g.j;
    c.g = c.g;
    var f = c.g.o.m;
    for (c = c.g.j; d.B;) {
      e = d.Z(e), d = d.B;
    }
    for (; f.B;) {
      c = f.Z(c), f = f.B;
    }
    return d === f && e === c;
  }, clone:function() {
    this.g.j || jb(this);
    if (this.g.Y) {
      return this.g.count.value += 1, this;
    }
    var c = rb, d = Object, e = d.create, f = Object.getPrototypeOf(this), g = this.g;
    c = c(e.call(d, f, {g:{value:{count:g.count, V:g.V, Y:g.Y, j:g.j, o:g.o, A:g.A, D:g.D}}}));
    c.g.count.value += 1;
    c.g.V = !1;
    return c;
  }, ["delete"]() {
    this.g.j || jb(this);
    if (this.g.V && !this.g.Y) {
      throw new N("Object already scheduled for deletion");
    }
    lb(this);
    var c = this.g;
    --c.count.value;
    0 === c.count.value && (c.A ? c.D.P(c.A) : c.o.m.P(c.j));
    this.g.Y || (this.g.A = void 0, this.g.j = void 0);
  }, isDeleted:function() {
    return !this.g.j;
  }, deleteLater:function() {
    this.g.j || jb(this);
    if (this.g.V && !this.g.Y) {
      throw new N("Object already scheduled for deletion");
    }
    ub.push(this);
    this.g.V = !0;
    return this;
  }});
  const b = Symbol.dispose;
  b && (a[b] = a["delete"]);
})();
Object.assign(Hb.prototype, {Ba(a) {
  this.wa && (a = this.wa(a));
  return a;
}, na(a) {
  this.P?.(a);
}, L:Gb, u:tb});
p(10 === S.length);
W = Array(4096);
od(U, "/");
Y("/tmp");
Y("/home");
Y("/home/web_user");
(function() {
  Y("/dev");
  Jc(259, {read:() => 0, write:(d, e, f, g) => g, G:() => 0});
  rd("/dev/null", 259);
  Ic(1280, Lc);
  Ic(1536, Mc);
  rd("/dev/tty", 1280);
  rd("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (Dc(a), b = a.byteLength);
    return a[--b];
  };
  Z("/dev", "random", c);
  Z("/dev", "urandom", c);
  Y("/dev/shm");
  Y("/dev/shm/tmp");
})();
(function() {
  Y("/proc");
  var a = Y("/proc/self");
  Y("/proc/self/fd");
  od({K() {
    var b = Pc(a, "fd", 16895, 73);
    b.l = {G:U.l.G};
    b.i = {lookup(c, d) {
      c = +d;
      var e = md(c);
      c = {parent:null, K:{ua:"fake"}, i:{readlink:() => e.path}, id:c + 1};
      return c.parent = c;
    }, readdir() {
      return Array.from(Zc.entries()).filter(([, c]) => c).map(([c]) => c.toString());
    }};
    return b;
  }}, "/proc/self/fd");
})();
k.noExitRuntime && (Za = k.noExitRuntime);
k.preloadPlugins && (Vc = k.preloadPlugins);
k.print && (r = k.print);
k.printErr && (u = k.printErr);
k.wasmBinary && (oa = k.wasmBinary);
Object.getOwnPropertyDescriptor(k, "fetchSettings") && v("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
k.thisProgram && (ea = k.thisProgram);
p("undefined" == typeof k.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof k.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof k.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof k.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
p("undefined" == typeof k.read, "Module.read option was removed");
p("undefined" == typeof k.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
p("undefined" == typeof k.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
p("undefined" == typeof k.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
p("undefined" == typeof k.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
p("undefined" == typeof k.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
p("undefined" == typeof k.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
p("undefined" == typeof k.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
p("undefined" == typeof k.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if (k.preInit) {
  for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length;) {
    k.preInit.shift()();
  }
}
wa("preInit");
k.addRunDependency = Ya;
k.removeRunDependency = Xa;
k.FS_preloadFile = async(a, b, c, d, e, f, g, h) => {
  var l = b ? Ec(zc(a + "/" + b)) : a, q;
  a: {
    for (var m = q = `cp ${l}`;;) {
      if (!Wa[q]) {
        break a;
      }
      q = m + Math.random();
    }
  }
  Ya(q);
  try {
    m = c, "string" == typeof c && (m = await Uc(c)), m = await Wc(m, l), h?.(), f || Bd(a, b, m, d, e, g);
  } finally {
    Xa(q);
  }
};
k.FS_unlink = (...a) => td(...a);
k.FS_createPath = (...a) => zd(...a);
k.FS_createDevice = (...a) => Z(...a);
k.FS_createDataFile = (...a) => Bd(...a);
k.FS_createLazyFile = (...a) => Dd(...a);
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory getHeapMax growMemory withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr readEmAsmArgs jstoi_q autoResumeAudioContext getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle alignMemory HandleAllocator getNativeTypeSize addOnInit addOnPostCtor addOnPreMain addOnExit STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback maybeCStringToJsString findEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags safeSetTimeout setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop registerPreMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory demangle stackTrace getFunctionArgsName createJsInvokerSignature PureVirtualError registerInheritedInstance unregisterInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer setDelayFunction count_emval_handles emval_get_global".split(" ").forEach(function(a) {
  ya(a, () => {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    xa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    E(b);
  });
  Aa(a);
});
"run out err callMain abort wasmMemory wasmExports HEAPF32 HEAPF64 HEAP8 HEAPU8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore ptrToString exitJS abortOnCannotGrowMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray getExecutableName handleException keepRuntimeAlive asyncLoad mmapAlloc wasmTable getUniqueRunDependency noExitRuntime addOnPreRun addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev initRandomFill randomFill emSetImmediate emClearImmediate_deps emClearImmediate promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia createContext getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr jstoi_s InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError EmValType EmValOptionalType throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol createNamedFunction embindRepr registeredInstances getBasestPointer getInheritedInstance registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols getStringOrSymbol Emval emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller".split(" ").forEach(Aa);
var Fd = C("_malloc"), Gd = k._main = C("_main"), Mb = C("___getTypeName"), Hd = C("_fflush"), ra = C("_emscripten_stack_get_end"), dd = C("_strerror"), Q = C("_free"), Id = C("_emscripten_stack_init"), Jd = C("_emscripten_stack_get_current"), Kd = {__cxa_throw:(a, b, c) => {
  a = new $a(a);
  w[a.j + 16 >> 2] = 0;
  w[a.j + 4 >> 2] = b;
  w[a.j + 8 >> 2] = c;
  ab++;
  p(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, _abort_js:() => v("native code called abort()"), _embind_register_bigint:(a, b, c, d, e) => {
  b = M(b);
  const f = 0n === d;
  let g = h => h;
  if (f) {
    const h = 8 * c;
    g = l => BigInt.asUintN(h, l);
    e = g(e);
  }
  O(a, {name:b, u:g, C:(h, l) => {
    if ("number" == typeof l) {
      l = BigInt(l);
    } else if ("bigint" != typeof l) {
      throw new TypeError(`Cannot convert "${hb(l)}" to ${this.name}`);
    }
    ib(b, l, d, e);
    return l;
  }, L:gb(b, c, !f), F:null});
}, _embind_register_bool:(a, b, c, d) => {
  b = M(b);
  O(a, {name:b, u:function(e) {
    return !!e;
  }, C:function(e, f) {
    return f ? c : d;
  }, L:function(e) {
    return this.u(I[e]);
  }, F:null});
}, _embind_register_class:(a, b, c, d, e, f, g, h, l, q, m, n, t) => {
  m = M(m);
  f = P(e, f);
  h &&= P(g, h);
  q &&= P(l, q);
  t = P(n, t);
  var y = zb(m);
  yb(y, function() {
    Ob(`Cannot construct ${m} due to unbound types`, [d]);
  });
  R([a, b, c], d ? [d] : [], x => {
    x = x[0];
    if (d) {
      var z = x.m;
      var A = z.O;
    } else {
      A = vb.prototype;
    }
    x = wb(m, function(...Ea) {
      if (Object.getPrototypeOf(this) !== D) {
        throw new N(`Use 'new' to construct ${m}`);
      }
      if (void 0 === B.R) {
        throw new N(`${m} has no accessible constructor`);
      }
      var F = B.R[Ea.length];
      if (void 0 === F) {
        throw new N(`Tried to invoke ctor of ${m} with invalid number of parameters (${Ea.length}) - expected (${Object.keys(B.R).toString()}) parameters instead!`);
      }
      return F.apply(this, Ea);
    });
    var D = Object.create(A, {constructor:{value:x}});
    x.prototype = D;
    var B = new Ab(m, x, D, t, z, f, h, q);
    if (B.B) {
      var G;
      (G = B.B).la ?? (G.la = []);
      B.B.la.push(B);
    }
    z = new Hb(m, B, !0, !1, !1);
    G = new Hb(m + "*", B, !1, !1, !1);
    A = new Hb(m + " const*", B, !1, !0, !1);
    nb[a] = {pointerType:G, ya:A};
    Ib(y, x);
    return [z, G, A];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  p(0 < b);
  var g = Pb(b, c);
  e = P(d, e);
  R([], [a], h => {
    h = h[0];
    var l = `constructor ${h.name}`;
    void 0 === h.m.R && (h.m.R = []);
    if (void 0 !== h.m.R[b - 1]) {
      throw new N(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    h.m.R[b - 1] = () => {
      Ob(`Cannot construct ${h.name} due to unbound types`, g);
    };
    R([], g, q => {
      q.splice(1, 0, null);
      h.m.R[b - 1] = Tb(l, q, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, h, l) => {
  var q = Pb(c, d);
  b = M(b);
  b = Ub(b);
  f = P(e, f, l);
  R([], [a], m => {
    function n() {
      Ob(`Cannot call ${t} due to unbound types`, q);
    }
    m = m[0];
    var t = `${m.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    h && m.m.Oa.push(b);
    var y = m.m.O, x = y[b];
    void 0 === x || void 0 === x.v && x.className !== m.name && x.U === c - 2 ? (n.U = c - 2, n.className = m.name, y[b] = n) : (xb(y, b, t), y[b].v[c - 2] = n);
    R([], q, z => {
      z = Tb(t, z, m, f, g, l);
      void 0 === y[b].v ? (z.U = c - 2, y[b] = z) : y[b].v[c - 2] = z;
      return [];
    });
    return [];
  });
}, _embind_register_class_property:(a, b, c, d, e, f, g, h, l, q) => {
  b = M(b);
  e = P(d, e);
  R([], [a], m => {
    m = m[0];
    var n = `${m.name}.${b}`, t = {get() {
      Ob(`Cannot access ${n} due to unbound types`, [c, g]);
    }, enumerable:!0, configurable:!0};
    t.set = l ? () => Ob(`Cannot access ${n} due to unbound types`, [c, g]) : () => {
      throw new N(n + " is a read-only property");
    };
    Object.defineProperty(m.m.O, b, t);
    R([], l ? [c, g] : [c], y => {
      var x = y[0], z = {get() {
        var D = Vb(this, m, n + " getter");
        return x.u(e(f, D));
      }, enumerable:!0};
      if (l) {
        l = P(h, l);
        var A = y[1];
        z.set = function(D) {
          var B = Vb(this, m, n + " setter"), G = [];
          l(q, B, A.C(G, D));
          Qb(G);
        };
      }
      Object.defineProperty(m.m.O, b, z);
      return [];
    });
    return [];
  });
}, _embind_register_constant:(a, b, c) => {
  a = M(a);
  R([], [b], d => {
    d = d[0];
    k[a] = d.u(c);
    return [];
  });
}, _embind_register_emval:a => O(a, Zb), _embind_register_float:(a, b, c) => {
  b = M(b);
  O(a, {name:b, u:d => d, C:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${hb(e)} to ${this.name}`);
    }
    return e;
  }, L:$b(b, c), F:null});
}, _embind_register_function:(a, b, c, d, e, f, g) => {
  var h = Pb(b, c);
  a = M(a);
  a = Ub(a);
  e = P(d, e, g);
  yb(a, function() {
    Ob(`Cannot call ${a} due to unbound types`, h);
  }, b - 1);
  R([], h, l => {
    l = [l[0], null].concat(l.slice(1));
    Ib(a, Tb(a, l, null, e, f, g), b - 1);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = M(b);
  let f = h => h;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = h => h << g >>> g;
    e = f(e);
  }
  O(a, {name:b, u:f, C:(h, l) => {
    if ("number" != typeof l && "boolean" != typeof l) {
      throw new TypeError(`Cannot convert "${hb(l)}" to ${b}`);
    }
    ib(b, l, d, e);
    return l;
  }, L:gb(b, c, 0 !== d), F:null});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(H.buffer, w[f + 4 >> 2], w[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
  c = M(c);
  O(a, {name:c, u:d, L:d}, {Ca:!0});
}, _embind_register_optional:a => {
  O(a, ac);
}, _embind_register_std_string:(a, b) => {
  b = M(b);
  O(a, {name:b, u(c) {
    var d = hc(c + 4, w[c >> 2], !0);
    Q(c);
    return d;
  }, C(c, d) {
    d instanceof ArrayBuffer && (d = new Uint8Array(d));
    var e = "string" == typeof d;
    if (!(e || ArrayBuffer.isView(d) && 1 == d.BYTES_PER_ELEMENT)) {
      throw new N("Cannot pass non-string to std::string");
    }
    var f = e ? dc(d) : d.length;
    var g = Fd(4 + f + 1), h = g + 4;
    w[g >> 2] = f;
    e ? cc(d, h, f + 1) : I.set(d, h);
    null !== c && c.push(Q, g);
    return g;
  }, L:Gb, F(c) {
    Q(c);
  }});
}, _embind_register_std_wstring:(a, b, c) => {
  c = M(c);
  if (2 === b) {
    var d = jc;
    var e = kc;
    var f = lc;
  } else {
    p(4 === b, "only 2-byte and 4-byte strings are currently supported"), d = mc, e = nc, f = oc;
  }
  O(a, {name:c, u:g => {
    var h = d(g + 4, w[g >> 2] * b, !0);
    Q(g);
    return h;
  }, C:(g, h) => {
    if ("string" != typeof h) {
      throw new N(`Cannot pass non-string to C++ string type ${c}`);
    }
    var l = f(h), q = Fd(4 + l + b);
    w[q >> 2] = l / b;
    e(h, q + 4, l + b);
    null !== g && g.push(Q, q);
    return q;
  }, L:Gb, F(g) {
    Q(g);
  }});
}, _embind_register_void:(a, b) => {
  b = M(b);
  O(a, {pa:!0, name:b, u:() => {
  }, C:() => {
  }});
}, _emval_create_invoker:(a, b, c) => {
  var [d, ...e] = rc(a, b);
  b = d.C.bind(d);
  var f = e.map(l => l.L.bind(l));
  a--;
  var g = {toValue:Yb};
  a = f.map((l, q) => {
    var m = `argFromPtr${q}`;
    g[m] = l;
    return `${m}(args${q ? "+" + 8 * q : ""})`;
  });
  switch(c) {
    case 0:
      var h = "toValue(handle)";
      break;
    case 2:
      h = "new (toValue(handle))";
      break;
    case 3:
      h = "";
      break;
    case 1:
      g.getStringOrSymbol = uc, h = "toValue(handle)[getStringOrSymbol(methodName)]";
  }
  h += `(${a})`;
  d.pa || (g.toReturnWire = b, g.emval_returnValue = sc, h = `return emval_returnValue(toReturnWire, destructorsRef, ${h})`);
  h = `return function (handle, methodName, destructorsRef, args) {
  ${h}
  }`;
  c = (new Function(Object.keys(g), h))(...Object.values(g));
  h = `methodCaller<(${e.map(l => l.name)}) => ${d.name}>`;
  return qc(wb(h, c));
}, _emval_decref:Xb, _emval_invoke:(a, b, c, d, e) => pc[a](b, c, d, e), _emval_run_destructors:a => {
  var b = Yb(a);
  Qb(b);
  Xb(a);
}, _tzset_js:(a, b, c, d) => {
  var e = (new Date()).getFullYear(), f = (new Date(e, 0, 1)).getTimezoneOffset();
  e = (new Date(e, 6, 1)).getTimezoneOffset();
  w[a >> 2] = 60 * Math.max(f, e);
  Fa[b >> 2] = Number(f != e);
  b = g => {
    var h = Math.abs(g);
    return `UTC${0 <= g ? "-" : "+"}${String(Math.floor(h / 60)).padStart(2, "0")}${String(h % 60).padStart(2, "0")}`;
  };
  a = b(f);
  b = b(e);
  p(a);
  p(b);
  p(16 >= dc(a), `timezone name truncated to fit in TZNAME_MAX (${a})`);
  p(16 >= dc(b), `timezone name truncated to fit in TZNAME_MAX (${b})`);
  e < f ? (cc(a, c, 17), cc(b, d, 17)) : (cc(a, d, 17), cc(b, c, 17));
}, emscripten_resize_heap:a => {
  v(`Cannot enlarge memory arrays to size ${a >>> 0} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${H.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
}, environ_get:(a, b) => {
  var c = 0, d = 0, e;
  for (e of xc()) {
    var f = b + c;
    w[a + d >> 2] = f;
    c += cc(e, f, Infinity) + 1;
    d += 4;
  }
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = xc();
  w[a >> 2] = c.length;
  a = 0;
  for (var d of c) {
    a += dc(d) + 1;
  }
  w[b >> 2] = a;
  return 0;
}, fd_close:function(a) {
  try {
    var b = md(a);
    wd(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof Ed || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.M;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = md(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = w[a >> 2], l = w[a + 4 >> 2];
        a += 8;
        var q = e, m = h, n = l, t = f, y = H;
        p(0 <= m);
        if (0 > n || 0 > t) {
          throw new T(28);
        }
        if (null === q.fd) {
          throw new T(8);
        }
        if (1 === (q.flags & 2097155)) {
          throw new T(8);
        }
        if (V(q.node.mode)) {
          throw new T(31);
        }
        if (!q.l.read) {
          throw new T(28);
        }
        var x = "undefined" != typeof t;
        if (!x) {
          t = q.position;
        } else if (!q.seekable) {
          throw new T(70);
        }
        var z = q.l.read(q, y, m, n, t);
        x || (q.position += z);
        var A = z;
        if (0 > A) {
          var D = -1;
          break a;
        }
        b += A;
        if (A < l) {
          break;
        }
        "undefined" != typeof f && (f += A);
      }
      D = b;
    }
    w[d >> 2] = D;
    return 0;
  } catch (B) {
    if ("undefined" == typeof Ed || "ErrnoError" !== B.name) {
      throw B;
    }
    return B.M;
  }
}, fd_seek:function(a, b, c, d) {
  b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var e = md(a);
    xd(e, b, c);
    Ia[d >> 3] = BigInt(e.position);
    e.ea && 0 === b && 0 === c && (e.ea = null);
    return 0;
  } catch (f) {
    if ("undefined" == typeof Ed || "ErrnoError" !== f.name) {
      throw f;
    }
    return f.M;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = md(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = w[a >> 2], l = w[a + 4 >> 2];
        a += 8;
        var q = yd(e, H, h, l, f);
        if (0 > q) {
          var m = -1;
          break a;
        }
        b += q;
        if (q < l) {
          break;
        }
        "undefined" != typeof f && (f += q);
      }
      m = b;
    }
    w[d >> 2] = m;
    return 0;
  } catch (n) {
    if ("undefined" == typeof Ed || "ErrnoError" !== n.name) {
      throw n;
    }
    return n.M;
  }
}}, Ld;
function Md() {
  function a() {
    p(!Ld);
    Ld = !0;
    k.calledRun = !0;
    if (!pa) {
      p(!Ka);
      Ka = !0;
      sa();
      if (!k.noFSInit && !ad) {
        p(!ad, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        ad = !0;
        c ??= k.stdin;
        d ??= k.stdout;
        b ??= k.stderr;
        c ? Z("/dev", "stdin", c) : sd("/dev/tty", "/dev/stdin");
        d ? Z("/dev", "stdout", null, d) : sd("/dev/tty", "/dev/stdout");
        b ? Z("/dev", "stderr", null, b) : sd("/dev/tty1", "/dev/stderr");
        var b = vd("/dev/stdin", 0);
        var c = vd("/dev/stdout", 1);
        var d = vd("/dev/stderr", 1);
        p(0 === b.fd, `invalid handle for stdin (${b.fd})`);
        p(1 === c.fd, `invalid handle for stdout (${c.fd})`);
        p(2 === d.fd, `invalid handle for stderr (${d.fd})`);
      }
      J.__wasm_call_ctors();
      bd = !1;
      sa();
      k.onRuntimeInitialized?.();
      wa("onRuntimeInitialized");
      if (!k.noInitialRun) {
        p(0 == K, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
        p("undefined" === typeof Ta || 0 == Ta.length, "cannot call main when preRun functions remain to be called");
        b = Gd;
        try {
          var e = b(0, 0);
          Nd();
          Za || (k.onExit?.(e), pa = !0);
          fa(e, new Qa(e));
        } catch (f) {
          e = f, e instanceof Qa || "unwind" == e || (sa(), e instanceof WebAssembly.RuntimeError && 0 >= Jd() && u("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), fa(1, e));
        }
      }
      sa();
      if (k.postRun) {
        for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length;) {
          e = k.postRun.shift(), Sa.push(e);
        }
      }
      wa("postRun");
      Ra(Sa);
    }
  }
  if (0 < K) {
    Va = Md;
  } else {
    Id();
    qa();
    if (k.preRun) {
      for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length;) {
        Ua();
      }
    }
    wa("preRun");
    Ra(Ta);
    0 < K ? Va = Md : (k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => k.setStatus(""), 1);
      a();
    }, 1)) : a(), sa());
  }
}
function Nd() {
  var a = r, b = u, c = !1;
  r = u = () => {
    c = !0;
  };
  try {
    Hd(0), ["stdout", "stderr"].forEach(d => {
      d = "/dev/" + d;
      try {
        var e = X(d, {W:!0});
        d = e.path;
      } catch (g) {
      }
      var f = {Fa:!1, exists:!1, error:0, name:null, path:null, object:null, Ka:!1, Ma:null, La:null};
      try {
        e = X(d, {parent:!0}), f.Ka = !0, f.Ma = e.path, f.La = e.node, f.name = Bc(d), e = X(d, {W:!0}), f.exists = !0, f.path = e.path, f.object = e.node, f.name = e.node.name, f.Fa = "/" === e.path;
      } catch (g) {
        f.error = g.M;
      }
      f && Hc[f.object.rdev]?.output?.length && (c = !0);
    });
  } catch (d) {
  }
  r = a;
  u = b;
  c && E("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var J;
(async function() {
  function a(d) {
    J = d.exports;
    Ba = J.memory;
    p(Ba, "memory not found in wasm exports");
    d = Ba.buffer;
    H = new Int8Array(d);
    Ca = new Int16Array(d);
    I = new Uint8Array(d);
    Da = new Uint16Array(d);
    Fa = new Int32Array(d);
    w = new Uint32Array(d);
    Ga = new Float32Array(d);
    Ha = new Float64Array(d);
    Ia = new BigInt64Array(d);
    Ja = new BigUint64Array(d);
    Kb = J.__indirect_function_table;
    p(Kb, "table not found in wasm exports");
    d = J;
    Fd = La("malloc", 1);
    k._main = Gd = La("main", 2);
    Mb = La("__getTypeName", 1);
    Hd = La("fflush", 1);
    ra = d.emscripten_stack_get_end;
    dd = La("strerror", 1);
    Q = La("free", 1);
    Id = d.emscripten_stack_init;
    Jd = d.emscripten_stack_get_current;
    Xa("wasm-instantiate");
    return J;
  }
  Ya("wasm-instantiate");
  var b = k, c = {env:Kd, wasi_snapshot_preview1:Kd};
  if (k.instantiateWasm) {
    return new Promise((d, e) => {
      try {
        k.instantiateWasm(c, (f, g) => {
          d(a(f, g));
        });
      } catch (f) {
        u(`Module.instantiateWasm callback failed with error: ${f}`), e(f);
      }
    });
  }
  Ma ??= k.locateFile ? k.locateFile("immolate.wasm", ia) : ia + "immolate.wasm";
  return function(d) {
    p(k === b, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    b = null;
    return a(d.instance);
  }(await Pa(c));
})();
Md();

