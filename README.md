# markov-storm

A string library as a base to AI profile building.

## Library flow

- Input
- Parse
- Generate
- Save

### 1st Method

> Raw data import - First run

- Input: Import data structure
- Parse: Make use of author / speaker to direct the message to the correct destination
    - map word relationships
	- keep track of word use and sentence terminator counts
- Generate: Create new sentence feedback based on existing word links
- Save: Export in a predefined format (See 2nd Method)

### 2nd Method

> Pre-defined file structure import - Secondary import

- Input: Validate file contents
- Parse: Map predefined data into library
- *Generate & Save: Same as 1st Method*

## Class Outline

- Word / Node (considering)
- Profile
- Cache
- Manager
- Feedback

## Sites / Primary Resources

- Google "define ..."
- Bing "define ..."
- dictionary.com
- merriam-webster
- thefreedictionary
- cambridge dictionary
- collins dictionary
- urban dictionary (content warning)

## Word Discovery

- Dictionary
    - Definitions
	- Examples
	- Usage
- Thesaurus
    - Synonyms
	- Antonyms
	- Related words
	- Near antonyms
- Misc. (additional extentions)
	- Homonym
	- Part to whole
	- Whole to part
	- Age or size
	- Rhyme
	- Person to location
	- Object to use
	- Source to object
- 'trending' (not all sites may have this, but it can change between each run)

## Other Sources

- Song lyrics
- Movie scripts
- TV Episode scripts
- Encyclopedias
- Resource books
- Fiction books? (to an extent)
- Medium / dev.to / freecodecamp blog posts
- Stack exchange questions and answers
- Twitter / YouTube comments
- Twitch chat messages? (unlikely)
- News outlet stories (Independent, Daily Mail, BBC, Sky, Express, etc.)

## Additional

- Word stems (-ly, -ing, -ness, etc.)
- Blacklist?
- Phrase mapping "I have" to "I've" and "You are" to "You're".
- Languages (linguist-storm / grammar-storm)?
    - Language / dialect rules
	- Language features
- Grammar (grammar-storm)?
    - Use of punchucation, connectors, etc.

# Current standing

## Requirements

Current requirements dictate that rethinkdb is used and a node version with import capability (this package uses the module typeset).

## Current limitations

This is currently bound by the nature that the windows file system behaves upon despite it being on an external database.

The next set of goals would be to:

- Detach from rethinkdb backend and move to either sqlite or static json.
- Define a higher efficency learning model.
- Provide an interface that other projects may use.
- When running markov chain, identify the word from the previous loop.  
  Fallback to this if a catch is found in the while block, run concurrently until no other possibilities are available or the wordCount is 0.
