/**
 * @type {Map<string, MarkovNode>}
 */
const cache = new Map();

const randomFloat = (min, max) => (Math.random() * (max - min) + min);
const randomInt = (min, max) => {
    min = Math.ceil(min), max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MarkovNode {
    /**
     * 
     * @param {string} key 
     * @param {string[]} words 
     */
    constructor(key, words = []) {
        /** @type {string} */
        this.key = key;
        /** @type {Set<string>} */
        this.words = new Set(words);
    }

    /**
     * 
     * @param {string|MarkovNode?} word
     * @returns {MarkovNode}
     */
    static from(word, links = []) {
        let node;
        if (word instanceof MarkovNode) return word;
        if (!cache.has(word))
            cache.set(word, node = new MarkovNode(word, links));
        return cache.get(word);
    }

    /**
     * 
     * @param {string|MarkovNode} word
     * @returns {MarkovNode}
     */
    addWord(word) {
        this.words.add(word);
        if (word instanceof MarkovNode) {
            cache.set(word.key, word);
            return word;
        }
        if (cache.has(word)) {
            return cache.get(word);
        }
        cache.set(word, MarkovNode.from(word));
        return cache.get(word);
    }

    export() {
        return {
            id: this.key,
            words: Array.from(this.words)
        };
    }

    toString() {
        return this.key;
    }

    randomChild() {
        return [...this.words.values()][randomInt(0, this.words.size)]
    }
}

class MarkovFeedback {
    /**
     * 
     * @param {MarkovNode[]} nodes 
     */
    constructor(nodes) {
        //console.debug(nodes.join(' '))
        this.sentence = nodes.map(v => `${v}`);
        this.rating = markovRating[0];
    }

    export() {
        return {
            wordCount: this.sentence.length,
            id: this.sentence.join(' '),
            rating: this.rating
        };
    }

    setRating(rating) {
        this.rating = markovRating[rating] || (markovRating.indexOf(rating) && rating) || markovRating[0];
    }
}

function randomWord() {
    return [...cache.keys()][Math.floor(Math.random() * cache.size)];
}

/**
 * 
 * @param {number} wordCount 
 * @param {string|MarkovNode|null} startWord 
 */
function markovChain(wordCount, startWord) {
    if (startWord === null) {
        startWord = [...cache.keys()][randomInt(0, cache.size)];
    } else if (startWord instanceof MarkovNode) {
        startWord = startWord.key;
    }

    let currentWord = startWord;
    let sentence = [currentWord];

    while (wordCount--) {
        try {
            let newWord = cache.get(currentWord || randomWord()).randomChild();
            if (!newWord) break;
            currentWord = newWord;
        } catch (e) {
            console.error(e);
            return null;
        }
        sentence.push(currentWord);
    }

    return new MarkovFeedback(sentence);
}

const markovRating = [
    "unset",
    "great",
    "good",
    "neutral",
    "discouraged",
    "bad"
];

export {
    cache,
    MarkovNode,
    MarkovFeedback,
    markovRating,
    markovChain
}