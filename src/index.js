// @flow

console.log(12345);

const test = (x: ?number): string => {
    if (x) {
        return x.toString();
    }
    return 'no string';
};

export default test;
