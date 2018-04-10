//define functions returning promise
function a() {
  return Promise.resolve("resolving from a")
}

function b() {
  return Promise.resolve("resolving from b")
}

function c() {
  return Promise.reject("Throwing error from c")
}

/*
functions for testing scenarios start
*/
//handled nothing in error block
function abc() {
  return a()
  .then(res => {
    console.log("resolved a ")
    return b()
  }, err => {
    console.log("Printing err from a: ", err)
  })
  .then((res) => {
    console.log("resolved b ")
    return c()
  }, err => {
    console.log("Printing err from b: ", err)
  })
  .then(res => {
    console.log("resolved c ")
    return Promise.resolve("resolving from then block of c ")
  }, err => {
    console.log("Printing err from c: ", err)
  })
}

//thrown error from error block
function abcThrow() {
  return a()
    .then(res => {
      console.log("resolved a ")
      return b()
    }, err => {
      console.log("Printing err from a: ", err)
      return Promise.reject("Throwing err from err block of a");
    })
    .then((res) => {
      console.log("resolved b ");
      return c()
    }, err => {
      console.log("Printing err from b: ", err)
      return Promise.reject("thowing err from err block of b ")
    })
    .then(res => {
      console.log("resolved c ")
      return Promise.resolve("resolving from then block of c")
    }, err => {
      console.log("Printing err from c: ", err)
      return Promise.reject("throwing err from err block of c from abc")
    })
}

//handled nothing in error block
function cba() {
  return c()
    .then(res => {
      console.log("resolved c ")
      return b()
    }, err => {
      console.log("Printing err from error block of c: ", err)
    })
    .then((res) => {
      console.log("resolved b ")
      return a()
    }, err => {
      console.log("Printing err from err block of b: ", err)
    })
    .then(res => {
      console.log("resolved a ")
      return Promise.resolve("resolving from then block of a")
    }, err => {
      console.log("Printing err from a: ", err)
    })
}

//thrown error from error block
function cbaThrow() {
  return c()
    .then(res => {
      console.log("resolved c")
      return b()
    }, err => {
      console.log("Printing err from c: ", err)
      return Promise.reject("Throwing from err block of c")
    })
    .then((res) => {
      console.log("resolved b ")
      return a()
    }, err => {
      console.log("Printing err from b: ", err)
      return Promise.reject("Throwing from err block of b")
    })
    .then(res => {
      console.log("resolved a ")
      return Promise.resolve("resolving from then block of a")
    }, err => {
      console.log("Printing err from a: ", err)
      return Promise.reject("throwing from err block of a from cba")
    })
}

//not used error block
function cbaNew() {
  return c()
    .then(res => {
      console.log("resolved c")
      return b()
    })
    .then((res) => {
      console.log("resolved b ")
      return a()
    })
    .then(res => {
      console.log("resolved a ")
      return Promise.resolve("resolving from then block of a")
    }, err => {
      console.log("Printing err from a: ", err)
      return Promise.reject("throwing from err block of a from cba")
    })
}
/*
functions for testing scenarios start
*/

//call functions 

  console.log("sequence of function: a(), b(), c(). Handled nothing in error block");
  abc()
    .then(res => {
      console.log("Printing res from global: ", res)
    }, err => {
      console.log("Printing err from global: ", err)
    })


setTimeout(() => {
    console.log("**********************************************************************************\n\n\n")
    console.log("sequence of function: a(), b(), c(). Thrown error from error block");
  abcThrow()
    .then(res => {
      console.log("Printing res from global: ", res)
    }, err => {
      console.log("Printing err from global: ", err)
    })
}, 500)

setTimeout(() => {
    console.log("********************************************************************************** \n\n\n")
    console.log("sequence of function: c(), b(), a(). Handled nothing in error block");
  cba()
    .then(res => {
      console.log("Printing res from global: ", res)
    }, err => {
      console.log("Printing err from global: ", err)
    })
}, 1000)


setTimeout(() => {
    console.log("**********************************************************************************\n\n\n")
    console.log("sequence of function: c(), b(), a(). Thrown error from error block.");
  cbaThrow()
    .then(res => {
      console.log("Printing res from global: ", res)
    }, err => {
      console.log("Printing err from global: ", err)
    })
}, 1500)

setTimeout(() => {
    console.log("**********************************************************************************\n\n\n")
    console.log("sequence of function: c(), b(), a(). not used error block.");
  cbaNew()
    .then(res => {
      console.log("Printing res from global: ", res)
    }, err => {
      console.log("Printing err from global: ", err)
    })
}, 2000)




