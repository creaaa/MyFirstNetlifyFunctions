exports.handler = function(event, context, callback) {
    const response = {
        "text": "おすすめアイドル",
        "attachments": [
            {
                "text": "おとはす"
            },
            {
                "text": "どこはす"
            }
        ]
    }
    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
    })
}