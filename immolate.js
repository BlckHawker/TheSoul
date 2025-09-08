var k;
k ||= typeof Immolate != 'undefined' ? Immolate : {};
var aa = "object" == typeof window, ba = "undefined" != typeof WorkerGlobalScope, m = "object" == typeof process && process.versions?.node && "renderer" != process.type, ca = !aa && !m && !ba, da = "./this.program", ea = (a, b) => {
  throw b;
}, fa = "undefined" != typeof document ? document.currentScript?.src : void 0;
"undefined" != typeof __filename ? fa = __filename : ba && (fa = self.location.href);
var ha = "", ia, ja;
if (m) {
  if ("object" != typeof process || !process.versions?.node || "renderer" == process.type) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var ka = process.versions.node, la = ka.split(".").slice(0, 3);
  la = 10000 * la[0] + 100 * la[1] + 1 * la[2].split("-")[0];
  if (160000 > la) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + ka + ")");
  }
  var fs = require("fs");
  ha = __dirname + "/";
  ja = a => {
    a = ma(a) ? new URL(a) : a;
    a = fs.readFileSync(a);
    q(Buffer.isBuffer(a));
    return a;
  };
  ia = async a => {
    a = ma(a) ? new URL(a) : a;
    a = fs.readFileSync(a, void 0);
    q(Buffer.isBuffer(a));
    return a;
  };
  1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
  "undefined" != typeof module && (module.exports = k);
  ea = (a, b) => {
    process.exitCode = a;
    throw b;
  };
} else if (ca) {
  if ("object" == typeof process && process.versions?.node && "renderer" != process.type || "object" == typeof window || "undefined" != typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
} else if (aa || ba) {
  try {
    ha = (new URL(".", fa)).href;
  } catch {
  }
  if ("object" != typeof window && "undefined" == typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  ba && (ja = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  ia = async a => {
    if (ma(a)) {
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
var na = console.log.bind(console), t = console.error.bind(console);
q(!ca, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var oa;
"object" != typeof WebAssembly && t("no native wasm support detected");
var pa = !1;
function q(a, b) {
  a || u("Assertion failed" + (b ? ": " + b : ""));
}
var ma = a => a.startsWith("file://");
function qa() {
  var a = ra();
  q(0 == (a & 3));
  0 == a && (a += 4);
  v[a >> 2] = 34821223;
  v[a + 4 >> 2] = 2310721022;
  v[0] = 1668509029;
}
function sa() {
  if (!pa) {
    var a = ra();
    0 == a && (a += 4);
    var b = v[a >> 2], c = v[a + 4 >> 2];
    34821223 == b && 2310721022 == c || u(`Stack overflow! Stack cookie has been overwritten at ${ta(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ta(c)} ${ta(b)}`);
    1668509029 != v[0] && u("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var ua = new Int16Array(1), va = new Int8Array(ua.buffer);
ua[0] = 25459;
if (115 !== va[0] || 99 !== va[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
function wa(a) {
  Object.getOwnPropertyDescriptor(k, a) || Object.defineProperty(k, a, {configurable:!0, set() {
    u(`Attempt to set \`Module.${a}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function B(a) {
  return () => q(!1, `call to '${a}' via reference taken before Wasm module initialization`);
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
    D(`\`${a}\` is no longer defined by emscripten. ${b}`);
  });
}
za("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
za("asm", "Please use wasmExports instead");
function Aa(a) {
  Object.getOwnPropertyDescriptor(k, a) || Object.defineProperty(k, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    xa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    u(b);
  }});
}
var Ba, F, G, Ca, Da, Ea, v, Fa, Ga, Ha, Ia, Ja = !1;
q("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
function u(a) {
  k.onAbort?.(a);
  a = "Aborted(" + a + ")";
  t(a);
  pa = !0;
  throw new WebAssembly.RuntimeError(a);
}
function Ka(a, b) {
  return (...c) => {
    q(Ja, `native function \`${a}\` called before runtime initialization`);
    var d = H[a];
    q(d, `exported native function \`${a}\` not found`);
    q(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var La;
async function Ma(a) {
  if (!oa) {
    try {
      var b = await ia(a);
      return new Uint8Array(b);
    } catch {
    }
  }
  if (a == La && oa) {
    a = new Uint8Array(oa);
  } else {
    if (ja) {
      a = ja(a);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  return a;
}
async function Na(a, b) {
  try {
    var c = await Ma(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    t(`failed to asynchronously prepare wasm: ${d}`), ma(La) && t(`warning: Loading from a file URI (${La}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), u(d);
  }
}
async function Oa(a) {
  var b = La;
  if (!oa && !ma(b) && !m) {
    try {
      var c = fetch(b, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      t(`wasm streaming compile failed: ${d}`), t("falling back to ArrayBuffer instantiation");
    }
  }
  return Na(b, a);
}
class Pa {
  name="ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Qa = a => {
  for (; 0 < a.length;) {
    a.shift()(k);
  }
}, Ra = [], Sa = [], Ta = () => {
  var a = k.preRun.shift();
  Sa.push(a);
}, I = 0, Ua = null, Va = {}, J = null, Wa = () => {
  I++;
  k.monitorRunDependencies?.(I);
  q("wasm-instantiate", "addRunDependency requires an ID");
  q(!Va["wasm-instantiate"]);
  Va["wasm-instantiate"] = 1;
  null === J && "undefined" != typeof setInterval && (J = setInterval(() => {
    if (pa) {
      clearInterval(J), J = null;
    } else {
      var a = !1, b;
      for (b in Va) {
        a || (a = !0, t("still waiting on run dependencies:")), t(`dependency: ${b}`);
      }
      a && t("(end of list)");
    }
  }, 10000), J.unref?.());
}, Xa = !0, ta = a => {
  q("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, D = a => {
  D.ha || (D.ha = {});
  D.ha[a] || (D.ha[a] = 1, m && (a = "warning: " + a), t(a));
};
class Ya {
  constructor(a) {
    this.m = a - 24;
  }
}
var Za = 0, K = a => {
  for (var b = "";;) {
    var c = G[a++];
    if (!c) {
      return b;
    }
    b += String.fromCharCode(c);
  }
}, $a = {}, L = {}, ab = {}, M = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
}, bb = a => {
  throw new M(a);
};
function cb(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new M(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (L.hasOwnProperty(a)) {
    if (c.wa) {
      return;
    }
    throw new M(`Cannot register type '${d}' twice`);
  }
  L[a] = b;
  delete ab[a];
  $a.hasOwnProperty(a) && (b = $a[a], delete $a[a], b.forEach(e => e()));
}
function N(a, b, c = {}) {
  return cb(a, b, c);
}
var db = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => F[d] : d => G[d];
    case 2:
      return c ? d => Ca[d >> 1] : d => Da[d >> 1];
    case 4:
      return c ? d => Ea[d >> 2] : d => v[d >> 2];
    case 8:
      return c ? d => Ha[d >> 3] : d => Ia[d >> 3];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, O = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, eb = (a, b, c, d) => {
  if (b < c || b > d) {
    throw new TypeError(`Passing a number "${O(b)}" from JS side to C/C++ side to an argument of type "${a}", which is outside the valid range [${c}, ${d}]!`);
  }
}, fb = a => {
  throw new M(a.g.o.h.name + " instance already deleted");
}, gb = !1, hb = () => {
}, ib = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.B) {
    return null;
  }
  a = ib(a, b, c.B);
  return null === a ? null : c.ta(a);
}, jb = {}, kb = {}, lb = (a, b) => {
  if (void 0 === b) {
    throw new M("ptr should not be undefined");
  }
  for (; a.B;) {
    b = a.X(b), a = a.B;
  }
  return kb[b];
}, mb = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
}, ob = (a, b) => {
  if (!b.o || !b.m) {
    throw new mb("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.D !== !!b.A) {
    throw new mb("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return nb(Object.create(a, {g:{value:b, writable:!0}}));
};
function pb(a) {
  function b() {
    return this.$ ? ob(this.h.M, {o:this.Ea, m:c, D:this, A:a}) : ob(this.h.M, {o:this, m:a});
  }
  var c = this.va(a);
  if (!c) {
    return this.ka(a), null;
  }
  var d = lb(this.h, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.m = c, d.g.A = a, d.clone();
    }
    d = d.clone();
    this.ka(a);
    return d;
  }
  d = this.h.ua(c);
  d = jb[d];
  if (!d) {
    return b.call(this);
  }
  d = this.Z ? d.sa : d.pointerType;
  var e = ib(c, this.h, d.h);
  return null === e ? b.call(this) : this.$ ? ob(d.h.M, {o:d, m:e, D:this, A:a}) : ob(d.h.M, {o:d, m:e});
}
var nb = a => {
  if ("undefined" === typeof FinalizationRegistry) {
    return nb = b => b, a;
  }
  gb = new FinalizationRegistry(b => {
    console.warn(b.ya);
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.A ? b.D.N(b.A) : b.o.h.N(b.m));
  });
  nb = b => {
    var c = b.g;
    if (c.A) {
      var d = {g:c};
      c = Error(`Embind found a leaked C++ instance ${c.o.h.name} <${ta(c.m)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(c, pb);
      d.ya = c.stack.replace(/^Error: /, "");
      gb.register(b, d, b);
    }
    return b;
  };
  hb = b => {
    gb.unregister(b);
  };
  return nb(a);
}, qb = [];
function sb() {
}
var tb = (a, b) => Object.defineProperty(b, "name", {value:a}), ub = (a, b, c) => {
  if (void 0 === a[b].v) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].v.hasOwnProperty(e.length)) {
        throw new M(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].v})!`);
      }
      return a[b].v[e.length].apply(this, e);
    };
    a[b].v = [];
    a[b].v[d.T] = d;
  }
}, vb = (a, b, c) => {
  if (k.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== k[a].v && void 0 !== k[a].v[c]) {
      throw new M(`Cannot register public name '${a}' twice`);
    }
    ub(k, a, a);
    if (k[a].v.hasOwnProperty(c)) {
      throw new M(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    k[a].v[c] = b;
  } else {
    k[a] = b, k[a].T = c;
  }
}, wb = a => {
  q("string" === typeof a);
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function xb(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.constructor = b;
  this.M = c;
  this.N = d;
  this.B = e;
  this.ua = f;
  this.X = g;
  this.ta = h;
  this.Fa = [];
}
var yb = (a, b, c) => {
  for (; b !== c;) {
    if (!b.X) {
      throw new M(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.X(a);
    b = b.B;
  }
  return a;
};
function zb(a, b) {
  if (null === b) {
    if (this.fa) {
      throw new M(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new M(`Cannot pass "${O(b)}" as a ${this.name}`);
  }
  if (!b.g.m) {
    throw new M(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return yb(b.g.m, b.g.o.h, this.h);
}
function Ab(a, b) {
  if (null === b) {
    if (this.fa) {
      throw new M(`null is not a valid ${this.name}`);
    }
    if (this.$) {
      var c = this.Ga();
      null !== a && a.push(this.N, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new M(`Cannot pass "${O(b)}" as a ${this.name}`);
  }
  if (!b.g.m) {
    throw new M(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.Z && b.g.o.Z) {
    throw new M(`Cannot convert argument of type ${b.g.D ? b.g.D.name : b.g.o.name} to parameter type ${this.name}`);
  }
  c = yb(b.g.m, b.g.o.h, this.h);
  if (this.$) {
    if (void 0 === b.g.A) {
      throw new M("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.Ia) {
      case 0:
        if (b.g.D === this) {
          c = b.g.A;
        } else {
          throw new M(`Cannot convert argument of type ${b.g.D ? b.g.D.name : b.g.o.name} to parameter type ${this.name}`);
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
          c = this.Ha(c, Bb(() => d["delete"]()));
          null !== a && a.push(this.N, c);
        }
        break;
      default:
        throw new M("Unsupporting sharing policy");
    }
  }
  return c;
}
function Cb(a, b) {
  if (null === b) {
    if (this.fa) {
      throw new M(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new M(`Cannot pass "${O(b)}" as a ${this.name}`);
  }
  if (!b.g.m) {
    throw new M(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.o.Z) {
    throw new M(`Cannot convert argument of type ${b.g.o.name} to parameter type ${this.name}`);
  }
  return yb(b.g.m, b.g.o.h, this.h);
}
function Db(a) {
  return this.u(v[a >> 2]);
}
function Eb(a, b, c, d, e, f, g, h, l, p, n) {
  this.name = a;
  this.h = b;
  this.fa = c;
  this.Z = d;
  this.$ = e;
  this.Ea = f;
  this.Ia = g;
  this.ra = h;
  this.Ga = l;
  this.Ha = p;
  this.N = n;
  e || void 0 !== b.B ? this.C = Ab : (this.C = d ? zb : Cb, this.F = null);
}
var Fb = (a, b, c) => {
  if (!k.hasOwnProperty(a)) {
    throw new mb("Replacing nonexistent public symbol");
  }
  void 0 !== k[a].v && void 0 !== c ? k[a].v[c] = b : (k[a] = b, k[a].T = c);
}, Gb = [], Hb, P = (a, b, c = !1) => {
  q(!c, "Async bindings are only supported with JSPI.");
  a = K(a);
  (c = Gb[b]) || (Gb[b] = c = Hb.get(b));
  q(Hb.get(b) == c, "JavaScript-side Wasm function table mirror is out of date!");
  if ("function" != typeof c) {
    throw new M(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
};
class Ib extends Error {
}
var Kb = a => {
  a = Jb(a);
  var b = K(a);
  Q(a);
  return b;
}, Lb = (a, b) => {
  function c(f) {
    e[f] || L[f] || (ab[f] ? ab[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Ib(`${a}: ` + d.map(Kb).join([", "]));
}, R = (a, b, c) => {
  function d(h) {
    h = c(h);
    if (h.length !== a.length) {
      throw new mb("Mismatched type converter count");
    }
    for (var l = 0; l < a.length; ++l) {
      N(a[l], h[l]);
    }
  }
  a.forEach(h => ab[h] = b);
  var e = Array(b.length), f = [], g = 0;
  b.forEach((h, l) => {
    L.hasOwnProperty(h) ? e[l] = L[h] : (f.push(h), $a.hasOwnProperty(h) || ($a[h] = []), $a[h].push(() => {
      e[l] = L[h];
      ++g;
      g === f.length && d(e);
    }));
  });
  0 === f.length && d(e);
}, Mb = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(v[b + 4 * d >> 2]);
  }
  return c;
}, Nb = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function Ob(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].F) {
      return !0;
    }
  }
  return !1;
}
function Pb(a, b, c, d, e) {
  (a < b || a > c) && e(`function ${d} called with ${a} arguments, expected ${b == c ? b : `${b} to ${c}`}`);
}
function Qb(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new M("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  q(!f, "Async bindings are only supported with JSPI.");
  var h = null !== b[1] && null !== c, l = Ob(b);
  c = !b[0].ma;
  var p = g - 2;
  var n = b.length - 2;
  for (var r = b.length - 1; 2 <= r && b[r].optional; --r) {
    n--;
  }
  r = b[0];
  var w = b[1];
  d = [a, bb, d, e, Nb, r.u.bind(r), w?.C.bind(w)];
  for (e = 2; e < g; ++e) {
    r = b[e], d.push(r.C.bind(r));
  }
  if (!l) {
    for (e = h ? 1 : 2; e < b.length; ++e) {
      null !== b[e].F && d.push(b[e].F);
    }
  }
  d.push(Pb, n, p);
  l = Ob(b);
  p = b.length - 2;
  n = [];
  e = ["fn"];
  h && e.push("thisWired");
  for (g = 0; g < p; ++g) {
    n.push(`arg${g}`), e.push(`arg${g}Wired`);
  }
  n = n.join(",");
  e = e.join(",");
  n = `return function (${n}) {\n` + "checkArgCount(arguments.length, minArgs, maxArgs, humanName, throwBindingError);\n";
  l && (n += "var destructors = [];\n");
  w = l ? "destructors" : "null";
  r = "humanName throwBindingError invoker fn runDestructors fromRetWire toClassParamWire".split(" ");
  h && (n += `var thisWired = toClassParamWire(${w}, this);\n`);
  for (g = 0; g < p; ++g) {
    var y = `toArg${g}Wire`;
    n += `var arg${g}Wired = ${y}(${w}, arg${g});\n`;
    r.push(y);
  }
  n += (c || f ? "var rv = " : "") + `invoker(${e});\n`;
  if (l) {
    n += "runDestructors(destructors);\n";
  } else {
    for (g = h ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].F && (n += `${f}_dtor(${f});\n`, r.push(`${f}_dtor`));
    }
  }
  c && (n += "var ret = fromRetWire(rv);\nreturn ret;\n");
  n += "}\n";
  r.push("checkArgCount", "minArgs", "maxArgs");
  n = `if (arguments.length !== ${r.length}){ throw new Error(humanName + "Expected ${r.length} closure arguments " + arguments.length + " given."); }\n${n}`;
  b = (new Function(r, n))(...d);
  return tb(a, b);
}
var Rb = a => {
  a = a.trim();
  const b = a.indexOf("(");
  if (-1 === b) {
    return a;
  }
  q(a.endsWith(")"), "Parentheses for argument names should match.");
  return a.slice(0, b);
}, Sb = (a, b, c) => {
  if (!(a instanceof Object)) {
    throw new M(`${c} with invalid "this": ${a}`);
  }
  if (!(a instanceof b.h.constructor)) {
    throw new M(`${c} incompatible with "this" of type ${a.constructor.name}`);
  }
  if (!a.g.m) {
    throw new M(`cannot call emscripten binding method ${c} on deleted object`);
  }
  return yb(a.g.m, a.g.o.h, b.h);
}, Tb = [], S = [0, 1, , 1, null, 1, !0, 1, !1, 1], Ub = a => {
  9 < a && 0 === --S[a + 1] && (q(void 0 !== S[a], "Decref for unallocated handle."), S[a] = void 0, Tb.push(a));
}, Vb = a => {
  if (!a) {
    throw new M(`Cannot use deleted val. handle = ${a}`);
  }
  q(2 === a || void 0 !== S[a] && 0 === a % 2, `invalid handle: ${a}`);
  return S[a];
}, Bb = a => {
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
      const b = Tb.pop() || S.length;
      S[b] = a;
      S[b + 1] = 1;
      return b;
  }
}, Wb = {name:"emscripten::val", u:a => {
  var b = Vb(a);
  Ub(a);
  return b;
}, C:(a, b) => Bb(b), K:Db, F:null}, Xb = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.u(Fa[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.u(Ga[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, Yb = Object.assign({optional:!0}, Wb), Zb = (a, b, c, d) => {
  q("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
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
      1114111 < g && D("Invalid Unicode code point " + ta(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      b[c++] = 240 | g >> 18;
      b[c++] = 128 | g >> 12 & 63;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
      f++;
    }
  }
  b[c] = 0;
  return c - e;
}, $b = (a, b, c) => {
  q("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return Zb(a, G, b, c);
}, ac = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, bc = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, cc = (a, b, c, d) => {
  c = b + c;
  if (d) {
    return c;
  }
  for (; a[b] && !(b >= c);) {
    ++b;
  }
  return b;
}, dc = (a, b = 0, c, d) => {
  c = cc(a, b, c, d);
  if (16 < c - b && a.buffer && bc) {
    return bc.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && D("Invalid UTF-8 leading byte " + ta(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, ec = (a, b, c) => {
  q("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? dc(G, a, b, c) : "";
}, fc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, gc = (a, b, c) => {
  q(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  a >>= 1;
  b = cc(Da, a, b / 2, c);
  if (16 < b - a && fc) {
    return fc.decode(Da.subarray(a, b));
  }
  for (c = ""; a < b; ++a) {
    c += String.fromCharCode(Da[a]);
  }
  return c;
}, hc = (a, b, c) => {
  q(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  q("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
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
}, ic = a => 2 * a.length, jc = (a, b, c) => {
  q(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var d = "";
  a >>= 2;
  for (var e = 0; !(e >= b / 4); e++) {
    var f = v[a + e];
    if (!f && !c) {
      break;
    }
    d += String.fromCodePoint(f);
  }
  return d;
}, kc = (a, b, c) => {
  q(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  q("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.codePointAt(e);
    65535 < f && e++;
    Ea[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  Ea[b >> 2] = 0;
  return b - d;
}, lc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    65535 < a.codePointAt(c) && c++, b += 4;
  }
  return b;
}, mc = [], nc = a => {
  var b = mc.length;
  mc.push(a);
  return b;
}, oc = (a, b) => {
  for (var c = Array(a), d = 0; d < a; ++d) {
    var e = d, f = v[b + 4 * d >> 2], g = L[f];
    if (void 0 === g) {
      throw a = `${`parameter ${d}`} has unknown type ${Kb(f)}`, new M(a);
    }
    c[e] = g;
  }
  return c;
}, pc = (a, b, c) => {
  var d = [];
  a = a(d, c);
  d.length && (v[b >> 2] = Bb(d));
  return a;
}, qc = {}, rc = a => {
  var b = qc[a];
  return void 0 === b ? K(a) : b;
}, sc = {}, uc = () => {
  if (!tc) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:da || "./this.program"}, b;
    for (b in sc) {
      void 0 === sc[b] ? delete a[b] : a[b] = sc[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    tc = c;
  }
  return tc;
}, tc, vc = (a, b) => {
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
}, wc = a => {
  var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
  (a = vc(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, xc = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.slice(0, -1);
  return a + b;
}, yc = () => {
  if (m) {
    var a = require("crypto");
    return b => a.randomFillSync(b);
  }
  return b => crypto.getRandomValues(b);
}, Ac = a => {
  (Ac = yc())(a);
}, Bc = (...a) => {
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
  b = vc(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, Cc = [], Dc = [];
function Ec(a, b) {
  Dc[a] = {input:[], output:[], S:b};
  Fc(a, Gc);
}
var Gc = {open(a) {
  var b = Dc[a.node.rdev];
  if (!b) {
    throw new T(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close(a) {
  a.tty.S.fsync(a.tty);
}, fsync(a) {
  a.tty.S.fsync(a.tty);
}, read(a, b, c, d) {
  if (!a.tty || !a.tty.S.la) {
    throw new T(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.S.la(a.tty);
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
  if (!a.tty || !a.tty.S.ga) {
    throw new T(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.S.ga(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new T(29);
  }
  d && (a.node.mtime = a.node.ctime = Date.now());
  return e;
}}, Hc = {la() {
  a: {
    if (!Cc.length) {
      var a = null;
      if (m) {
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
      b = Array(ac(a) + 1);
      a = Zb(a, b, 0, b.length);
      b.length = a;
      Cc = b;
    }
    a = Cc.shift();
  }
  return a;
}, ga(a, b) {
  null === b || 10 === b ? (na(dc(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (na(dc(a.output)), a.output = []);
}, Sa() {
  return {Na:25856, Pa:5, Ma:191, Oa:35387, La:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, Ta() {
  return 0;
}, Ua() {
  return [24, 80];
}}, Ic = {ga(a, b) {
  null === b || 10 === b ? (t(dc(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (t(dc(a.output)), a.output = []);
}}, V = {H:null, J() {
  return V.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new T(63);
  }
  V.H || (V.H = {dir:{node:{L:V.j.L, I:V.j.I, lookup:V.j.lookup, aa:V.j.aa, rename:V.j.rename, unlink:V.j.unlink, rmdir:V.j.rmdir, readdir:V.j.readdir, symlink:V.j.symlink}, stream:{G:V.l.G}}, file:{node:{L:V.j.L, I:V.j.I}, stream:{G:V.l.G, read:V.l.read, write:V.l.write, oa:V.l.oa, qa:V.l.qa}}, link:{node:{L:V.j.L, I:V.j.I, readlink:V.j.readlink}, stream:{}}, ja:{node:{L:V.j.L, I:V.j.I}, stream:Jc}});
  c = Kc(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.j = V.H.dir.node, c.l = V.H.dir.stream, c.i = {}) : 32768 === (c.mode & 61440) ? (c.j = V.H.file.node, c.l = V.H.file.stream, c.s = 0, c.i = null) : 40960 === (c.mode & 61440) ? (c.j = V.H.link.node, c.l = V.H.link.stream) : 8192 === (c.mode & 61440) && (c.j = V.H.ja.node, c.l = V.H.ja.stream);
  c.atime = c.mtime = c.ctime = Date.now();
  a && (a.i[b] = c, a.atime = a.mtime = a.ctime = c.atime);
  return c;
}, Ra(a) {
  return a.i ? a.i.subarray ? a.i.subarray(0, a.s) : new Uint8Array(a.i) : new Uint8Array(0);
}, j:{L(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.s : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
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
  void 0 !== b.size && (b = b.size, a.s != b && (0 == b ? (a.i = null, a.s = 0) : (c = a.i, a.i = new Uint8Array(b), c && a.i.set(c.subarray(0, Math.min(b, a.s))), a.s = b)));
}, lookup() {
  throw new T(44);
}, aa(a, b, c, d) {
  return V.createNode(a, b, c, d);
}, rename(a, b, c) {
  try {
    var d = Lc(b, c);
  } catch (f) {
  }
  if (d) {
    if (16384 === (a.mode & 61440)) {
      for (var e in d.i) {
        throw new T(55);
      }
    }
    e = Mc(d.parent.id, d.name);
    if (W[e] === d) {
      W[e] = d.R;
    } else {
      for (e = W[e]; e;) {
        if (e.R === d) {
          e.R = d.R;
          break;
        }
        e = e.R;
      }
    }
  }
  delete a.parent.i[a.name];
  b.i[c] = a;
  a.name = c;
  b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
}, unlink(a, b) {
  delete a.i[b];
  a.ctime = a.mtime = Date.now();
}, rmdir(a, b) {
  var c = Lc(a, b), d;
  for (d in c.i) {
    throw new T(55);
  }
  delete a.i[b];
  a.ctime = a.mtime = Date.now();
}, readdir(a) {
  return [".", "..", ...Object.keys(a.i)];
}, symlink(a, b, c) {
  a = V.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new T(28);
  }
  return a.link;
}}, l:{read(a, b, c, d, e) {
  var f = a.node.i;
  if (e >= a.node.s) {
    return 0;
  }
  a = Math.min(a.node.s - e, d);
  q(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  q(!(b instanceof ArrayBuffer));
  if (!d) {
    return 0;
  }
  a = a.node;
  a.mtime = a.ctime = Date.now();
  if (b.subarray && (!a.i || a.i.subarray)) {
    if (f) {
      return q(0 === e, "canOwn must imply no weird position inside the file"), a.i = b.subarray(c, c + d), a.s = d;
    }
    if (0 === a.s && 0 === e) {
      return a.i = b.slice(c, c + d), a.s = d;
    }
    if (e + d <= a.s) {
      return a.i.set(b.subarray(c, c + d), e), d;
    }
  }
  f = e + d;
  var g = a.i ? a.i.length : 0;
  g >= f || (f = Math.max(f, g * (1048576 > g ? 2.0 : 1.125) >>> 0), 0 != g && (f = Math.max(f, 256)), g = a.i, a.i = new Uint8Array(f), 0 < a.s && a.i.set(g.subarray(0, a.s), 0));
  if (a.i.subarray && b.subarray) {
    a.i.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.i[e + f] = b[c + f];
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
}, oa(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new T(43);
  }
  a = a.node.i;
  if (e & 2 || !a || a.buffer !== F.buffer) {
    d = !0;
    u("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
    e = void 0;
    if (!e) {
      throw new T(48);
    }
    if (a) {
      if (0 < c || c + b < a.length) {
        a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
      }
      F.set(a, e);
    }
  } else {
    d = !1, e = a.byteOffset;
  }
  return {m:e, Ka:d};
}, qa(a, b, c, d) {
  V.l.write(a, b, 0, d, c, !1);
  return 0;
}}}, Nc = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, Oc = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, Pc = null, Qc = {}, Rc = [], Sc = 1, W = null, Tc = !1, Uc = !0, Vc = {}, T = class extends Error {
  name="ErrnoError";
  constructor(a) {
    super(Ja ? ec(Wc(a)) : "");
    this.P = a;
    for (var b in Oc) {
      if (Oc[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, Xc = class {
  Y={};
  node=null;
  get object() {
    return this.node;
  }
  set object(a) {
    this.node = a;
  }
  get flags() {
    return this.Y.flags;
  }
  set flags(a) {
    this.Y.flags = a;
  }
  get position() {
    return this.Y.position;
  }
  set position(a) {
    this.Y.position = a;
  }
}, Yc = class {
  j={};
  l={};
  ba=null;
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.J = a.J;
    this.id = Sc++;
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
    for (var d = Pc, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) {
        break;
      }
      if ("." !== a[f]) {
        if (".." === a[f]) {
          if (e = xc(e), d === d.parent) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else {
            d = d.parent;
          }
        } else {
          e = wc(e + "/" + a[f]);
          try {
            d = Lc(d, a[f]);
          } catch (h) {
            if (44 === h?.P && g && b.Aa) {
              return {path:e};
            }
            throw h;
          }
          !d.ba || g && !b.da || (d = d.ba.root);
          if (40960 === (d.mode & 61440) && (!g || b.V)) {
            if (!d.j.readlink) {
              throw new T(52);
            }
            d = d.j.readlink(d);
            "/" === d.charAt(0) || (d = xc(e) + "/" + d);
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
function Mc(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % W.length;
}
function Lc(a, b) {
  var c = 16384 === (a.mode & 61440) ? (c = Zc(a, "x")) ? c : a.j.lookup ? 0 : 2 : 54;
  if (c) {
    throw new T(c);
  }
  for (c = W[Mc(a.id, b)]; c; c = c.R) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.j.lookup(a, b);
}
function Kc(a, b, c, d) {
  q("object" == typeof a);
  a = new Yc(a, b, c, d);
  b = Mc(a.parent.id, a.name);
  a.R = W[b];
  return W[b] = a;
}
function $c(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Zc(a, b) {
  if (Uc) {
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
function ad(a, b) {
  if (16384 !== (a.mode & 61440)) {
    return 54;
  }
  try {
    return Lc(a, b), 20;
  } catch (c) {
  }
  return Zc(a, "wx");
}
function bd(a) {
  a = Rc[a];
  if (!a) {
    throw new T(8);
  }
  return a;
}
function cd(a, b) {
  var c = null?.l.I, d = c ? null : a;
  c ??= a.j.I;
  if (!c) {
    throw new T(63);
  }
  c(d, b);
}
var Jc = {open(a) {
  a.l = Qc[a.node.rdev].l;
  a.l.open?.(a);
}, G() {
  throw new T(70);
}};
function Fc(a, b) {
  Qc[a] = {l:b};
}
function dd(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Pc) {
    throw new T(10);
  }
  if (!c && !d) {
    var e = X(b, {da:!1});
    b = e.path;
    e = e.node;
    if (e.ba) {
      throw new T(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new T(54);
    }
  }
  b = {type:a, Va:{}, pa:b, za:[]};
  a = a.J(b);
  a.J = b;
  b.root = a;
  c ? Pc = a : e && (e.ba = b, e.J && e.J.za.push(b));
}
function ed(a, b, c) {
  var d = X(a, {parent:!0}).node;
  a = a && a.match(/([^\/]+|\/)\/*$/)[1];
  if (!a) {
    throw new T(28);
  }
  if ("." === a || ".." === a) {
    throw new T(20);
  }
  var e = ad(d, a);
  if (e) {
    throw new T(e);
  }
  if (!d.j.aa) {
    throw new T(63);
  }
  return d.j.aa(d, a, b, c);
}
function Y(a) {
  return ed(a, 16895, 0);
}
function fd(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  ed(a, b | 8192, c);
}
function gd(a, b) {
  if (!Bc(a)) {
    throw new T(44);
  }
  var c = X(b, {parent:!0}).node;
  if (!c) {
    throw new T(44);
  }
  b = b && b.match(/([^\/]+|\/)\/*$/)[1];
  var d = ad(c, b);
  if (d) {
    throw new T(d);
  }
  if (!c.j.symlink) {
    throw new T(63);
  }
  c.j.symlink(c, b, a);
}
function hd(a, b) {
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
    a = X(a, {V:!(b & 131072), Aa:!0});
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
      d = ed(a, c | 511, 0);
      f = !0;
    }
  }
  if (!d) {
    throw new T(44);
  }
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (d.mode & 61440)) {
    throw new T(54);
  }
  if (!f && (e = d ? 40960 === (d.mode & 61440) ? 32 : 16384 === (d.mode & 61440) && ("r" !== $c(b) || b & 576) ? 31 : Zc(d, $c(b)) : 44)) {
    throw new T(e);
  }
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? X(e, {V:!0}).node : e;
    if (16384 === (e.mode & 61440)) {
      throw new T(31);
    }
    if (32768 !== (e.mode & 61440)) {
      throw new T(28);
    }
    var g = Zc(e, "w");
    if (g) {
      throw new T(g);
    }
    cd(e, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  a: {
    for (e = d;;) {
      if (e === e.parent) {
        e = e.J.pa;
        var h = h ? "/" !== e[e.length - 1] ? `${e}/${h}` : e + h : e;
        break a;
      }
      h = h ? `${e.name}/${h}` : e.name;
      e = e.parent;
    }
  }
  h = {node:d, path:h, flags:b, seekable:!0, position:0, l:d.l, Ja:[], error:!1};
  e = -1;
  q(-1 <= e);
  h = Object.assign(new Xc(), h);
  if (-1 == e) {
    a: {
      for (e = 0; 4096 >= e; e++) {
        if (!Rc[e]) {
          break a;
        }
      }
      throw new T(33);
    }
  }
  h.fd = e;
  Rc[e] = h;
  h.l.open && h.l.open(h);
  f && (c &= 511, d = "string" == typeof d ? X(d, {V:!0}).node : d, cd(d, {mode:c & 4095 | d.mode & -4096, ctime:Date.now(), Qa:void 0}));
  !k.logReadFiles || b & 1 || a in Vc || (Vc[a] = 1);
  return h;
}
function jd(a, b, c) {
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
  a.Ja = [];
}
function Z(a, b, c) {
  a = wc("/dev/" + a);
  var d = Nc(!!b, !!c);
  Z.na ?? (Z.na = 64);
  var e = Z.na++ << 8 | 0;
  Fc(e, {open(f) {
    f.seekable = !1;
  }, close() {
    c?.buffer?.length && c(10);
  }, read(f, g, h, l) {
    for (var p = 0, n = 0; n < l; n++) {
      try {
        var r = b();
      } catch (w) {
        throw new T(29);
      }
      if (void 0 === r && 0 === p) {
        throw new T(6);
      }
      if (null === r || void 0 === r) {
        break;
      }
      p++;
      g[h + n] = r;
    }
    p && (f.node.atime = Date.now());
    return p;
  }, write(f, g, h, l) {
    for (var p = 0; p < l; p++) {
      try {
        c(g[h + p]);
      } catch (n) {
        throw new T(29);
      }
    }
    l && (f.node.mtime = f.node.ctime = Date.now());
    return p;
  }});
  fd(a, d, e);
}
var kd = {};
(() => {
  let a = sb.prototype;
  Object.assign(a, {isAliasOf:function(c) {
    if (!(this instanceof sb && c instanceof sb)) {
      return !1;
    }
    var d = this.g.o.h, e = this.g.m;
    c.g = c.g;
    var f = c.g.o.h;
    for (c = c.g.m; d.B;) {
      e = d.X(e), d = d.B;
    }
    for (; f.B;) {
      c = f.X(c), f = f.B;
    }
    return d === f && e === c;
  }, clone:function() {
    this.g.m || fb(this);
    if (this.g.W) {
      return this.g.count.value += 1, this;
    }
    var c = nb, d = Object, e = d.create, f = Object.getPrototypeOf(this), g = this.g;
    c = c(e.call(d, f, {g:{value:{count:g.count, U:g.U, W:g.W, m:g.m, o:g.o, A:g.A, D:g.D}}}));
    c.g.count.value += 1;
    c.g.U = !1;
    return c;
  }, ["delete"]() {
    this.g.m || fb(this);
    if (this.g.U && !this.g.W) {
      throw new M("Object already scheduled for deletion");
    }
    hb(this);
    var c = this.g;
    --c.count.value;
    0 === c.count.value && (c.A ? c.D.N(c.A) : c.o.h.N(c.m));
    this.g.W || (this.g.A = void 0, this.g.m = void 0);
  }, isDeleted:function() {
    return !this.g.m;
  }, deleteLater:function() {
    this.g.m || fb(this);
    if (this.g.U && !this.g.W) {
      throw new M("Object already scheduled for deletion");
    }
    qb.push(this);
    this.g.U = !0;
    return this;
  }});
  const b = Symbol.dispose;
  b && (a[b] = a["delete"]);
})();
Object.assign(Eb.prototype, {va(a) {
  this.ra && (a = this.ra(a));
  return a;
}, ka(a) {
  this.N?.(a);
}, K:Db, u:pb});
q(10 === S.length);
W = Array(4096);
dd(V, "/");
Y("/tmp");
Y("/home");
Y("/home/web_user");
(function() {
  Y("/dev");
  Fc(259, {read:() => 0, write:(d, e, f, g) => g, G:() => 0});
  fd("/dev/null", 259);
  Ec(1280, Hc);
  Ec(1536, Ic);
  fd("/dev/tty", 1280);
  fd("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (Ac(a), b = a.byteLength);
    return a[--b];
  };
  Z("random", c);
  Z("urandom", c);
  Y("/dev/shm");
  Y("/dev/shm/tmp");
})();
(function() {
  Y("/proc");
  var a = Y("/proc/self");
  Y("/proc/self/fd");
  dd({J() {
    var b = Kc(a, "fd", 16895, 73);
    b.l = {G:V.l.G};
    b.j = {lookup(c, d) {
      c = +d;
      var e = bd(c);
      c = {parent:null, J:{pa:"fake"}, j:{readlink:() => e.path}, id:c + 1};
      return c.parent = c;
    }, readdir() {
      return Array.from(Rc.entries()).filter(([, c]) => c).map(([c]) => c.toString());
    }};
    return b;
  }}, "/proc/self/fd");
})();
k.noExitRuntime && (Xa = k.noExitRuntime);
k.print && (na = k.print);
k.printErr && (t = k.printErr);
k.wasmBinary && (oa = k.wasmBinary);
Object.getOwnPropertyDescriptor(k, "fetchSettings") && u("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
k.thisProgram && (da = k.thisProgram);
q("undefined" == typeof k.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
q("undefined" == typeof k.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
q("undefined" == typeof k.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
q("undefined" == typeof k.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
q("undefined" == typeof k.read, "Module.read option was removed");
q("undefined" == typeof k.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
q("undefined" == typeof k.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
q("undefined" == typeof k.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
q("undefined" == typeof k.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
q("undefined" == typeof k.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
q("undefined" == typeof k.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
q("undefined" == typeof k.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
q("undefined" == typeof k.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if (k.preInit) {
  for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length;) {
    k.preInit.shift()();
  }
}
wa("preInit");
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory getHeapMax growMemory withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr readEmAsmArgs jstoi_q autoResumeAudioContext getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle alignMemory HandleAllocator getNativeTypeSize addOnInit addOnPostCtor addOnPreMain addOnExit STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback maybeCStringToJsString findEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags safeSetTimeout setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop registerPreMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory demangle stackTrace getFunctionArgsName createJsInvokerSignature PureVirtualError registerInheritedInstance unregisterInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer setDelayFunction count_emval_handles emval_get_global".split(" ").forEach(function(a) {
  ya(a, () => {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    xa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    D(b);
  });
  Aa(a);
});
"run out err callMain abort wasmMemory wasmExports HEAPF32 HEAPF64 HEAP8 HEAPU8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore ptrToString exitJS abortOnCannotGrowMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray getExecutableName handleException keepRuntimeAlive asyncLoad mmapAlloc wasmTable getUniqueRunDependency noExitRuntime addRunDependency removeRunDependency addOnPreRun addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev initRandomFill randomFill emSetImmediate emClearImmediate_deps emClearImmediate promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia createContext getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_preloadFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_unlink FS_createPath FS_createDevice FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_createDataFile FS_forceLoadFile FS_createLazyFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr jstoi_s InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError EmValType EmValOptionalType throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol createNamedFunction embindRepr registeredInstances getBasestPointer getInheritedInstance registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols getStringOrSymbol Emval emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller".split(" ").forEach(Aa);
var ld = B("_malloc"), md = k._main = B("_main"), Jb = B("___getTypeName"), nd = B("_fflush"), ra = B("_emscripten_stack_get_end"), Wc = B("_strerror"), Q = B("_free"), od = B("_emscripten_stack_init"), pd = B("_emscripten_stack_get_current"), qd = {__cxa_throw:(a, b, c) => {
  a = new Ya(a);
  v[a.m + 16 >> 2] = 0;
  v[a.m + 4 >> 2] = b;
  v[a.m + 8 >> 2] = c;
  Za++;
  q(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, _abort_js:() => u("native code called abort()"), _embind_register_bigint:(a, b, c, d, e) => {
  b = K(b);
  const f = 0n === d;
  let g = h => h;
  if (f) {
    const h = 8 * c;
    g = l => BigInt.asUintN(h, l);
    e = g(e);
  }
  N(a, {name:b, u:g, C:(h, l) => {
    if ("number" == typeof l) {
      l = BigInt(l);
    } else if ("bigint" != typeof l) {
      throw new TypeError(`Cannot convert "${O(l)}" to ${this.name}`);
    }
    eb(b, l, d, e);
    return l;
  }, K:db(b, c, !f), F:null});
}, _embind_register_bool:(a, b, c, d) => {
  b = K(b);
  N(a, {name:b, u:function(e) {
    return !!e;
  }, C:function(e, f) {
    return f ? c : d;
  }, K:function(e) {
    return this.u(G[e]);
  }, F:null});
}, _embind_register_class:(a, b, c, d, e, f, g, h, l, p, n, r, w) => {
  n = K(n);
  f = P(e, f);
  h &&= P(g, h);
  p &&= P(l, p);
  w = P(r, w);
  var y = wb(n);
  vb(y, function() {
    Lb(`Cannot construct ${n} due to unbound types`, [d]);
  });
  R([a, b, c], d ? [d] : [], x => {
    x = x[0];
    if (d) {
      var A = x.h;
      var C = A.M;
    } else {
      C = sb.prototype;
    }
    x = tb(n, function(...rb) {
      if (Object.getPrototypeOf(this) !== E) {
        throw new M(`Use 'new' to construct ${n}`);
      }
      if (void 0 === z.O) {
        throw new M(`${n} has no accessible constructor`);
      }
      var zc = z.O[rb.length];
      if (void 0 === zc) {
        throw new M(`Tried to invoke ctor of ${n} with invalid number of parameters (${rb.length}) - expected (${Object.keys(z.O).toString()}) parameters instead!`);
      }
      return zc.apply(this, rb);
    });
    var E = Object.create(C, {constructor:{value:x}});
    x.prototype = E;
    var z = new xb(n, x, E, w, A, f, h, p);
    if (z.B) {
      var U;
      (U = z.B).ia ?? (U.ia = []);
      z.B.ia.push(z);
    }
    A = new Eb(n, z, !0, !1, !1);
    U = new Eb(n + "*", z, !1, !1, !1);
    C = new Eb(n + " const*", z, !1, !0, !1);
    jb[a] = {pointerType:U, sa:C};
    Fb(y, x);
    return [A, U, C];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  q(0 < b);
  var g = Mb(b, c);
  e = P(d, e);
  R([], [a], h => {
    h = h[0];
    var l = `constructor ${h.name}`;
    void 0 === h.h.O && (h.h.O = []);
    if (void 0 !== h.h.O[b - 1]) {
      throw new M(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    h.h.O[b - 1] = () => {
      Lb(`Cannot construct ${h.name} due to unbound types`, g);
    };
    R([], g, p => {
      p.splice(1, 0, null);
      h.h.O[b - 1] = Qb(l, p, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, h, l) => {
  var p = Mb(c, d);
  b = K(b);
  b = Rb(b);
  f = P(e, f, l);
  R([], [a], n => {
    function r() {
      Lb(`Cannot call ${w} due to unbound types`, p);
    }
    n = n[0];
    var w = `${n.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    h && n.h.Fa.push(b);
    var y = n.h.M, x = y[b];
    void 0 === x || void 0 === x.v && x.className !== n.name && x.T === c - 2 ? (r.T = c - 2, r.className = n.name, y[b] = r) : (ub(y, b, w), y[b].v[c - 2] = r);
    R([], p, A => {
      A = Qb(w, A, n, f, g, l);
      void 0 === y[b].v ? (A.T = c - 2, y[b] = A) : y[b].v[c - 2] = A;
      return [];
    });
    return [];
  });
}, _embind_register_class_property:(a, b, c, d, e, f, g, h, l, p) => {
  b = K(b);
  e = P(d, e);
  R([], [a], n => {
    n = n[0];
    var r = `${n.name}.${b}`, w = {get() {
      Lb(`Cannot access ${r} due to unbound types`, [c, g]);
    }, enumerable:!0, configurable:!0};
    w.set = l ? () => Lb(`Cannot access ${r} due to unbound types`, [c, g]) : () => {
      throw new M(r + " is a read-only property");
    };
    Object.defineProperty(n.h.M, b, w);
    R([], l ? [c, g] : [c], y => {
      var x = y[0], A = {get() {
        var E = Sb(this, n, r + " getter");
        return x.u(e(f, E));
      }, enumerable:!0};
      if (l) {
        l = P(h, l);
        var C = y[1];
        A.set = function(E) {
          var z = Sb(this, n, r + " setter"), U = [];
          l(p, z, C.C(U, E));
          Nb(U);
        };
      }
      Object.defineProperty(n.h.M, b, A);
      return [];
    });
    return [];
  });
}, _embind_register_constant:(a, b, c) => {
  a = K(a);
  R([], [b], d => {
    d = d[0];
    k[a] = d.u(c);
    return [];
  });
}, _embind_register_emval:a => N(a, Wb), _embind_register_float:(a, b, c) => {
  b = K(b);
  N(a, {name:b, u:d => d, C:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${O(e)} to ${this.name}`);
    }
    return e;
  }, K:Xb(b, c), F:null});
}, _embind_register_function:(a, b, c, d, e, f, g) => {
  var h = Mb(b, c);
  a = K(a);
  a = Rb(a);
  e = P(d, e, g);
  vb(a, function() {
    Lb(`Cannot call ${a} due to unbound types`, h);
  }, b - 1);
  R([], h, l => {
    l = [l[0], null].concat(l.slice(1));
    Fb(a, Qb(a, l, null, e, f, g), b - 1);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = K(b);
  let f = h => h;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = h => h << g >>> g;
    e = f(e);
  }
  N(a, {name:b, u:f, C:(h, l) => {
    if ("number" != typeof l && "boolean" != typeof l) {
      throw new TypeError(`Cannot convert "${O(l)}" to ${b}`);
    }
    eb(b, l, d, e);
    return l;
  }, K:db(b, c, 0 !== d), F:null});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(F.buffer, v[f + 4 >> 2], v[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
  c = K(c);
  N(a, {name:c, u:d, K:d}, {wa:!0});
}, _embind_register_optional:a => {
  N(a, Yb);
}, _embind_register_std_string:(a, b) => {
  b = K(b);
  N(a, {name:b, u(c) {
    var d = ec(c + 4, v[c >> 2], !0);
    Q(c);
    return d;
  }, C(c, d) {
    d instanceof ArrayBuffer && (d = new Uint8Array(d));
    var e = "string" == typeof d;
    if (!(e || ArrayBuffer.isView(d) && 1 == d.BYTES_PER_ELEMENT)) {
      throw new M("Cannot pass non-string to std::string");
    }
    var f = e ? ac(d) : d.length;
    var g = ld(4 + f + 1), h = g + 4;
    v[g >> 2] = f;
    e ? $b(d, h, f + 1) : G.set(d, h);
    null !== c && c.push(Q, g);
    return g;
  }, K:Db, F(c) {
    Q(c);
  }});
}, _embind_register_std_wstring:(a, b, c) => {
  c = K(c);
  if (2 === b) {
    var d = gc;
    var e = hc;
    var f = ic;
  } else {
    q(4 === b, "only 2-byte and 4-byte strings are currently supported"), d = jc, e = kc, f = lc;
  }
  N(a, {name:c, u:g => {
    var h = d(g + 4, v[g >> 2] * b, !0);
    Q(g);
    return h;
  }, C:(g, h) => {
    if ("string" != typeof h) {
      throw new M(`Cannot pass non-string to C++ string type ${c}`);
    }
    var l = f(h), p = ld(4 + l + b);
    v[p >> 2] = l / b;
    e(h, p + 4, l + b);
    null !== g && g.push(Q, p);
    return p;
  }, K:Db, F(g) {
    Q(g);
  }});
}, _embind_register_void:(a, b) => {
  b = K(b);
  N(a, {ma:!0, name:b, u:() => {
  }, C:() => {
  }});
}, _emval_create_invoker:(a, b, c) => {
  var [d, ...e] = oc(a, b);
  b = d.C.bind(d);
  var f = e.map(l => l.K.bind(l));
  a--;
  var g = {toValue:Vb};
  a = f.map((l, p) => {
    var n = `argFromPtr${p}`;
    g[n] = l;
    return `${n}(args${p ? "+" + 8 * p : ""})`;
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
      g.getStringOrSymbol = rc, h = "toValue(handle)[getStringOrSymbol(methodName)]";
  }
  h += `(${a})`;
  d.ma || (g.toReturnWire = b, g.emval_returnValue = pc, h = `return emval_returnValue(toReturnWire, destructorsRef, ${h})`);
  h = `return function (handle, methodName, destructorsRef, args) {
  ${h}
  }`;
  c = (new Function(Object.keys(g), h))(...Object.values(g));
  h = `methodCaller<(${e.map(l => l.name)}) => ${d.name}>`;
  return nc(tb(h, c));
}, _emval_decref:Ub, _emval_invoke:(a, b, c, d, e) => mc[a](b, c, d, e), _emval_run_destructors:a => {
  var b = Vb(a);
  Nb(b);
  Ub(a);
}, _tzset_js:(a, b, c, d) => {
  var e = (new Date()).getFullYear(), f = (new Date(e, 0, 1)).getTimezoneOffset();
  e = (new Date(e, 6, 1)).getTimezoneOffset();
  v[a >> 2] = 60 * Math.max(f, e);
  Ea[b >> 2] = Number(f != e);
  b = g => {
    var h = Math.abs(g);
    return `UTC${0 <= g ? "-" : "+"}${String(Math.floor(h / 60)).padStart(2, "0")}${String(h % 60).padStart(2, "0")}`;
  };
  a = b(f);
  b = b(e);
  q(a);
  q(b);
  q(16 >= ac(a), `timezone name truncated to fit in TZNAME_MAX (${a})`);
  q(16 >= ac(b), `timezone name truncated to fit in TZNAME_MAX (${b})`);
  e < f ? ($b(a, c, 17), $b(b, d, 17)) : ($b(a, d, 17), $b(b, c, 17));
}, emscripten_resize_heap:a => {
  u(`Cannot enlarge memory arrays to size ${a >>> 0} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${F.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
}, environ_get:(a, b) => {
  var c = 0, d = 0, e;
  for (e of uc()) {
    var f = b + c;
    v[a + d >> 2] = f;
    c += $b(e, f, Infinity) + 1;
    d += 4;
  }
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = uc();
  v[a >> 2] = c.length;
  a = 0;
  for (var d of c) {
    a += ac(d) + 1;
  }
  v[b >> 2] = a;
  return 0;
}, fd_close:function(a) {
  try {
    var b = bd(a);
    if (null === b.fd) {
      throw new T(8);
    }
    b.ea && (b.ea = null);
    try {
      b.l.close && b.l.close(b);
    } catch (c) {
      throw c;
    } finally {
      Rc[b.fd] = null;
    }
    b.fd = null;
    return 0;
  } catch (c) {
    if ("undefined" == typeof kd || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.P;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = bd(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = v[a >> 2], l = v[a + 4 >> 2];
        a += 8;
        var p = e, n = h, r = l, w = f, y = F;
        q(0 <= n);
        if (0 > r || 0 > w) {
          throw new T(28);
        }
        if (null === p.fd) {
          throw new T(8);
        }
        if (1 === (p.flags & 2097155)) {
          throw new T(8);
        }
        if (16384 === (p.node.mode & 61440)) {
          throw new T(31);
        }
        if (!p.l.read) {
          throw new T(28);
        }
        var x = "undefined" != typeof w;
        if (!x) {
          w = p.position;
        } else if (!p.seekable) {
          throw new T(70);
        }
        var A = p.l.read(p, y, n, r, w);
        x || (p.position += A);
        var C = A;
        if (0 > C) {
          var E = -1;
          break a;
        }
        b += C;
        if (C < l) {
          break;
        }
        "undefined" != typeof f && (f += C);
      }
      E = b;
    }
    v[d >> 2] = E;
    return 0;
  } catch (z) {
    if ("undefined" == typeof kd || "ErrnoError" !== z.name) {
      throw z;
    }
    return z.P;
  }
}, fd_seek:function(a, b, c, d) {
  b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var e = bd(a);
    jd(e, b, c);
    Ha[d >> 3] = BigInt(e.position);
    e.ea && 0 === b && 0 === c && (e.ea = null);
    return 0;
  } catch (f) {
    if ("undefined" == typeof kd || "ErrnoError" !== f.name) {
      throw f;
    }
    return f.P;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = bd(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = v[a >> 2], l = v[a + 4 >> 2];
        a += 8;
        var p = e, n = h, r = l, w = f, y = F;
        q(0 <= n);
        if (0 > r || 0 > w) {
          throw new T(28);
        }
        if (null === p.fd) {
          throw new T(8);
        }
        if (0 === (p.flags & 2097155)) {
          throw new T(8);
        }
        if (16384 === (p.node.mode & 61440)) {
          throw new T(31);
        }
        if (!p.l.write) {
          throw new T(28);
        }
        p.seekable && p.flags & 1024 && jd(p, 0, 2);
        var x = "undefined" != typeof w;
        if (!x) {
          w = p.position;
        } else if (!p.seekable) {
          throw new T(70);
        }
        var A = p.l.write(p, y, n, r, w, void 0);
        x || (p.position += A);
        var C = A;
        if (0 > C) {
          var E = -1;
          break a;
        }
        b += C;
        if (C < l) {
          break;
        }
        "undefined" != typeof f && (f += C);
      }
      E = b;
    }
    v[d >> 2] = E;
    return 0;
  } catch (z) {
    if ("undefined" == typeof kd || "ErrnoError" !== z.name) {
      throw z;
    }
    return z.P;
  }
}}, rd;
function sd() {
  function a() {
    q(!rd);
    rd = !0;
    k.calledRun = !0;
    if (!pa) {
      q(!Ja);
      Ja = !0;
      sa();
      if (!k.noFSInit && !Tc) {
        q(!Tc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        Tc = !0;
        c ??= k.stdin;
        d ??= k.stdout;
        b ??= k.stderr;
        c ? Z("stdin", c) : gd("/dev/tty", "/dev/stdin");
        d ? Z("stdout", null, d) : gd("/dev/tty", "/dev/stdout");
        b ? Z("stderr", null, b) : gd("/dev/tty1", "/dev/stderr");
        var b = hd("/dev/stdin", 0);
        var c = hd("/dev/stdout", 1);
        var d = hd("/dev/stderr", 1);
        q(0 === b.fd, `invalid handle for stdin (${b.fd})`);
        q(1 === c.fd, `invalid handle for stdout (${c.fd})`);
        q(2 === d.fd, `invalid handle for stderr (${d.fd})`);
      }
      H.__wasm_call_ctors();
      Uc = !1;
      sa();
      k.onRuntimeInitialized?.();
      wa("onRuntimeInitialized");
      if (!k.noInitialRun) {
        q(0 == I, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
        q("undefined" === typeof Sa || 0 == Sa.length, "cannot call main when preRun functions remain to be called");
        b = md;
        try {
          var e = b(0, 0);
          td();
          Xa || (k.onExit?.(e), pa = !0);
          ea(e, new Pa(e));
        } catch (f) {
          e = f, e instanceof Pa || "unwind" == e || (sa(), e instanceof WebAssembly.RuntimeError && 0 >= pd() && t("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), ea(1, e));
        }
      }
      sa();
      if (k.postRun) {
        for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length;) {
          e = k.postRun.shift(), Ra.push(e);
        }
      }
      wa("postRun");
      Qa(Ra);
    }
  }
  if (0 < I) {
    Ua = sd;
  } else {
    od();
    qa();
    if (k.preRun) {
      for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length;) {
        Ta();
      }
    }
    wa("preRun");
    Qa(Sa);
    0 < I ? Ua = sd : (k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => k.setStatus(""), 1);
      a();
    }, 1)) : a(), sa());
  }
}
function td() {
  var a = na, b = t, c = !1;
  na = t = () => {
    c = !0;
  };
  try {
    nd(0), ["stdout", "stderr"].forEach(d => {
      d = "/dev/" + d;
      try {
        var e = X(d, {V:!0});
        d = e.path;
      } catch (g) {
      }
      var f = {xa:!1, exists:!1, error:0, name:null, path:null, object:null, Ba:!1, Da:null, Ca:null};
      try {
        e = X(d, {parent:!0}), f.Ba = !0, f.Da = e.path, f.Ca = e.node, f.name = d && d.match(/([^\/]+|\/)\/*$/)[1], e = X(d, {V:!0}), f.exists = !0, f.path = e.path, f.object = e.node, f.name = e.node.name, f.xa = "/" === e.path;
      } catch (g) {
        f.error = g.P;
      }
      f && Dc[f.object.rdev]?.output?.length && (c = !0);
    });
  } catch (d) {
  }
  na = a;
  t = b;
  c && D("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var H;
(async function() {
  function a(d) {
    H = d.exports;
    Ba = H.memory;
    q(Ba, "memory not found in wasm exports");
    d = Ba.buffer;
    F = new Int8Array(d);
    Ca = new Int16Array(d);
    G = new Uint8Array(d);
    Da = new Uint16Array(d);
    Ea = new Int32Array(d);
    v = new Uint32Array(d);
    Fa = new Float32Array(d);
    Ga = new Float64Array(d);
    Ha = new BigInt64Array(d);
    Ia = new BigUint64Array(d);
    Hb = H.__indirect_function_table;
    q(Hb, "table not found in wasm exports");
    d = H;
    ld = Ka("malloc", 1);
    k._main = md = Ka("main", 2);
    Jb = Ka("__getTypeName", 1);
    nd = Ka("fflush", 1);
    ra = d.emscripten_stack_get_end;
    Wc = Ka("strerror", 1);
    Q = Ka("free", 1);
    od = d.emscripten_stack_init;
    pd = d.emscripten_stack_get_current;
    I--;
    k.monitorRunDependencies?.(I);
    q("wasm-instantiate", "removeRunDependency requires an ID");
    q(Va["wasm-instantiate"]);
    delete Va["wasm-instantiate"];
    0 == I && (null !== J && (clearInterval(J), J = null), Ua && (d = Ua, Ua = null, d()));
    return H;
  }
  Wa();
  var b = k, c = {env:qd, wasi_snapshot_preview1:qd};
  if (k.instantiateWasm) {
    return new Promise((d, e) => {
      try {
        k.instantiateWasm(c, (f, g) => {
          d(a(f, g));
        });
      } catch (f) {
        t(`Module.instantiateWasm callback failed with error: ${f}`), e(f);
      }
    });
  }
  La ??= k.locateFile ? k.locateFile("immolate.wasm", ha) : ha + "immolate.wasm";
  return function(d) {
    q(k === b, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    b = null;
    return a(d.instance);
  }(await Oa(c));
})();
sd();

