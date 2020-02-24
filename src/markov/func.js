/** @type {Map<string, string[]>} */
const cache = new Map();

function stripFormatting(word) {
    
}

function addWord(target, word) {
    cache.get(target).push(word);
}

function exportCache(predicate = (key, words) => ({ id: key, words })) {

}

function chain(wordCountMin = 3, wordCountMax = 10, startWord = null) {

}