export function get_sense_from_wordContent_by_id(wordContent, id) {
    return wordContent?.senses?.filter(
        (sense) => sense.id === id,
    )[0]
}