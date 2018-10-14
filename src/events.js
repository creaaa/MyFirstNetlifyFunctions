import { WebClient } from '@slack/client'
import Octokit from '@octokit/rest'

exports.handler = async(event, context, callback) => {
    console.log("きたわ")
    const body = JSON.parse(event.body)
    const slackEvent = body.event
    console.log(JSON.stringify(body, null, 4))

    if (
        slackEvent &&
        slackEvent.type === 'reaction_added' &&
        slackEvent.item.type === 'message'
    ) {
        const web = new WebClient(process.env.SLACK_TOKEN)
        const res = await web.conversations.history({
            latest: slackEvent.item.ts,
            limit: 1,
            channel: slackEvent.item.channel,
            inclusive: true
        })
        const message = res.message[0]

        // P.58追加
        const octokit = Octokit()
        octokit.authenticate({
            type: 'oauth',
            token: process.env.GITHUB_TOKEN
        })

        octokit.repos.createFile({
            owner: 'creaaa',
            repo: 'MyFirstNetlifyFunctions',
            path: `data/${slackEvent.item.ts}.txt`,
            message: 'Added by netlify-slack-app',
            content: (new Buffer(message.text)).toString('base64')
        })

        console.log(JSON.stringify(message, null, 4))        
    }

    callback(null, {
        statusCode: 200,
        body: body.challenge
    })
}