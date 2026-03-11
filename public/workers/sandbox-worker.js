// Sandbox Web Worker for safe code execution
// Captures variables, functions, and console.log output

self.addEventListener('message', (event) => {
  const { code, requestId } = event.data;

  try {
    // Parse all declared variable and function names from user code
    const names = new Set();
    for (const m of code.matchAll(/(?:var|let|const)\s+([a-zA-Z_$]\w*)/g)) {
      names.add(m[1]);
    }
    for (const m of code.matchAll(/function\s+([a-zA-Z_$]\w*)/g)) {
      names.add(m[1]);
    }

    // Build capture statements to extract values after execution
    const captures = [...names].map(n =>
      `try{__v["${n}"]=${n};__t["${n}"]=typeof ${n}}catch(_){}`
    ).join(';');

    // Wrap user code with console interception and variable capture
    const wrapped = [
      'var __l=[];',
      'var console={',
      '  log:function(){',
      '    __l.push([].slice.call(arguments).map(function(a){',
      '      if(a===null)return"null";',
      '      if(a===undefined)return"undefined";',
      '      if(typeof a==="object"){try{return JSON.stringify(a)}catch(_){return String(a)}}',
      '      return String(a)',
      '    }).join(" "))',
      '  },',
      '  warn:function(){},error:function(){},info:function(){}',
      '};',
      code,
      ';var __v={},__t={};',
      captures,
      ';return{v:__v,t:__t,l:__l}'
    ].join('\n');

    const fn = new Function(wrapped);
    const r = fn();

    // Separate variables from functions
    const variables = {};
    const functions = {};
    for (const k in r.v) {
      if (r.t[k] === 'function') {
        functions[k] = true;
      } else {
        try {
          // Ensure values are serializable
          JSON.stringify(r.v[k]);
          variables[k] = r.v[k];
        } catch (_) {
          variables[k] = String(r.v[k]);
        }
      }
    }

    self.postMessage({
      requestId,
      variables,
      functions,
      consoleLogs: r.l,
      errors: [],
      timeout: false
    });
  } catch (e) {
    self.postMessage({
      requestId,
      variables: {},
      functions: {},
      consoleLogs: [],
      errors: [e.message],
      timeout: false
    });
  }
});
