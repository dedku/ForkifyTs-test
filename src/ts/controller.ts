const recipeContainer = document.querySelector('.recipe') as HTMLBodyElement;

const timeout = function (s: any) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
