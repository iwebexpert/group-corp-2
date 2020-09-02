function replaseMarks(text) {
    return text.replace(/'/g, '"').replace(/\b"\b/g, "'");
}