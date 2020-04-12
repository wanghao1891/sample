class Demo {
    constructor($in) {

    }

    async resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(x);
                resolve(x);
            }, x);
        });
    }

    async step1() {
        await this.resolveAfterXSeconds(5000);
        await this.resolveAfterXSeconds(500);
    }

    async step2() {
        await this.resolveAfterXSeconds(3000);
        await this.resolveAfterXSeconds(300);
    }
}

function start() {
    async function _start() {
        const demo = new Demo();

        // sync
        //await demo.resolveAfterXSeconds(30, 3000);
        //await demo.resolveAfterXSeconds(20, 2000);
        //await demo.resolveAfterXSeconds(10, 1000);

        // async
        //let steps = [
        //    demo.resolveAfterXSeconds(3000),
        //    demo.resolveAfterXSeconds(2000),
        //    demo.resolveAfterXSeconds(1000)
        //];
        //
        //await Promise.all(steps);
        //
        //await demo.resolveAfterXSeconds(500);

        //let steps = [
        //    demo.step1(),
        //    demo.step2()
        //];
        //
        //await Promise.all(steps);

        //await demo.step1();
        //await demo.step2();

        await demo.step1();
        setTimeout(() => {
            console.log(10000);
        }, 10000);
        await demo.step2();
    }

    _start()
        .catch((error) => {
            console.log(`error: ${error}`);
        });

    console.log('start');
}

start();
