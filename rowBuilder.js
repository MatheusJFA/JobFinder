function rowBuilder(value, parent = null) {
    return {
        title: value.title,
        link: value.link,
        snippet: parent ? `This is related to the main link: ${value.title ?? parent.title}` : value.snippet,
        date: parent ? `This is related to the main link: ${value.title ?? parent.title}` : value.date,
    }
}

module.exports = rowBuilder;