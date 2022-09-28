function testFunction(arg) { return arg }
// local functions can be tested

import LoginPortal from 'components/LoginPortal.vue';
// functions/units can be imported from other files

describe('LoginPortal', () => {

    test('test name', () => {
        expect(LoginPortal.name).toBe("LoginPortal");
    })
    test('returns 1 when argument === 1', () => {
        expect(LoginPortal.data().img).toEqual('https://picsum.photos/seed/${Math.random()}/500/300');
    })
})
// simple function unit test using jest