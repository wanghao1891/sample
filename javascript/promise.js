// const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
//     resolutionFunc(777);
// });
// // 这时，"promiseA" 已经被敲定了。
// let result;
// promiseA.then((val) => {
//     console.log("asynchronous logging has val:", val);
//     result = val;
// }).then((val) => {
//     console.log(val)
// });
// console.log("immediate logging", result);

// function PromiseFn(callBack) {
//     let self = this;
//     self.resolveVal = undefined;
//     self.rejectVal = undefined;
//     self.status = 'pending'//默认是等待状态

//     function resolve(val) {
//         if (self.status === 'pending') {
//             self.resolveVal = val;
//             self.status = 'resolve'
//             //console.log(val);
//         }
//     }
//     function reject(val) {
//         if (self.status === 'pending') {
//             self.rejectVal = val;
//             self.status = 'reject'
//         }
//     }　　　　 //这里要注意，try catch若是写在 let self = this 会报错，let存在暂时死区，没有常规的变量提升。必须先申明后使用　　　　 // callback执行，调用resolve函数。
//     try {
//         callBack(resolve, reject)//callback进来自动执行
//     } catch (e) {
//         reject(self.rejectVal);//若是有报错，则直接变为reject状态
//     }
// }

// PromiseFn.prototype.then = function (resolveFunction, rejectFunction) {
//     let self = this;
//     if (self.status === 'resolve') {
//         resolveFunction(self.resolveVal)
//     }
//     if (self.status === 'reject') {
//         rejectFunction(self.rejectVal)
//     }
// }

// let a = new Promise((resolve, reject) => {
//     console.log('111')
// });
// console.log('456');

// // let promiseA = new PromiseFn((resolve, reject) => {
// //     resolve('成功啦')
// // })

// let promiseA = new PromiseFn((resolve,reject)=>{
//     setTimeout(function(){
//         resolve('成功啦')
//     },2000)
// })
// promiseA.then((resolveVal) => {
//     console.log('resolve' + resolveVal)
// }, (rejectVal) => {
//     console.log('reject' + rejectVal)
// })


function PromiseFn(callBack) {
    try {
        callBack(resolve, reject);
    } catch (e) {
        reject('');
    }
    let self = this;
    self.resolveVal = undefined;
    self.rejectVal = undefined;
    self.status = 'pending'//默认是等待状态
    self.keepResolveFn = []//
    self.keepRejectFn = []//

    function resolve(val) {
        if (self.status === 'pending') {
            self.resolveVal = val;
            self.status = 'resolve';
            self.keepResolveFn.forEach(fn => fn());
        }
    }
    function reject(val) {
        if (self.status === 'pending') {
            self.rejectVal = val;
            self.status = 'reject';
            self.keepRejectFn.forEach(fn => fn());
        }
    }
    //执行先记录resolve和reject函数事件

}
PromiseFn.prototype.then = function (resolveFunction, rejectFunction) {
    let self = this;
    if (self.status === 'resolve') {
        resolveFunction(self.resolveVal)
    }
    if (self.status === 'reject') {
        rejectFunction(self.rejectVal)
    }
    if (self.status === 'pending') {
        self.keepResolveFn.push(() => {
            resolveFunction(self.resolveVal);
        });
        self.keepRejectFn.push(() => {
            rejectFunction(self.rejectVal)
        });
    }
}
let promiseA = new PromiseFn((resolve, reject) => {
    console.log('begin');
    setTimeout(function () {
        resolve('成功啦')
    }, 2000)
})
promiseA.then((resolveVal) => {
    console.log('resolve' + resolveVal)
}, (rejectVal) => {
    console.log('reject' + rejectVal)
})


