module.exports = {
    escapeHtml: function (text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/`/g, "'")
            .replace(/[\u2018\u2019\u0027]/g, "'");
    },

    randomize: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    isInt: function(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
    },

    getForumApiString: function () {
        return "http://localhost:9300/api/";
    },

    getOlApiString: function () {
        return "http://localhost:5000/api/";
    },

    getOlUri: function () {
        return "http://ol.matope-swamp.com/";
    }
}