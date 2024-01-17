var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var HsbColors = generateColorsOnCurve(11, { x: 61, y: 88 });
var HslColors = HsbColors.map(function (HsbColor) { return HSBtoHSL(HsbColor[0], HsbColor[1]); });
console.log('Here is your saturation and brightness, happy coloring 😘:', HslColors.reverse());
function generateColorsOnCurve(numberOfColors, middle) {
    if (numberOfColors % 2 !== 1) {
        console.error('numberOfColors must be odd.');
        return undefined;
    }
    var MAX_VALUE = 100;
    var oneHalf = (numberOfColors - 1) / 2;
    function NumbersBetweenTwoPoints(num, add) {
        var values = [];
        for (var i = 0; i != oneHalf; i++) {
            values.push((num / (oneHalf + 1)) * (i + 1) + add);
        }
        return values;
    }
    var afterMidX = NumbersBetweenTwoPoints(MAX_VALUE - middle.x, middle.x);
    var beforeMidX = NumbersBetweenTwoPoints(middle.x - 10, 10);
    var xValues = __spreadArray(__spreadArray(__spreadArray([], beforeMidX, true), [middle.x], false), afterMidX, true);
    var beforeMidY = NumbersBetweenTwoPoints(middle.y - 10, 10);
    var afterMidY = NumbersBetweenTwoPoints(MAX_VALUE - middle.y, middle.y);
    var yValues = __spreadArray(__spreadArray(__spreadArray([], beforeMidY, true), [middle.y], false), afterMidY, true);
    return xValues.reverse().map(function (x, i) { return [x, yValues[i]]; });
}
function HSBtoHSL(s, b) {
    // Convert from 0-100 range to 0-1
    s /= 100;
    b /= 100;
    var l = ((2 - s) * b) / 2;
    if (l !== 0) {
        if (l === 1) {
            s = 0;
        }
        else if (l < 0.5) {
            s = (s * b) / (l * 2);
        }
        else {
            s = (s * b) / (2 - l * 2);
        }
    }
    // Convert back to 0-100 range
    s *= 100;
    l *= 100;
    return { s: s, l: l };
}
